import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// require('./user.css');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: true,
      transactions: []
    }
  }
  
  componentDidMount(){

  axios.get('https://api.etherscan.io/api?module=account&action=txlist&address=0xCD5cEdb2f353Ff7d7FC73f53AE6268e16ec89fE1&tag=latest').then(response=>{
    let temp = [];
    console.log(response.data.result)
    response.data.result.forEach((t) => {
      temp.push([t.to, t.from, t.value])
    })
    this.setState({ transactions: temp})
  });


}
  
  render() {
    
    const listBox = {
      padding: '5px',
      borderTop: '1px solid black',
      borderLeft: '1px solid black',
      borderRight: '1px solid black',
    }

    const closingLine = {
      borderBottom: '1px solid black',
    }

    const transactionList = {
      listStyle: 'none',
      width: '500px',
    }



    /*
    li:hover {
      background-color: yellow,
    }
    
    button {
      cursor: pointer,
    }
    */

    return (
      <div>
        {this.state.test &&
          <div>
            <p>Address: 0xABCD...EFGH</p>
            <p>Balance: 478</p>
            <button>Refresh Balance</button>
            <ul>
              <li><button>Pay</button></li>
              <li><button>Donate</button></li>
            </ul>
            <p>History</p>
            <ul style={transactionList}>
              {
                this.state.transactions.map((transaction, i) => {
                  return (
                    i < this.state.transactions.length - 1 ?
                      <li style={listBox}>
                        To: {transaction[0]} <br />
                        From: {transaction[1]} <br />
                        Value: {transaction[2]} <br />
                      </li>
                    :
                      <li style={Object.assign({}, listBox, closingLine)}>
                        To: {transaction[0]} <br />
                        From: {transaction[1]} <br />
                        Value: {transaction[2]} <br />
                      </li>
                  )
                })
              }
            </ul>
          </div>
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));