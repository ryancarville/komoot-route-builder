import React, {useState} from 'react'
import { MdDeleteOutline, MdMenu } from 'react-icons/md';
import useLocalStorage from '../../../hooks/localStorage'
import '../../../styles/routeList.css'
import { gpxGenerator } from '../../../utils/gpxGenerator'
import Button from '../../atoms/Button'

const RouteList = (props) => {
  const {
    markers,
    removeWaypoint,
    handleDrag,
    handleDrop,
    handleNameChange,
    currentDistance,
    currentUnits
  } = props;

  const [showSavedMsg, setShowSavedMsg] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const handleShowInstructions = () => setShowInstructions(!showInstructions);

  const handleMarkerNameChange = (e) => {
    const { id, value } = e.target;
    handleNameChange({ id: +id, name: value });
  };

  // save the current markers and unit type to local storage
  const handleSaveRoute = () => {
    const ls = new useLocalStorage();
    ls.setItem('route', JSON.stringify(markers))
    ls.setItem('units', currentUnits);
    setShowSavedMsg(true);
    setTimeout(() => {
      setShowSavedMsg(false)
    }, 2500);
  }

  // parser markers into gpx file and auto download
  const handleDownloadRoute = () => {
    const file = gpxGenerator(markers);
    console.log(file)
  }
  return (
    <aside className='routeListWrapper'>
      <div className='routeListHeader'>
        <h2>Route Builder</h2>
      </div>
      <div
        className={
          showInstructions
            ? 'routeBuilderInstructions'
            : 'closedRouteBuilderInstructions'
        }
      >
        <div className={'instructionsHeader'}>
          <h4>Welcome to your Komoot Route Builder!</h4>
          {showInstructions ? (
            <span onClick={handleShowInstructions}>-</span>
          ) : (
            <span onClick={handleShowInstructions}>+</span>
          )}
        </div>
        <p>Let's start building your route</p>
        <p>You can:</p>
        <ul className={'instructionsList'}>
          <li>Drop a waypoint on the map by clicking the location you want</li>
          <li>Drag a waypoint to a new location</li>
          <li>
            Rearrange the order of the waypoints with a simple drag and drop of
            the card below to its desired position
          </li>
          <li>Rename your waypoints</li>
          <li>
            Save your route. The builder will display it if you refresh or close
            the browser
          </li>
          <li>Download a GPX file for you device</li>
        </ul>
      </div>
      <div className={'routeTotalsWrapper'}>
        <p>{markers.length} Waypoints</p>
        <p>Total Distance: {currentDistance}</p>
      </div>
      <div className='routeList'>
        {markers.map((mark) => (
          <div
            key={mark.id}
            className='waypointItem'
            draggable={true}
            id={mark.id}
            onDragOver={(e) => e.preventDefault()}
            onDragStart={handleDrag}
            onDrop={handleDrop}
          >
            <div className='waypointContent' id={mark.id}>
              <MdMenu id={mark.id} />
              <input
                key={mark.id}
                id={mark.id}
                className={'waypointNameInput'}
                onChange={handleMarkerNameChange}
                value={mark.name}
              />
            </div>
            <MdDeleteOutline onClick={() => removeWaypoint(mark.id)} />
          </div>
        ))}
      </div>

      {showSavedMsg && (
        <div className={'routeSavedMsg'}>
          <p>Route saved!</p>
        </div>
      )}
      <div className='downloadWrapper'>
        <Button cls='saveRouteBtn' text='Save Route' onClick={handleSaveRoute} />
        <Button cls='gpxDownloadBtn' text='Download Route' onClick={handleDownloadRoute}/>
      </div>
    </aside>
  );
}

export default RouteList