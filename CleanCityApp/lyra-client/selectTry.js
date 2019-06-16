import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
export default class selectTry extends Component<Props> {



  state ={
   data:[]
 }


/* componentDidMount(){
 this.getUser();
}

getUser = _ => {
   fetch('http://localhost:1348/user')
   .then(response => response.json())
   .then(response => this.setState({ data: response.data }))
   .catch(err => console.error(err))
}*/
 /*fetchData= async()=>{
   const response = await fetch('http://127.0.0.1:1348/user');
   const users = await response.json();
   this.setState({data: users});

 }
componentDidMount(){
this.fetchData();
 fetch('http://127.0.0.1:1348/user')
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => console.error(err));
}*/
fetchData= async()=>{
  const response = await fetch('http://192.168.1.43:1348/user');
  const users = await response.json();
  this.setState({data: users});

}
componentDidMount(){
this.fetchData()
 .catch(err => console.error(err));
}
 render() {
   return (
     <View >
      <Text>Welcome</Text>

      <FlatList
      data={this.state.data}
      keyExtractor={(item,index) => index.toString()}
      renderItem={({item}) =>

      <View style={{backgroundColor:'#abc123',padding:10,margin:10}}>
          <Text style={{color:'#fff', fontWeight:'bold'}}>{item.name}</Text>
          
         </View>
      }

      />
     </View>
   );
 }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF',
 },
});
