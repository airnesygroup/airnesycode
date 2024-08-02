// components/Popup.js
"use client";

import React from 'react';

const Popup = ({ onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '5px' }}>
        <h2>Welcome</h2>
        <p>This is a description of the popup.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
