import React from 'react';
import {
    View, 
    StyleSheet,
    Button,
    Text,
    TextInput,
    FlatList
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Toast from 'react-native-easy-toast'

import { Constants } from 'expo';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';

class InvitationScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
            date: null,
            dateSec: null,
            friendsId: null
        };
    }

    componentDidMount() {
        this._getLocationAsync();
        this.getCurrentLocation();

        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var monthDay = month;

        if (month == '2'){
            monthDay = month * 28
        } else if (month == '1' || month == '3' || month == '5'|| month == '7'
        || month == '8'|| month == '10'|| month == '12') {
            monthDay = month * 31
        } else{
            monthDay = month * 30
        }

        that.setState({
            date: year + '-' + month + '-' + date,
            dateSec: (date * 24 * 60 * 60) + (month * 24 * 60 * 60)
            + (year * 365 * 24 * 60 * 60) +  + (hours * 60 * 60) + (min * 60)  + sec,
        });
    }

    _getLocationAsync = async() => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if(status !== 'granted') {
            this.setState({
                location: 'Permission to access location was denied',
            })
        }
    }

    getCurrentLocation() {
        navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                this.setState({ error: error.message })
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000, distanceFilter: 1 }
        )
    }
    
    getRegion() {
        return {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
        };
    }
    
    onRegionChange(region) {
      this.setState({ region: region });
    }
    
    render() {
        const styles = StyleSheet.create({
            container: {
            ...StyleSheet.absoluteFillObject,
            height: 100,
            width: 100,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
            map: {
                height: 300, 
                marginBottom: 5, 
                marginTop: 5
            },
        });

        return (
            <View>
                <MapView 
                    style={styles.map}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: this.state.latitudeDelta,
                        longitudeDelta: this.state.longitudeDelta,
                    }}
                    loadingEnabled={true}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    pitchEnabled={false}
                    scrollEnabled={false}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: (this.state.latitude + 0.00000),
                            longitude: (this.state.longitude + 0.00000),
                        }}
                        title="현재 위치"
                    />
                </MapView>
                <View>
                    <Text>
                        Current Date Time
                    </Text>
                    <Text>
                        {this.state.date}
                    </Text>
                    <Text>
                        {this.state.dateSec}
                    </Text>
                </View>
                <View>
                    <TextInput
                        placeholder="Enter Friends' ID"
                        value={this.state.friendsId}
                        onChangeText={(friendsId)=> this.setState({friendsId})}
                    />
                    <Button
                        title="Add"
                    />
                    <FlatList
                        FriendsIdList={FriendsIdList}
                        renderItem={ ({item}) => <Text>{item.friendsId}</Text>}
                        //ListHeaderComponent={this.renderStory()}
                    />
                </View>
            </View>
        );
    }
}

export default InvitationScreen;