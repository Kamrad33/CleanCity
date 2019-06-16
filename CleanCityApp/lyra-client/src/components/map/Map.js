import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { DrawerNavigator,IconComponent,LabelComponent } from 'react-navigation';
import { Icon, Text, Button, Container, Header, Content, Left, View, Fab } from 'native-base'
import ActionButton from 'react-native-action-button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
MaterialIcons
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default class Map extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="md-locate" stlye={{ color: tintColor}} />
    }
  }
  constructor(props) {
super(props);
this.state = {

markers: [{
  title: 'hello',
  description:'desc',
  coordinates: {
    latitude: 56.1493529,
    longitude: 40.4121881
  },
},
{
  title: 'hello',
  description:'desc',
  coordinates: {
    latitude: 52.1415,
    longitude: 43.522
  },
},
{
  title: 'hello',
  description:'desc',
  coordinates: {
    latitude: 58.1493715,
    longitude: 43.41522
  },
},
{
  title: 'hello',
  description:'desc',
  coordinates: {
    latitude: 51.14715,
    longitude: 41.41522
  },
},
{
  title: 'hello',
  description:'desc',
  coordinates: {
    latitude: 56.1493715,
    longitude: 42.41522
  },
},]
};
this.loadMarkers = this.loadMarkers.bind(this);
}

componentDidMount() {
    this.loadMarkers();
       console.log(this.state);
}

loadMarkers(){
    fetch(`${SERVER_ADDRESS}/entry/list`, {
        method: 'POST',
    }).then(res => {
        this.setState({markers: JSON.parse(res._bodyText)});
    })
        .catch((error) => {
            console.warn('error',error);
        })
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
     console.log(this.state);
    return (

        <View style={styles.container}>

          <MapView provider={ PROVIDER_GOOGLE }
          style={styles.map}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          >
      {this.state.markers.map(marker => (
     <MapView.Marker
       coordinate={marker.coordinates }
       title={marker.description}
       description={marker.description}>

     </MapView.Marker>
   ))}
          </MapView>
  </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{

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
})
