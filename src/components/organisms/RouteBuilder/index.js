import React, { Component } from "react";
import RouteList from "../../molecules/RouteList"
import Map from '../../molecules/Map'
import '../../../styles/routeBuilder.css'
import ToolBar from '../ToolBar'
import { unitTypes } from "../../../constants/common"
import useLocalStorage from "../../../hooks/localStorage"

// component for route builder
class RouteBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      currentDistance: 0.00,
      unitType: unitTypes.miles
    };
    this.waypointPrefix = 'Waypoint';
  }

  // check if there is a saved route
  componentDidMount() {
    const ls = new useLocalStorage();
    const savedRoute = ls.getItem('route');
    const savedUnits = ls.getItem('units');
    if (savedRoute) {
      const markers = JSON.parse(savedRoute);
      this.setState({markers, unitType: savedUnits})
    }
  }
  // handle sorting array
  handleSort = (array) => {
    return array.sort((a, b) => a.id - b.id);
  };
  // add new waypoint to list
  handleAddWaypoint = (newMarker) => {
    const id = this.state.markers.length + 1;
    const mark = {
      ...newMarker,
      name: `${this.waypointPrefix} ${id}`,
      id
    };
    this.setState({
      markers: this.handleSort([...this.state.markers, mark])
    });
  };

  // delete selected waypoint from list
  handleRemoveWaypoint = (id) => {
    const currWaypoint = this.state.markers.filter((mark) => mark.id !== id);
    const updatedIds = currWaypoint.map((point) => {
      if (point.id < id) return point;
      point.id--;
      if (point.name.includes(this.waypointPrefix)) {
        point.name = `${this.waypointPrefix} ${point.id}`;
      }

      return point;
    });
    this.setState({
      markers: this.handleSort(updatedIds)
    });
  };

  handleDrag = (ev) => {
    this.setState({
      dragId: +ev.target.id
    });
  };

  handleMarkerMove = (newMarkCoords) => {
    const { markers } = this.state;
    const oldMarker = markers.find((m) => m.name === newMarkCoords.name);
    const newMarker = {
      ...oldMarker,
      lat: newMarkCoords.lat,
      lng: newMarkCoords.lng
    };

    const prevMarkers = markers.filter((m) => m.id !== oldMarker.id);
    const updatedMarkers = [...prevMarkers, newMarker];
    this.setState({ markers: this.handleSort(updatedMarkers) });
  };

  handleDrop = (ev) => {
    const { markers, dragId } = this.state;
    const dragBox = markers.find((m) => m.id === dragId);
    const dropBox = markers.find((m) => m.id === +ev.target.id);

    const dragBoxOrder = dragBox.id;
    const dropBoxOrder = dropBox.id;

    const newMarkersState = markers.map((mark) => {
      // if mark if higher than moved mark and higher than destination mark
      if (mark.id > dragBoxOrder && dropBoxOrder < mark.id) {
        return mark;
      }
      // if mark if higher than moved mark and lower than destination mark
      else if (mark.id > dragBoxOrder && dropBoxOrder > mark.id) {
        mark.id--;
      } // if mark if lower than moved mark and higher or equal to destination mark
      else if (mark.id < dragBoxOrder && dropBoxOrder <= mark.id) {
        mark.id++;
      } // if mark is moved mark
      else if (mark.id === dragBoxOrder) {
        mark.id = dropBoxOrder;
      } // if mark is destination mark
      else if (mark.id === dropBoxOrder) {
        mark.id--;
      }

      if (mark.name.includes(this.waypointPrefix)) {
        mark.name = `${this.waypointPrefix} ${mark.id}`;
      }

      return mark;
    });

    this.setState({
      markers: this.handleSort(newMarkersState)
    });
  };

  // update state with new marker name
  handleNameChange = (markerToChange) => {
    const { markers } = this.state;
    const currMarker = markers.find((m) => m.id === markerToChange.id);
    currMarker.name = markerToChange.name;
    const prevState = markers.filter((m) => m.id !== markerToChange.id);
    this.setState({
      markers: this.handleSort([...prevState, currMarker])
    });
  };

  handleDistance = (distance) => this.setState({ currentDistance: distance });

  handleUnitChange = (unit) => {
    this.setState({ unitType: unit })
  }

  render() {
    return (
      <section className={'routeBuilderWrapper'}>
        <aside className={'routeBuilderSideBar'}>
          <ToolBar
            handleUnitType={this.handleUnitChange}
          />
          <RouteList
            markers={this.state.markers}
            removeWaypoint={this.handleRemoveWaypoint}
            handleDrag={this.handleDrag}
            handleDrop={this.handleDrop}
            handleNameChange={this.handleNameChange}
            currentDistance={`${this.state.currentDistance} ${this.state.unitType}`}
            currentUnits={this.state.unitType}
          />
        </aside>
        <Map
          markers={this.state.markers}
          handleMapClick={this.handleAddWaypoint}
          handleMarkerMove={this.handleMarkerMove}
          handleDistance={this.handleDistance}
          unitType={this.state.unitType}
        />
      </section>
    );
  }
}

export default RouteBuilder;