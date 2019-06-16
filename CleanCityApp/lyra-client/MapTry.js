import React, { Component } from "react";
//import {Container, Text, Content, Icon } from 'native-base';
import { AppRegistry, StyleSheet} from "react-native";
import { DrawerNavigator } from 'react-navigation';
import { Icon, Text, Button, Container, Header, Content, Left, View } from 'native-base'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default class MapTry extends Component {
  state = {
    mapRegion: null,
    lastLat: null,
    lastLong: null,

  }
  marker={
    title: 'Тут заголовок проблемы',
    description: 'Тут описание'
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    });
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set use the the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onMapPress(e) {
    console.log(e.nativeEvent.coordinate.longitude);
    let region = {
      latitude:       e.nativeEvent.coordinate.latitude,
      longitude:      e.nativeEvent.coordinate.longitude,
      latitudeDelta:  0.00922*1.5,
      longitudeDelta: 0.00421*1.5
    }
    this.onRegionChange(region, region.latitude, region.longitude);
  }
  render() {
     const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <MapView
          style={styles.map}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange.bind(this)}
          onPress={this.onMapPress.bind(this)}>
          <MapView.Marker
          title={marker.title}
          description={marker.description}
            coordinate={{
              latitude: (this.state.lastLat + 0.00050) || -36.82339,
              longitude: (this.state.lastLong + 0.00050) || -73.03569,
            }}
            >
            <View>
              <Text style={{color: '#000'}}>
                { this.state.lastLong } / { this.state.lastLat }
              </Text>
            </View>
          </MapView.Marker>
        </MapView>
        <View style ={{ paddingTop:'100%', justifyContent: 'flex-start', alignItems:'center'}}>
        <Left>
        <Button style={styles.button} onPress={() => navigate('Домашняя страница')}>
        <Text>Подтвердить</Text>
        </Button>
        </Left>
      </View>
      </View>
    );


  /*  <MapView
      style={{
        flex : 1
      }}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
   />);
        /*<View style={styles.container}>
            <MapView style={styles.map}
              region={{
                  latitude: 59.32932349,
                  longitude: 18.06858080,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1
      }}>
                <MapView.Marker
                  coordinate={{
                    atitude: 59.32932349,
                    longitude: 18.06858080
                  }}
                  title={'Title'}
                  description={'Desc'}
                />
            </MapView>
        </View>
    );*/
  }
}

const styles = StyleSheet.create({
  container: {
    //width: '100%',
  //  height: '100%'
  },
  button:{
    backgroundColor:'#4682B4'
  },
  map: {
      ...StyleSheet.absoluteFillObject,
    }  });
    AppRegistry.registerComponent('testCoords', () => testCoords);
/*  container:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})*/
