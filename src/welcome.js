import React from 'react';


const Welcome = ({account, balance}) => (
  <div>
    <p>Address: {account.slice(0,5)}...{account.slice(-5)}</p>
    <p>Balance: {balance}</p>
    <button>Refresh Balance</button>
    <ul>
      <li><button>Pay</button></li>
      <li><button>Donate</button></li>
    </ul>
    <p>History</p>
  </div>
)

export default Welcome;
