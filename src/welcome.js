import React from 'react';


const Welcome = ({ account, balance, style={} }) => {
  
  const buttonContainer = {
    display: 'flex',
    justifyContent: 'space-around',
  }

  return (
    <div style={style}>
      <h2>{account}</h2>
      <div style={buttonContainer}>
        <button>Pay</button>
        <button>Donate</button>
      </div>
    </div>
  )
}

export default Welcome;
