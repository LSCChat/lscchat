import React, { useState } from 'react';
import './compaign.css'; // Import your CSS file

const Campaign = () => {
  const [progress, setProgress] = useState(0);

  const handleStepClick = (step) => {
    setProgress(step);
  };

  const renderContent = () => {
    switch (progress) {
      case 0:
        return (
          <div id="first">
            <h2>Plan & Research</h2>
            <p>Lorem Ipsum...</p>
          </div>
        );
      case 34:
        return (
          <div id="second">
            <h2>Design</h2>
            <p>Lorem Ipsum...</p>
          </div>
        );
      case 67:
        return (
          <div id="third">
            <h2>Development</h2>
            <p>Lorem Ipsum...</p>
          </div>
        );
      case 100:
        return (
          <div id="fourth">
            <h2>Launch</h2>
            <p>Lorem Ipsum...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="row main-campaign">
      <div className="cont">
        <progress id="nprogress-bar" value={progress} max="100"></progress>
        <div id="step">
          <span className={`first ${progress >= 0 ? 'border-change' : ''}`} onClick={() => handleStepClick(0)}>
            <i className="fa fa-flask"></i>
          </span>
          <span className={`second ${progress >= 34 ? 'border-change' : ''}`} onClick={() => handleStepClick(34)}>
            <i className="fa fa-paint-brush"></i>
          </span>
          <span className={`third ${progress >= 67 ? 'border-change' : ''}`} onClick={() => handleStepClick(67)}>
            <i className="fa fa-code"></i>
          </span>
          <span className={`fourth ${progress === 100 ? 'border-change' : ''}`} onClick={() => handleStepClick(100)}>
            <i className="fa fa-rocket"></i>
          </span>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Campaign;
