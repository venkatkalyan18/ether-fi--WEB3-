import React, { useState, useEffect } from 'react';
 // Import CSS for styling
import './App.css'

const Loading = () => {



  return (

        <div className="loading-animation">
          <div className="loading-circle"></div>
          <div className="loading-text">Loading...</div>
        </div>

  );
};

export default Loading;