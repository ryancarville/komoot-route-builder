import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet.animatedmarker/src/AnimatedMarker';
import '../../../styles/map.css'
import { unitTypes } from '../../../constants/common';
import waypointMarker from '../../atoms/WaypointMarker'
import LoadingScreen from '../../atoms/LoadingScreen'

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = undefined;
    this.state = {
      startLocation: {
        lat: undefined,
        lng: undefined
      },
      waypointCount: undefined,
      isLoading: true,
      currUnitType: this.props.unitType
    };
  }

  getUserLocation = () => {
    if(navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude)
        this.setState({
          startLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    } else {
      this.setState({ startLocation: {
        lat: 0,
        lng: 0
      }})
    }
  };

  getCurrDistance = () => this.map.getDistance(this.props.unitType).toFixed(2);

  updateDistance = () => {
    const currDist = this.getCurrDistance();
    this.props.handleDistance(currDist);
    this.setState({ currUnitType: this.props.unitType, currDist });
  };

  componentDidMount() {
    if (!!!this.state.startLocation.lat) this.getUserLocation();
  }

  componentDidUpdate() {
    const { markers, unitType } = this.props;
    const { startLocation, waypointCount, currUnitType } = this.state;

    // only create the map is not already initialized
    if (!!startLocation.lat && !!startLocation.lng && !!!this.map) {
      // add distance calculation func to polyline class
      L.Polyline = L.Polyline.include({
        getDistance: function (system) {
          // distance in meters
          var mDistance = 0,
            length = this._latlngs.length;
          for (var i = 1; i < length; i++) {
            mDistance += this._latlngs[i].distanceTo(this._latlngs[i - 1]);
          }
          // optional
          if (system === unitTypes.miles) {
            return mDistance / 1609.34;
          } else {
            return mDistance / 1000;
          }
        }
      });
      // set the current users view var
      // if saved markers set center to them else set view to current location or global if geo location not available
      const currView = markers.length
        ? [markers[0].lat, markers[0].lng]
        : [startLocation.lat, startLocation.lng];
      // create map
      this.map = L.map('map', {
        layers: [
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
        ]
      }).setView(currView, 15);
      // add click event listener to map
      this.map.on('click', this.handleMapClick);
      // set zoom controller location
      this.map.zoomControl.setPosition('topright');
      // add new layer for markers/paths to map
      this.layer = L.layerGroup().addTo(this.map);
      // check the size is correct
      this.map.invalidateSize();
      // mock loading times
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2500);
    } else if (!!this.map) {
      // clear the marker/path layer if there are no markers or if the amount drops or order changes
      if (markers.length === 0 || markers.length <= waypointCount)
        this.layer.clearLayers();

      // create or update markers and paths
      if (markers.length > 0) this.handleMarkers();

      // update waypoint count
      if (markers.length !== waypointCount)
        this.setState({ waypointCount: markers.length });

      // update distance if units change
      if (unitType !== currUnitType) this.updateDistance();
    }
  }

  handleMarkerDrag = (e) => {
    const { _icon, _latlng } = e.target;
    console.log(_icon);
    const parsedData = {
      name: _icon.title,
      ..._latlng
    };
    this.props.handleMarkerMove(parsedData);
  };
  // add markers and paths to map
  handleMarkers = () => {
    const { markers } = this.props;
    // markers
    markers.forEach((m) => {
      var popup = L.popup()
        .setLatLng([m.lat, m.lng])
        .setContent(`<span class='markerPopup'>${m.name}</span>`);

      L.marker(m, {
        icon: waypointMarker(m.id),
        title: m.name,
        alt: m.name,
        draggable: true,
        autoPan: true,
        riseOnHover: true,
      }).bindPopup(popup).openPopup()
      .addEventListener('moveend', this.handleMarkerDrag)
      .addTo(this.layer)
    })

    this.map = L.polyline(
      markers.map((m) => [m.lat, m.lng]),
      { color: 'blue', weight: 10 }
    ).addTo(this.layer);

    if (this.getCurrDistance() !== this.state.currDist) this.updateDistance();
  };

  // handle when map is clicked
  handleMapClick = (e) => this.props.handleMapClick(e.latlng);

  render() {
    return (
      <>
        <LoadingScreen isLoading={this.state.isLoading} />
        <div className={'mapWrapper'}>
          <div id='map'></div>
        </div>
      </>
    );
  }
};

export default Map;