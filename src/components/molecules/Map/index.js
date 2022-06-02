import React, { Component } from 'react';
import L from 'leaflet';
import '../../../styles/map.css'

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startLocation: navigator.geolocation.getCurrentPosition((position) => {
          return {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
      }),

    };
  }
  // const { handleMapClick, markers } = props;

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        startLocation:{
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    })
  }

  componentDidMount() {
    if (!this.state.startLocation) this.getUserLocation();
  }
  componentDidUpdate() {
    if (this.state.startLocation && !!!this.map) {
      // create map
      this.map = L.map('map', {
        center: [this.state.startLocation.lat, this.state.startLocation.lng],
        zoom: 16,
        layers: [
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
        ]
      });
      this.map.on('click', this.handleMapClick)
      this.layer = L.layerGroup().addTo(this.map);
    }
    if (this.props.markers) {
      console.log(this.props.markers)
      this.props.markers.map(m => L.marker(
      m,
      { title: m.name, draggable: true }
    ).addTo(this.layer));
      this.map = L.polyline(
        this.props.markers.map((m) => [m.lat, m.lng]),
        { color: 'lime', weight: 10 }
      ).addTo(this.layer);
    }
  }
  handleMapClick = (e) => {
    console.log(e)
    this.props.handleMapClick(e.latlng)
    // this.map = L.polygon([
    //   [51.509, -0.08],
    //   [51.503, -0.06],
    //   [51.51, -0.047]
    // ])
  }
  render() {
    return (
      <div className={'mapWrapper'}>
          <div id='map'></div>
      </div>
    );
  }
};

export default Map;
// export default GoogleApiWrapper({
//   apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
// })(Map)