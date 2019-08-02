import * as React from 'react';
import { Image, View, TextInput, StyleSheet, Alert, YellowBox } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Button, Text } from 'native-base';
import { colors, fonts } from '../theme';

export default class ContentScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: null,
            image: null,
            latitude: null,
            longitude: null,
            start_date: null,
            end_date: null,
            end_seconds: null,
            money: 10000,
            payment: false
        }
    }

    componentDidMount() {
        this._getPermissionAsync();

        if(this.state.payment) {
            this.props.navigation.navigate('Main');
        }
    }

    _getPermissionAsync = async() => {
        let {status} = await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });
    
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    async getInvitation() {
        const idx = await AsyncStorage.getItem('idx');
        const url = 'http://10.250.72.159:3003/' + idx + '/invitations'
        await fetch(url, {
          method: 'GET',
        })
        .then((response) => {
          return response.json()
        })
        .then(async(responseData) => {
            if(responseData.code && responseData.code == 200) {
                this.props.navigation.navigate('Main');
                this.setState({
                    latitude: responseData.data.latitude,
                    longitude: responseData.data.longitude,
                    moeny: responseData.data.moeny,
                    end_date: responseData.data.end_date,
                })
            }
        })
        .catch(function(err) {
          this.refs.toast.show(err);
        })
      }

    async postContent(idx, text, image, latitude, longitude, start_date, end_date, end_seconds, money) {
        await fetch('http://10.250.72.159:3003/capsules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "idx": idx,
            "text": text,
            "image": image,
            "latitude": latitude,
            "longitude": longitude,
            "start_date": start_date,
            "end_date": end_date,
            "end_seconds": end_seconds,
            "money": money
          }),
        })
        .then((response) => {
          return response.json()
        })
        .then(async(responseData) => {
          if(responseData.code && responseData.code == 200) {
            this.refs.toast.show('캡슐 생성 완료!', 500, () => {
                this.props.navigation.navigate('Main');
            });
          }
        })
        .catch(function(err) {
          this.refs.toast.show(err);
        })
    }

    onAlertButtonPress = () => {
        this.props.navigator.push({
            name: 'Main',
            title: 'Moment'
        })
    }

    onAlertOKButtonPress = () => {
        this.postContent()
    }

    showAlert = () => {
        this.setState({
            payment: true
        })

        Alert.alert(
            "결제 완료",
            "1000원을 결제하시겠습니까?",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => this.onAlertOKButtonPress.bind(this)},
            ],
            {cancelable: false},
        );
    }

    handleTextInput=(text)=>{ 
        this.setState({text: text});
    };

    render() {
        console.disableYellowBox = true; 
        let { image } = this.state;

        if(this.state.payment) {
            this.props.navigation.navigate('Main');
        }

        return (
            <View style={{flex: 1, alignItems:"center", justifyContent:"center"}}>
                { image ? null : 
                    <Button transparent
                        onPress={this._pickImage}
                    >
                        <Text>Select image</Text>
                    </Button>
                }
                <TextInput
                    style={{height: 300,width:300, borderColor: 'black', borderWidth: 1}}
                    placeholder="Type here the contents"
                    onChangeText={ this.handleTextInput }
                />
                { image &&
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }
                <View>
                    <Button large
                        onPress={this.showAlert}
                        >
                        <Text style={{color:'white'}}>Keep the memory!</Text>
                    </Button>
                </View>
            </View>
        );
    }
}