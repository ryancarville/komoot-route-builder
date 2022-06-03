import React, {useEffect, useState} from 'react'
import { MdDeleteOutline, MdMenu } from 'react-icons/md';
import { FcDeleteDatabase } from 'react-icons/fc';
import useLocalStorage from '../../../hooks/localStorage'
import '../../../styles/routeList.css'
import { downloadBlob } from '../../../utils/common'
import { gpxGenerator } from '../../../utils/gpxGenerator'
import Button from '../../atoms/Button'

const RouteList = (props) => {
  const {
    routeTitle,
    isSideBarOpen,
    markers,
    removeWaypoint,
    handleDrag,
    handleDrop,
    handleRouteTitleChange,
    handleNameChange,
    currentDistance,
    currentUnits
  } = props;

  const [showSavedMsg, setShowSavedMsg] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showDeleteAllMsg, setShowDeleteAllMsg] = useState(false);

  useEffect(() => {
    window.innerWidth < 500 ? setShowInstructions(false) : setShowInstructions(true);
  },[])

  const handleShowInstructions = () => setShowInstructions(!showInstructions);

  const handleTitleChange = (e) => {
    const { value } = e.target;
    handleRouteTitleChange(value);
  };

  const handleMarkerNameChange = (e) => {
    const { id, value } = e.target;
    handleNameChange({ id: +id, name: value });
  };

  // save the current markers and unit type to local storage
  const handleSaveRoute = () => {
    const ls = new useLocalStorage();
    ls.setItem('route', JSON.stringify(markers))
    ls.setItem('routeTitle', routeTitle);
    ls.setItem('units', currentUnits);
    setShowSavedMsg(true);
    setTimeout(() => {
      setShowSavedMsg(false)
    }, 2500);
  }

  // parser markers into gpx file and auto download
  const handleDownloadRoute = () => {
    setIsDownloading(true);
    const file = gpxGenerator(routeTitle, markers);
    console.log(file)
    downloadBlob(new Blob([file]), `${routeTitle.replaceAll(' ', '-')}.gpx`);
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloaded(true);
    }, 1500);
    setTimeout(() => {
      setIsDownloaded(false);
    }, 4500)
  }

  const handleShowDeleteAllMsg = () => {
    if (markers.length) setShowDeleteAllMsg(true);
  }

  const handleDeleteAll = () => {
    removeWaypoint('all');
    setShowDeleteAllMsg(false);
  }

  return (
    <aside
      className={isSideBarOpen ? 'routeListWrapper' : 'routeListWrapperClose'}
    >
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
          <h4>Welcome to your Komoot Route Builder</h4>
          {showInstructions ? (
            <span onClick={handleShowInstructions}>-</span>
          ) : (
            <span onClick={handleShowInstructions}>+</span>
          )}
        </div>
        <p>Let's start building your route!</p>
        <p>You can:</p>
        <ul className={'instructionsList'}>
          <li>Title your route</li>
          <li>Drop a waypoint on the map by clicking the location you want</li>
          <li>Drag a waypoint to a new location</li>
          <li>
            Rearrange the order of the waypoints with a simple drag and drop of
            the card below
          </li>
          <li>Rename your waypoints</li>
          <li>
            Save your route.
            <br />
            <i>
              The route will display if you refresh or close/open the browser
            </i>
          </li>
          <li>Download a GPX file for you device</li>
        </ul>
      </div>
      <input
        key={'routeTitle'}
        className={'routeTitleInput'}
        onChange={handleTitleChange}
        value={routeTitle}
      />
      <div className={'routeTotalsWrapper'}>
        <p>{markers.length} Waypoints</p>
        <p>Total Distance: {currentDistance}</p>
      </div>
      {markers.length > 0 && (
        <div style={{ width: '100%', textAlign: 'right', marginRight: '3em' }}>
          <FcDeleteDatabase
            onClick={handleShowDeleteAllMsg}
            color={'white'}
            size={'2em'}
            style={{ cursor: 'pointer' }}
          />
        </div>
      )}
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
      {showDeleteAllMsg && (
        <div className='deleteAllMsgWrapper'>
          <div className='deleteAllMsg'>
            <p>Are you sure you want to delete all of your waypoints?</p>
            <Button
              text='Confirm'
              onClick={() => handleDeleteAll()}
              cls={'deleteAllBtnConfirm'}
            />
            <Button
              text='Cancel'
              onClick={() => setShowDeleteAllMsg(false)}
              cls={'deleteAllBtnCancel'}
            />
          </div>
        </div>
      )}
      {showSavedMsg && (
        <div className={'routeSavedMsg'}>
          <p>Route saved!</p>
        </div>
      )}
      {isDownloaded && (
        <div className={'routeSavedMsg'}>
          <p>GPX downloaded!</p>
        </div>
      )}
      <div className='downloadWrapper'>
        <Button
          cls='saveRouteBtn'
          text='Save Route'
          onClick={handleSaveRoute}
        />
        <Button
          cls='gpxDownloadBtn'
          text={isDownloading ? 'Downloading...' : 'Download Route'}
          onClick={handleDownloadRoute}
        />
      </div>
    </aside>
  );
}

export default RouteList