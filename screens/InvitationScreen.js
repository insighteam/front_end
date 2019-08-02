import React from 'react';
import {
    View, 
    StyleSheet,
    Text,
    TextInput,
    FlatList
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button } from 'native-base';

import DatePicker from 'react-native-datepicker';
import Toast from 'react-native-easy-toast'

import { Constants } from 'expo';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';
import { colors } from '../theme';

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
            friendsId: null,
            date: null,
            dateSec: null,
            friendsId: '',
            EndingDate: '2019-09-02',
            EndingDateSec: '',
            FriendsIdList: [
                {
                    friendsId: "",
                    i: 0
                }
            ],
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

    async invite(id, latitude, longitude, money, end_date) {
        const idx = await AsyncStorage.getItem('idx');
        const url = 'http://10.250.72.159:3003/' + idx + '/invitations'
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': id,
                'latitude': latitude,
                'longitude': longitude,
                'money': money,
                'end_date': end_date
            }),
        })
        .then((response) => {
            return response.json()
        })
        .then(async(responseData) => {
            if(responseData.code && responseData.code == 200) {
                this.props.navigation.navigate('Main');
                this.refs.toast.show('초대 성공');
            }
        })
        .catch(function(err) {
            this.refs.toast.show(err);
        })
    }

    calculateEndingTimeSec(d) {
        this.setState({EndingDate: d})
            var that = this;
            var arr = this.state.EndingDate.split("-");
            var day = arr[2]; 
            var month = arr[1]; 
            var year = arr[0]; 
            var monthDay = month;
            if (month == '2'){
                monthDay = month * 28
            }
            else if (month == '1' || month == '3' || month == '5'|| month == '7'
            || month == '8'|| month == '10'|| month == '12') {
                monthDay = month * 31
            }
            else{
                monthDay = month * 30
            }
            that.setState({
              //Setting the value of the date time
              
              EndingDateSec: (day * 24 * 60 * 60) + (monthDay * 24 * 60 * 60)
              + (year * 365 * 24 * 60 * 60)
            });
    }

    addElementInArray = (data) => {
        const {FriendsIdList} = this.state;
        this.setState({
            FriendsIdList:FriendsIdList.concat({...data})
        })
        
         //this.setState({friendsId: d});
         //this.state.FriendsIdList.push(this.state.friendsId);
         //this.state.i++;
    }

    onButtonPress = () => {
        this.refs.toast.show('초대 성공', 1500, () => {
            this.props.navigation.navigate('Main');
        });
        // this.invite(this.state.id, this.state.latitude, this.state.longitude, this.state.money, this.state.end_date)
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

        const {FriendsIdList} = this.state;

        return (
            <View>
                <Toast 
                    ref='toast'
                    position='top'
                    opacity={0.8}
                    style={{backgroundColor: colors.temp2}}
                />
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
                    <View style = {{alignItems: 'center',
       justifyContent: 'center'}}>
                        <Text style = {{color: colors.secondary}}>
                            Current Date Time
                        </Text>
                        <Text style = {{color: colors.primary}}>
                            {this.state.date}
                        </Text>
                   {/* <Text>
                       {this.state.dateSec}
                   </Text> */}
                    </View>
                    <View>
                        <TextInput
                            placeholder="Enter Friends' ID"
                            value={this.state.friendsId}
                            onChangeText = {(friendsId)=> this.setState({friendsId})}
                        />
                        <Button info small
                            onPress={(friendsId)=> this.addElementInArray(friendsId)}>
                                <Text>Add</Text>
                            </Button>
                    </View>
                    <DatePicker
                            style={{width: 200}}
                            date={this.state.EndingDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2019-09-01"
                            maxDate="2100-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                                },
                                dateInput: {
                                marginLeft: 36
                                }
                            }}
                            onDateChange={(d) => {this.calculateEndingTimeSec(d)}}
                        />

            </View>
                <Button primary large
                        style={{flexDirection: "row", justifyContent: "center"}}
                        onPress={this.onButtonPress}
                    >
                        <Text>invite!</Text>
                    </Button>
            </View>
        );
    }
}

export default InvitationScreen;