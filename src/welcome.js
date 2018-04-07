import React from 'react';

const styles = {
   buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  }
};

const Welcome = ({ account, balance, style={} }) => {
  return (
    <div style={style}>
      <h2>{account}</h2>
      <div style={styles.buttonContainer}>
        <button>Pay</button>
        <button>Donate</button>
      </div>
    </div>
  )
};

export default Welcome;
