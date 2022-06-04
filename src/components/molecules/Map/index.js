import React, { Component } from 'react';
import L from 'leaflet';
import '../../../styles/map.css'
import { unitTypes } from '../../../constants/common';
import waypointMarker from '../../atoms/WaypointMarker'
import LoadingScreen from '../../atoms/LoadingScreen'

// map class component
class Map extends Component {
  constructor(props) {
    super(props);
    this.map = undefined;
    this.state = {
      waypointCount: undefined,
      isLoading: true,
      currUnitType: this.props.unitType
    };
    // add distance calculation func to polyline class
    L.Polyline = L.Polyline.include({
      getDistance: function (system) {
        // distance in meters
        var mDistance = 0,
          length = this._latlngs.length;
        for (var i = 1; i < length; i++) {
          mDistance += this._latlngs[i].distanceTo(this._latlngs[i - 1]);
        }
        // calculated miles or km
        if (system === unitTypes.miles) {
          return mDistance / 1609.34;
        } else {
          return mDistance / 1000;
        }
      }
    });
  }

  componentDidMount() {
    const { markers } = this.props;
    // only create the map if not already initialized
    if (!!!this.map) {
      // create map
      this.map = L.map('map', {
        zoom: 15,
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '© OpenStreetMap'
          })
        ]
      }).fitWorld();

      // add error handle is location not found
      this.map.on('locationerror', this.handleLocationError);

      // add click event listener to map
      this.map.on('click', this.handleMapClick);

      // add new layer for markers/paths to map
      this.layer = L.layerGroup().addTo(this.map);

      // check the size is correct
      this.map.invalidateSize();

      // set zoom controller location
      this.map.zoomControl.setPosition('topright');

      // if saved markers set view to them else set view to current location
      if (markers.length > 0) {
        const currView = [markers[0].lat, markers[0].lng];
        this.map.setView(currView, 15);
      } else {
        // set location to uses location
        this.map.locate({ setView: true, zoom: 15 });
      }

      // mock data fetch
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2500);
    }
  }

  componentDidUpdate() {
    const { markers, unitType } = this.props;
    const { waypointCount, currUnitType } = this.state;

    // map must be initialed for these conditions
    if (!!this.map) {
      // clear the marker/path layer if there are no markers or if the amount drops or order changes
      if (markers.length === 0 || markers.length <= waypointCount)
        this.layer.clearLayers();

      // create or update markers and paths
      if (markers.length > 0) this.handleMarkers();

      // update waypoint count
      if (markers.length !== waypointCount)
        this.setState({ waypointCount: markers.length });

      // update distance if units change
      if (this.map.getDistance && unitType !== currUnitType)
        this.updateDistance();
    }
  }

  // distance calculation handler
  getCurrDistance = () => this.map.getDistance(this.props.unitType).toFixed(2);

  // update the current distance if waypoint added or moved
  updateDistance = () => {
    const currDist = this.getCurrDistance();
    this.props.handleDistance(currDist);
    this.setState({ currUnitType: this.props.unitType, currDist });
  };

  // handle location error
  handleLocationError = (e) => {
    alert(e.message);
  };

  // add markers and paths to map
  handleMarkers = () => {
    const { markers } = this.props;
    const { currDist } = this.state;

    // markers
    markers.forEach((m) => {
        // bind popup var to each marker
        var popup = L.popup()
          .setLatLng([m.lat, m.lng])
          .setContent(`<span class='markerPopup'>${m.name}</span>`);

        // initialize marker class
        L.marker(m, {
          icon: waypointMarker(m.id),
          title: m.name,
          alt: m.name,
          draggable: true,
          autoPan: true,
          riseOnHover: true
        })
          .bindPopup(popup)
          .openPopup()
          .addEventListener('moveend', this.handleMarkerDrag)
          .addTo(this.layer);
      });

    // initialize polyline class
    this.map = L.polyline(
      markers.map((m) => [m.lat, m.lng]),
      { color: 'blue', weight: 10 }
    ).addTo(this.layer);

    // if the distance has changed update it
    if (this.getCurrDistance() !== currDist) this.updateDistance();
  };

  // handle marker drag
  handleMarkerDrag = (e) => {
    const { _icon, _latlng } = e.target;
    const parsedData = {
      name: _icon.title,
      ..._latlng
    };
    this.props.handleMarkerMove(parsedData);
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