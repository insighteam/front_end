import React, { Component } from 'react';
import {
    View,
} from 'react-native';
// import Button from '../components/Button';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

class MainScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            capsules: [
                {
                    start_date: "2019-02-28",
                    end_date: "2019-03-30",
                    people_num: 3
                },
                {
                    start_date: "2019-01-28",
                    end_date: "2019-04-30",
                    people_num: 2
                },
                {
                    start_date: "2017-02-28",
                    end_date: "2020-03-30",
                    people_num: 4
                },
            ]
        };
    }    

    render() {
        return (
            <Container>
                <Content>
                    {this.state.capsules.map((item, index) => {
                        return (
                            <List key={index}>
                                <ListItem thumbnail>
                                    <Left>
                                        <Text note numberOfLines={1}>사람 수</Text>
                                        <Text>{item.people_num}</Text>
                                    </Left>
                                    <Body>
                                        <Text>묻은 날짜 : {item.start_date}</Text>
                                        <Text>오픈 날짜 : {item.end_date}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent>
                                            <Text>열기!</Text>
                                        </Button>
                                    </Right>
                                </ListItem>
                            </List>
                        );
                    })}
                </Content>
                <Button full warning large
                    onPress={() => this.props.navigation.navigate('Main')}
                >
                    <Text>Make time capsule!</Text>
                </Button>
            </Container>
        )
    }
}


export default MainScreen;