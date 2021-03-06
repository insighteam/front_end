import React, { Component } from 'react';
import {
  View,
  Alert
} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { colors } from '../theme';

class CapsuleDetailScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          expanded: false,
          capsules: [
              {
               writer: "이승진",
               textContent: "#아나키즘 #블록체인최종목표 #화상전화개꿀잼",
              },
              {
               writer: "고현지",
               textContent: "친구들아 해커톤 끝나고도 보자..ㅋ",
              },
              {
               writer: "이은영", 
               textContent: "해커톤이 끝났다. 아싸!",
              },
              {
                writer: "이성희", 
                textContent: "다들 정말 고생 많았어ㅎㅎ",
               },
              {
                writer: "구영진",
                textContent: "힘들지만 재밌었어 ㅎㅎ 또 보자!!!",
            },
            {
                writer: "전용현",
                textContent: "삶의 추억, 우리 기억, 그리고 모먼트...",                
            }
          ]
      };
  }
  componentWillMount() {
      this.flip = this.flip.bind(this);
  }
  flip() {
      this.setState({
          expanded: !this.state.expanded,
      });
  }
  renderFrontface() {
      return (
          <View/>
      );
  }
  renderBackface() {
      return (
          <View/>
      );
  }

  showAlert() {
    Alert.alert(
        '입금 완료!',
        '예치금을 성공적으로 수령하셨습니다.',
        [
            {text: 'OK', onPress: () => console.log('OK')},
        ],
        {cancelable: false},
      );
    }

  render() {
      return (
          <Container>
              <Content>
                  {this.state.capsules.map((item, index) => {
                      return (
                          <List key={index}>
                              <ListItem thumbnail>
                                 {/* <Left>
                                      <Text note numberOfLines={1}>사람 수</Text>
                                      <Text>{item.people_num}</Text>
                                  </Left>  */}
                                  <Body>
                                      <Text note numberOfLines={1} style={{color: colors.temp1}}>{index + 1}</Text>
                                      <Text style={{color: colors.secondary}}>작성자 : {item.writer}</Text>
                                      <Text style={{color: colors.primary}}>추억 : {item.textContent}</Text>
                                  </Body>
                              </ListItem>
                          </List>
                      );
                  })}
              </Content>
              <Button large
                style={{flexDirection: "row", justifyContent: "center"}}
                onPress={this.showAlert}>
                  <Text>예치금 출금</Text>
              </Button>
          </Container>
      )
  }
}
export default CapsuleDetailScreen;