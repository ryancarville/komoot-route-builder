import '../../../styles/routeList.css'

import {
  MdDeleteOutline,
  MdExpandLess,
  MdExpandMore,
  MdMenu
} from 'react-icons/md';
import React, {useEffect, useState} from 'react'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';
import { markersAction, unitTypes } from '../../../constants/common'

import Button from '../../atoms/Button'
import { FcDeleteDatabase } from 'react-icons/fc';
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { downloadBlob } from '../../../utils/common'
import { gpxGenerator } from '../../../utils/gpxGenerator'

// route list functional component
const RouteList = (props) => {
  const {
    routeTitle,
    markers,
    removeWaypoint,
    handleDrag,
    handleDrop,
    handleShift,
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
  const [isMobile, setIsMobile] = useState(false);

  // on load get the screen width for conditional elements
  // also calculate the viewport height to allow for acuate height value
  useEffect(() => {
    if (window) setIsMobile(window.innerWidth < 500);
    // add event listener on window resize
    window.addEventListener('resize', () => {
      // // calc the vh
      let vh = window.innerHeight * 0.01;
      // // set the value in the --vh custom property
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
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

  // save the current markers, route title and unit type to local storage
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
    removeWaypoint(markersAction.ALL);
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
              Rearrange the order of the waypoints with a click of the arrows on
              mobile or drag and drop on desktop
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
                    <span className={'moveCardItems'}>
                      <VscTriangleDown
                        onClick={() => handleShift(mark.id, mark.id + 1)}
                      />{' '}
                      <VscTriangleUp
                        onClick={() => handleShift(mark.id, mark.id - 1)}
                      />
                    {!isMobile && <MdMenu id={mark.id} />}
                    </span>
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