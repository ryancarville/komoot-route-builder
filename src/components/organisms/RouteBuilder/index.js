import React, { Component } from "react";
import RouteList from "../../molecules/RouteList";
import Map from "../../molecules/Map";
import "../../../styles/routeBuilder.css";
import ToolBar from "../ToolBar";
import { unitTypes } from "../../../constants/common";
import DrawerMenu from "../../molecules/DrawerMenu";
import logo from "../../../images/logo.png";
import { sortUtil, dragDropOrdering } from "../../../utils/common";

// class component for route builder
class RouteBuilder extends Component {
  constructor(props) {
    // get saved route from local storage
    const savedRoute = localStorage.getItem("savedRoute");
    let initialState = {
      routeTitle: "Komoot Route",
      markers: [],
      currentDistance: "0.00",
      unitType: unitTypes.miles
    };
    if (!!savedRoute) {
      initialState = JSON.parse(savedRoute);
    }
    super(props);
    this.state = {...initialState};
    this.waypointPrefix = "Waypoint";
  }

  // add new waypoint to list
  handleAddWaypoint = (newMarker) => {
    const id = this.state.markers.length + 1;
    const mark = {
      ...newMarker,
      name: `${this.waypointPrefix} ${id}`,
      id
    };
    this.setState({
      markers: sortUtil([...this.state.markers, mark], "-")
    });
  };

  // delete selected waypoint from list
  handleRemoveWaypoint = (id) => {
    if (id === "all") this.setState({ markers: [], currentDistance: 0.0 });
    else {
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
        markers: sortUtil(updatedIds, "-")
      });
    }
  };

  // update marker state data on location drag
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
    this.setState({ markers: sortUtil(updatedMarkers, "-") });
  };

  // set current drag id to state
  handleDrag = (ev) => {
    this.setState({
      dragId: +ev.target.id
    });
  };

  // adjust markers state on drop
  handleDrop = (ev) => {
    const { markers, dragId } = this.state;

    const newMarkersState = dragDropOrdering(markers, dragId, +ev.target.id, this.waypointPrefix);

    this.setState({
      markers: sortUtil(newMarkersState, '-')
    });
  };

  // update stat eon route title change
  handleRouteTitleChange = (title) => {
    this.setState({ routeTitle: title });
  };

  // update state with new marker name
  handleNameChange = (markerToChange) => {
    const { markers } = this.state;
    const currMarker = markers.find((m) => m.id === markerToChange.id);
    currMarker.name = markerToChange.name;
    const prevState = markers.filter((m) => m.id !== markerToChange.id);
    this.setState({
      markers: sortUtil([...prevState, currMarker], "-")
    });
  };

  // new distance handler
  handleDistance = (distance) => this.setState({ currentDistance: distance });

  // distance unit handler
  handleUnitChange = (unit) => this.setState({ unitType: unit });

  render() {
    const { routeTitle, unitType, markers, currentDistance } = this.state;
    return (
      <section className={"routeBuilderWrapper"}>
        <DrawerMenu menuIcon={logo}>
          <ToolBar
            handleUnitType={this.handleUnitChange}
            currUnitType={unitType}
            handleSideBar={this.handleSideBar}
          />
          <RouteList
            routeTitle={routeTitle}
            markers={markers}
            removeWaypoint={this.handleRemoveWaypoint}
            handleDrag={this.handleDrag}
            handleDrop={this.handleDrop}
            handleRouteTitleChange={this.handleRouteTitleChange}
            handleNameChange={this.handleNameChange}
            currentDistance={`${currentDistance} ${unitType}`}
            currentUnits={unitType}
          />
        </DrawerMenu>
        <Map
          markers={markers}
          handleMapClick={this.handleAddWaypoint}
          handleMarkerMove={this.handleMarkerMove}
          handleDistance={this.handleDistance}
          unitType={unitType}
        />
      </section>
    );
  }
}

export default RouteBuilder;