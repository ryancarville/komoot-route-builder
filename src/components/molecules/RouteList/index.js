import React, {useState} from 'react'
import {
  MdDeleteOutline,
  MdMenu,
  MdExpandLess,
  MdExpandMore
} from 'react-icons/md';
import { FcDeleteDatabase } from 'react-icons/fc';
import '../../../styles/routeList.css'
import { downloadBlob } from '../../../utils/common'
import { gpxGenerator } from '../../../utils/gpxGenerator'
import Button from '../../atoms/Button'
import clsx from 'clsx'
import { unitTypes } from '../../../constants/common'
import PropTypes from 'prop-types'

// route list functional component
const RouteList = (props) => {
  const {
    routeTitle,
    markers,
    removeWaypoint,
    handleDrag,
    handleDrop,
    handleRouteTitleChange,
    handleNameChange,
    currentDistance,
    currentUnits
  } = props;

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [showDeleteAllMsg, setShowDeleteAllMsg] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

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
    setIsSaving(true)
    const routeData = {
      routeTitle,
      unitType: currentUnits,
      markers
    }
    localStorage.setItem('savedRoute', JSON.stringify(routeData))
    // mimic api calls
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false)
      }, 2500);
    }, 1500);
  }

  // parser markers into gpx file and auto download
  const handleDownloadRoute = () => {
    setIsDownloading(true);
    const file = gpxGenerator(routeTitle, markers);
    downloadBlob(new Blob([file]), `${routeTitle.replaceAll(' ', '-')}.gpx`);
    // mimic api calls
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloaded(true);
    }, 1500);
    setTimeout(() => {
      setIsDownloaded(false);
    }, 4500);
  }

  const handleShowDeleteAllMsg = () => {
    if (markers.length) setShowDeleteAllMsg(true);
  }

  const handleDeleteAll = () => {
    removeWaypoint('all');
    setShowDeleteAllMsg(false);
  }

  return (
    <aside className={'routeListWrapper'}>
      <div className={'routeListMainContent'}>
        <div className='routeListHeader'>
          <h2>Route Builder</h2>
        </div>
        <div
          className={clsx([
            'routeBuilderInstructions',
            showInstructions
              ? 'routeBuilderInstructionsOpen'
              : 'routeBuilderInstructionsClosed'
          ])}
        >
          <div className={'instructionsHeader'}>
            <h4>Welcome to your Komoot Route Builder</h4>
            {showInstructions ? (
              <span>
                <MdExpandLess onClick={handleShowInstructions} />
              </span>
            ) : (
              <span>
                <MdExpandMore onClick={handleShowInstructions} />
              </span>
            )}
          </div>
          <p>Let's start building your route!</p>
          <p>You can:</p>
          <ul className={'instructionsList'}>
            <li>Title your route</li>
            <li>
              Drop a waypoint on the map by clicking the location you want
            </li>
            <li>Drag a waypoint to a new location</li>
            <li>
              Rearrange the order of the waypoints with a simple drag and drop
              of the card below
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
        {showInstructions ? null : (
          <>
            <input
              key={'routeTitle'}
              className={'routeTitleInput'}
              onChange={handleTitleChange}
              value={routeTitle}
            />
            <div className={'routeDataWrapper'}>
              <span className={'routeTotalsWrapper'}>
                <p>{markers.length} Waypoints</p>
                <p>Total Distance: {currentDistance}</p>
              </span>
              {markers.length > 0 && (
                <div className={'routeDeleteAllBtn'}>
                  <FcDeleteDatabase
                    onClick={handleShowDeleteAllMsg}
                    color={'white'}
                    size={'2em'}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
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
          </>
        )}
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
      </div>
      <div className='downloadWrapper'>
        <Button
          cls='saveRouteBtn'
          text={
            isSaving ? 'Saving...' : isSaved ? 'Route Saved!' : 'Save Route'
          }
          onClick={handleSaveRoute}
        />
        <Button
          cls='gpxDownloadBtn'
          text={
            isDownloading
              ? 'Downloading...'
              : isDownloaded
              ? 'GPX downloaded!'
              : 'Download Route'
          }
          onClick={handleDownloadRoute}
        />
      </div>
    </aside>
  );
}

RouteList.defaultProps = {
  routeTitle: 'Komoot Route',
  markers: [],
  removeWaypoint: () => {},
  handleDrag: () => {},
  handleDrop: () => {},
  handleRouteTitleChange: () => {},
  handleNameChange: () => {},
  currentDistance: '0.00',
  currentUnits: unitTypes.miles
};

RouteList.propTypes = {
  routeTitle: PropTypes.string,
  markers: PropTypes.array.isRequired,
  removeWaypoint: PropTypes.func.isRequired,
  handleDrag: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  handleRouteTitleChange: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  currentDistance: PropTypes.string,
  currentUnits: PropTypes.string
};

export default RouteList