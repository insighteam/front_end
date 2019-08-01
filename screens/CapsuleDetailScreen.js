import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
// import Button from '../components/Button';

class CapsuleDetailScreen extends React.Component {
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
            <View>
                <Text>확인 페이지</Text>
            </View>
        )
    }
}


export default CapsuleDetailScreen;