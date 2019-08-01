import React from 'react';
import {
    View, 
    StyleSheet,
    Button,
    Image
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Toast from 'react-native-easy-toast'

import { Constants } from 'expo';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';
import { colors } from '../theme';
// import console = require('console');

class MapScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
            capsuleLatitude: 37.3674455,
            capsuleLongitude: 127.1078423,
        };
    }

    componentDidMount() {
        this._getLocationAsync();
        this.getCurrentLocation();
        this.calculateDistance();
    }

    _getLocationAsync = async() => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if(status !== 'granted') {
            await Permissions.askAsync(Permissions.LOCATION);
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

    calculateDistance() {
        let diff_latitude = this.state.latitude - this.state.capsuleLatitude;
        let diff_logitude = this.state.longitude - this.state.capsuleLongitude;
        if (Math.sqrt(Math.pow(diff_latitude, 2) + Math.pow(diff_logitude, 2)) >= 0.1) {
            this.refs.toast.show('타임 캡슐에 접근하였습니다.', 1000, () => {
                this.props.navigation.navigate('CapsuleDetail');
            })
        } else {
            this.refs.toast.show('타임 캡슐에 가까이 가주세요.');
        }
    }
    
    render() {
        const styles = StyleSheet.create({
            container: {
                ...StyleSheet.absoluteFillObject,
                height: 400,
                width: 100,
                justifyContent: 'flex-end',
                alignItems: 'center',
            },
            map: {
                // ...StyleSheet.absoluteFillObject,
                height: 700, 
                marginBottom: 5, 
                marginTop: 5
            },
        });

        return (
            <View>
                <Toast 
                    ref='toast'
                    position='top'
                    opacity={0.8}
                    style={{backgroundColor: colors.primary}}
                />
                <MapView 
                    style={styles.map}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: this.state.latitudeDelta,
                        longitudeDelta: this.state.longitudeDelta,
                    }}
                    showsUserLocation={true}
                    // showsMyLocationButton={true}
                    followsUserLocation={true}
                    loadingEnabled={true}
                    showComapass={true}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.capsuleLatitude,
                            longitude: this.state.capsuleLongitude,
                        }}
                        title="타임 캡슐"
                    >
                        <Image
                            source={require("../assets/images/treasure.png")}
                            style={{width: 40, height: 40}}
                        />
                    </MapView.Marker>
                </MapView>
            </View>
        );
    }
}

export default MapScreen;