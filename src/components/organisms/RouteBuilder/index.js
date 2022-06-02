import React, { Component } from "react";
import RouteList from "../../molecules/RouteList"
import Map from '../../molecules/Map'
import '../../../styles/routeBuilder.css'

// component for route builder
class RouteBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };
    this.waypointPrefix = 'Waypoint';
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
      markers: [...this.state.markers, mark]
    });
  };

  // delete selected waypoint from list
  handleRemoveWaypoint = (id) => {
    const currWaypoint = this.state.markers.filter((mark) => mark.id !== id);
    const updatedIds = currWaypoint.map((point) => {
      if (point.id < id) return point;
      point.id--;
      point.name = `${this.waypointPrefix} ${point.id}`;
      return point;
    });
    this.setState({
      markers: updatedIds
    });
  };

  handleDrag = (ev) => {
    this.setState({
      dragId: +ev.target.id
    });
  };

  handleDrop = (ev) => {
    const { markers, dragId } = this.state;
    const dragBox = markers.find((m) => m.id === dragId);
    const dropBox = markers.find((m) => m.id === +ev.target.id);

    const dragBoxOrder = dragBox.id;
    const dropBoxOrder = dropBox.id;

    const newMarkersState = markers.map((box) => {
      // if box if higher than moved box and lower than destination box
      if (box.id > dragBoxOrder && dropBoxOrder > box.id) {
        box.id--;
        box.name = `${this.waypointPrefix} ${box.id}`;
        return box;
      } // if box if higher than moved box and higher than destination box
      else if (box.id > dragBoxOrder && dropBoxOrder < box.id) {
        return box;
      } // if box if lower than moved box and higher or equal to destination box
      else if (box.id < dragBoxOrder && dropBoxOrder <= box.id) {
        box.id++;
        box.name = `${this.waypointPrefix} ${box.id}`
        return box;
      } // if box is moved box
      else if (box.id === dragBoxOrder) {
        box.id = dropBoxOrder;
        box.name = `${this.waypointPrefix} ${box.id}`;
        return box;
      } // if box is destination box
      else if (box.id === dropBoxOrder) {
        box.id--;
        box.name = `${this.waypointPrefix} ${box.id}`;
        return box;
      }
      return box;
    });

    this.setState({
      markers: [...newMarkersState]
    });
  };

  render() {
    return (
      <section className={'routeBuilderWrapper'}>
        <RouteList
          markers={this.state.markers}
          removeWaypoint={this.handleRemoveWaypoint}
          handleDrag={this.handleDrag}
          handleDrop={this.handleDrop}
        />
        <Map
          handleMapClick={this.handleAddWaypoint}
          markers={this.state.markers}
        />
      </section>
    );
  }
}

export default RouteBuilder;