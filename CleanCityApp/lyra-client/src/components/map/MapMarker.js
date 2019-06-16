import React, { Component } from "react";
//import {Container, Text, Content, Icon } from 'native-base';
import { AppRegistry, StyleSheet} from "react-native";
import { DrawerNavigator } from 'react-navigation';
import { Icon, Text, Button, Container, Header, Content, Left, View } from 'native-base'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default class MapMarker extends Component {

// сюда надо как то отправить данные с бд, где вместо цифр будут свои
  constructor(props) {
  super(props);
  const { navigation } = this.props;
    const location = navigation.getParam('location', {});

    console.log(location);
  this.state = {
       lastLat : location.xvalue,
        lastLong : location.yvalue,
        entryName : location.name,
        endtryDesc : location.description,
    region:{
      latitude: 21.123123123,
      longitude: 105.123123123,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    //  latitude: 21.123123123,
    //  longitude: 105.123123123,
    //  latitudeDelta: 0.01,
    //  longitudeDelta: 0.01,
  // this.state = {lastLat : location.xvalue, lastLong : location.yvalue}
  // console.log( this.state.author);
    },
    markers:[{
    title: 'hello',
    description:'desc',
    coordinates: {
    latitude: 3.148561,
    longitude: 101.652778,
    latitudeDelta:  0.00922*1.5,
    longitudeDelta: 0.00421*1.5,

//  markers:[{
//  title: 'hello',
//  description:'desc',
//  coordinates: {
//    latitude: 3.148561,
//    longitude: 101.652778,
  //  latitudeDelta:  0.00922*1.5,
  //  longitudeDelta: 0.00421*1.5,
  },
  }
  ]
}

}

render() {
     const {navigate} = this.props.navigation;
     console.log(this.state.lastLat);
    return (
      <View style={{flex: 1}}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.lastLat,
            longitude: this.state.lastLong,
            latitudeDelta:  0.00922*1.5,
            longitudeDelta: 0.00421*1.5,
          }}
          showsUserLocation={true}
          followUserLocation={true}

        >
          {this.state.markers.map(marker => (
          <MapView.Marker
          title={this.state.entryName}
          description={this.state.endtryDesc}
            coordinate={
            {latitude: this.state.lastLat,
            longitude: this.state.lastLong}
            }
            >

          </MapView.Marker>
        ))}
        </MapView>

      </View>
    );

/*  render() {
     const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <MapView
          style={styles.map}
          region={{
            latitude: 3.148561,
            longitude: 101.652778,
            latitudeDelta:  0.00922*1.5,
            longitudeDelta: 0.00421*1.5,
          }}
          showsUserLocation={true}
          followUserLocation={true}

        >
          {this.state.markers.map(marker => (
          <MapView.Marker
          title={marker.title}
          description={marker.description}
            coordinate={marker.coordinates}
            >

          </MapView.Marker>
        ))}
        </MapView>

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
