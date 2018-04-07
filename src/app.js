import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: true,
      transactions: [],
      currentPage: [],
      currentPageNum: 0,
      selectedNum: '',
      account: localStorage.address,
      balance: 500,
      forest : localStorage.forest,
    }
    this.setPage = this.setPage.bind(this);
    this.loadAccount = this.loadAccount.bind(this);
    // this.setSelected = this.setSelected.bind(this);
  }
  
  componentDidMount() {
    this.loadAccount(this.state.account)
  }

  loadAccount(account) {
    axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${account}&tag=latest`).then(response=>{
      let temp = [];
      response.data.result.forEach((t) => {
        temp.push([t.to, t.from, t.value])
      })
      this.setState({
        account: account,
        transactions: temp, 
        currentPage: temp.slice(0, 5),
      })
    });
  }

  setPage(page) {
    let lastPage = Math.floor((this.state.transactions.length - 1) / 5);
    isNaN(page * 1) ? page = 0 : page;
    page > lastPage ? page = lastPage : page;
    let first = page * 5;
    let last = page * 5 + 5;
    this.setState({
      currentPageNum: page, 
      currentPage: this.state.transactions.slice(first, last)
    });
  }

  setSelected(e) {
    this.setState({selectedNum: e.target.value});
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

    const cursor = {
      cursor: 'pointer',
    }

    return (
      <div>
        {this.state.test &&
          <div>
            <p>Address: {this.state.account.slice(0,5)}...{this.state.account.slice(-5)}</p>
            <p>Balance: {this.state.balance}</p>
            <button>Refresh Balance</button>
            <ul>
              <li><button>Pay</button></li>
              <li><button>Donate</button></li>
            </ul>
            <p>History</p>
            <ul style={transactionList}>
              {       
                this.state.currentPage.map((transaction, i) => {
                  return (
                    i < this.state.currentPage.length - 1 ?
                      <li style={listBox}>
                        To: <span style={cursor} onClick={(e)=>{this.loadAccount(e.target.innerText)}}>{transaction[0]}</span> <br />
                        From:  <span style={cursor} onClick={(e)=>{this.loadAccount(e.target.innerText)}}>{transaction[1]}</span> <br />
                        Value: {transaction[2]} <br />
                      </li>
                    :
                      <li style={Object.assign({}, listBox, closingLine)}>
                        To: <span style={cursor} onClick={(e)=>{this.loadAccount(e.target.innerText)}}>{transaction[0]}</span> <br />
                        From:  <span style={cursor} onClick={(e)=>{this.loadAccount(e.target.innerText)}}>{transaction[1]}</span> <br />
                        Value: {transaction[2]} <br />
                      </li>
                  )
                })
              }
            </ul>
            <input value={this.state.selectedNum} onChange={this.setSelected.bind(this)}/>
            <button onClick={()=>{this.setPage(this.state.selectedNum)}}>Select Page</button>
          </div>
        }
      </div>
    )
  }
}

export default App;