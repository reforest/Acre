import React, {Component} from 'react';
import axios from 'axios';
import Forest from './forest'
import Welcome from './welcome'
import History from './history'

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
    this.setSelected = this.setSelected.bind(this);
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
    return (
      <div>
        <Forest />
        <Welcome account = {this.state.account} balance = {this.state.balance} />
        <History 
          currentPage = {this.state.currentPage}
          loadAccount = {this.loadAccount}
          selectedNum = {this.state.selectedNum}
          setSelected = {this.setSelected}
          setPage = {this.setPage}
        />
      </div>
    )
  }
}

export default App;
