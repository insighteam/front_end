import * as React from 'react';
import { Image, View, TextInput, StyleSheet, Alert } from 'react-native';
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
            money: 10000,
        }
    }

    componentDidMount() {
        this._getPermissionAsync();
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

    onAlertButtonPress = () => {
        // this.props.navigation.navigate('Main')
        this.props.navigator.push({
            name: 'Main',
            title: 'Moment'
        })
    }

    showAlert() {
        // let { money } = this.state
        let desc = "1000원을 결제하시겠습니까?"

        Alert.alert(
            '결제',
            desc,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK')},
            ],
            {cancelable: false},
          );
    }

    handleTextInput=(text)=>{                         //text
        this.setState({text: text});
    };

    render() {
        let { image } = this.state;

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