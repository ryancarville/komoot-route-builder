import React, { useEffect, useState } from 'react'
import '../../../styles/loadingScreen.css';
import runner from '../../../images/run.gif';
import PropTypes from 'prop-types'
// mock loading screen
const LoadingScreen = (props) => {
  const { isLoading } = props;
  const [loaderClass, setLoaderClass] = useState('loadingScreenWrapper');

  useEffect(() => {
    if (!isLoading) {
      setLoaderClass('loadingScreenCloseAnimation');
      setTimeout(() => {
        setLoaderClass('loadingScreenClose');
      }, 500);
    }

  },[isLoading]);

  return (
    <div className={loaderClass}>
      <div className={'loadingScreenContent'}>
        <img src={runner} alt={'runner'} className={'runnerImg'}/>
        <h2>Loading Route Builder...</h2>
      </div>
    </div>
  );
}

LoadingScreen.defaultProps = {
  isLoading: false
}

LoadingScreen.propTypes = {
  isLoading: PropTypes.bool
}

export default LoadingScreen;