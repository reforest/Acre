import React from 'react';


const Welcome = ({style, account, balance}) => (
  <div style={style}>
    <p>Address: {account.slice(0,5)}...{account.slice(-5)}</p>
    <button>Pay</button>
    <button>Donate</button>
  </div>
)

export default Welcome;
