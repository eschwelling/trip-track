import React from 'react';
import { browserHistory } from 'react-router'

const BackButton = () => {
  return(
    <div id="back-button">
        <button className="button button-pill" onClick={browserHistory.goBack}>Back</button>
    </div>
  )
}

export default BackButton;
