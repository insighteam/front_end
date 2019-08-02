import React, { Component } from 'react';
import {
    View,
    AsyncStorage
} from 'react-native';
// import Button from '../components/Button';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { colors } from '../theme';

class MainScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            capsules: [
                {
                    start_date: "2019-02-28",
                    end_date: "2022-03-30",
                    people_num: 3
                },
                {
                    start_date: "2019-01-28",
                    end_date: "2019-10-30",
                    people_num: 2
                },
                {
                    start_date: "2019-08-01",
                    end_date: "2019-08-02",
                    people_num: 6
                },
            ],
            hasInvitations: false,
            idx: null
        };
    }    

    componentDidMount() {
        this.getInvitation();
    }

    async getInvitation() {
        await AsyncStorage.getItem('idx')
            .then( data => {
                this.setState({
                    idx: data
                })
        })
        const url = 'http://10.250.72.159:3003/users/' + this.state.idx + '/invitations'
        await fetch(url, {
          method: 'GET',
        })
        .then((response) => {
          return response.json()
        })
        .then(async(responseData) => {
            if(responseData.status && responseData.status == 200 ) {
                this.setState({
                    hasInvitations: true
                })
            }
        })
        .catch(function(err) {
          this.refs.toast.show(err);
        })
      }

    render() {
        console.disableYellowBox = true; 
        const idx = this.state;
        const url = 'http://10.250.72.159:3003/users/' + idx + '/invitations'
        return (
            <Container>
                <Content>
                    {this.state.capsules.map((item, index) => {
                        return (
                            <List key={index}>
                                <ListItem thumbnail>
                                    <Left>
                                        <Text note numberOfLines={1} style={{color: colors.secondary}}>사람 수 : </Text>
                                        <Text style={{color: colors.primary}}>{item.people_num}</Text>
                                    </Left>
                                    <Body>
                                        <Text style={{color: colors.temp2}}>묻은 날짜 : {item.start_date}</Text>
                                        <Text style={{color: colors.temp2}}>오픈 날짜 : {item.end_date}</Text>
                                    </Body>
                                    <Right>
                                        {new Date(item.end_date) - new Date() >= 0 ?
                                            <Button transparent disabled>
                                                <Text note numberOfLines={1}>닫힘!</Text>
                                            </Button>
                                            :
                                            <Button transparent
                                                onPress={() => this.props.navigation.navigate('Map')}
                                            >
                                                <Text>열기!</Text>
                                            </Button>
                                        }
                                    </Right>
                                </ListItem>
                            </List>
                        );
                    })}
                </Content>
                <Button info large
                    style={{flexDirection: "row", justifyContent: "center"}}
                    onPress={() => this.props.navigation.navigate('Invitation')}
                >
                    <Text>Make time capsule!</Text>
                </Button>
                {this.state.hasInvitations? 
                    <Button primary large
                        style={{flexDirection: "row", justifyContent: "center"}}
                        onPress={() => this.props.navigation.navigate('Content')}
                    >
                        <Text>Check invitation!</Text>
                    </Button> : null
                }
            </Container>
        )
    }
}


export default MainScreen;