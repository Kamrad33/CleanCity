import React, { Component } from "react";
import {Container, Header, Content, List, ListItem, Text, Left, Right, Icon, Button,Body } from 'native-base';
import {View, StyleSheet,Image } from "react-native";
import ProblemInf from "ProjectOne/src/components/ProblemInf/ProblemInf";
import MapMarker from "ProjectOne/src/components/map/MapMarker";
import {SERVER_ADDRESS} from "../../const/constants";
export default class ProblemList extends Component {
    constructor(props){
        super(props);
        this.state ={
            entryList: {

            },

        };
        this.loadEntry = this.loadEntry.bind(this);
    }

    componentDidMount() {
        this.loadEntry();
    }

    loadEntry(){
        fetch(`${SERVER_ADDRESS}/entry/list`, {
            method: 'POST',
        }).then(res => {
            this.setState({entryList: JSON.parse(res._bodyText)});
        })
            .catch((error) => {
                console.warn('error',error);
            })
    }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='md-list' stlye={{ color: tintColor}} />
    }
  };

  render() {
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
   console.log(this.state);
     const {navigate} = this.props.navigation;
    return (
      <Container >
      <Content >
        <List dataArray={this.state.entryList}

          renderRow={(item) =>
            <ListItem   style ={
                item.status == ("accepted")
                ? styles.nice
                : styles.drop
              }  onPress={() => navigate('ProblemInf', {entry: item})}>
            <Left>
            <View style={{flex:1}}>
            <Image source={{uri: uri}}
                 style={{width: 100, height:100}} />
            </View>
            </Left>
            <Body style={{flex:2}}>
              <Text >{item.name}</Text>
              <View style={{flex:2}}>
                <Text note >{item.description}</Text>
              </View>
              </Body>
            </ListItem>
          }>
        </List>
      </Content>
        </Container>);

  }
}
const styles = StyleSheet.create({
  nice:{ backgroundColor: 'rgba(38, 153, 15, 0.3)'

  },
  drop:{
backgroundColor: 'rgba(235, 40, 40, 0.3)'
  }
})
