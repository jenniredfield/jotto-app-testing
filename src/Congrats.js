import React from 'react';
import PropsTypes from 'prop-types';

function Congrats({success}) {
      if (success) {
          return (
            <div data-test="component-congrats" className="alert alert-success">
                <span data-test="congrats-message">Congratulations!</span>
            </div> )
      } else {
          return (
              <div data-test="component-congrats"/>
          )
      }
}

Congrats.propTypes = {
    success: PropsTypes.bool.isRequired
}

export default Congrats;
