import React, {Component} from 'react';
import axios from 'axios';
import Forest from './forest'
import Welcome from './welcome'
import History from './history'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: localStorage.address,
      viewedAccount: localStorage.address,
      transactions: [],
      currentPage: [],
      currentPageNum: 0,
      selectedNum: '',
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
        viewedAccount: account,
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

    const forest = {
      backgroundColor: 'green',
      gridArea: 'main',
    }

    const welcome = {
      backgroundColor: 'yellow',
      gridArea: 'sidebar',
    }

    const history =  {
      backgroundColor: 'red',
      gridArea: 'footer',
    }

    const container = {
      display: 'grid',
      maxHeight: '100vh',
      gridTemplateColumns: 'repeat(2, 60% 40%)',
      gridTemplateRows: 'repeat(4, 25vh)',
      gridTemplateAreas: '"main sidebar" "main footer" "main footer" "main footer"',
    }

    return (
      <div style={container}>
        <Forest style={forest} />
        <Welcome
          style = {welcome}
          account = {this.state.account}
        />
        <History
          style = {history}
          viewedAccount = {this.state.viewedAccount}
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
