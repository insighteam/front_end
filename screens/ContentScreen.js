import * as React from 'react';
import { Button, Image, View ,TextInput,Text, StyleSheet, Alert} from 'react-native';
// import {Constants} from 'expo-constants';
// import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';


export default class ContentScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: null,
            image: null
        }
    }

    componentDidMount() {
        this._getPermissionAsync();
    }

    _getPermissionAsync = async() => {
        let {status} = await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    // _pickImage = async () => {
    //     let pickerResult = await ImagePicker.launchImageLibraryAsync({
    //             allowsEditing: true,
    //             aspect: [3, 3.5],
    //             });
    
    //     // this._handleImagePicked(pickerResult);
    //   };

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

    handleTextInput=text=>{                         //text
        this.setState({textIn:text});
    };
    Capsulize=(image,textIn)=>{                     //capsule
        alert("Keep your memory");
    };
    render() {
        let { image } = this.state;

        return (
            <View style={{flex:1,alignItems:"center", justifyContent:"center"}}>
                <Button
                    title= "Select image"
                    onPress={this._pickImage}
                />
                <TextInput
                    style={{height: 300,width:300, borderColor: 'gray', borderWidth: 1}}
                    placeholder="Type here the contents"
                    onChangeText={this.handleTextInput}
                />
                <Text style ={{padding:10,fontSize:42}}></Text>
                { image &&
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                <TouchableOpacity 
                    style={StyleSheet.submitButton}
                    onPress={()=>this.Capsulize(this.state.image,this.state.textIn)}>
                    <Text style={StyleSheet.submitButtonText}>Keep the memory</Text>
                </TouchableOpacity>
            </View>
        );
    }
}