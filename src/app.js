import React, {Component} from 'react';
import axios from 'axios';
import Forest from './forest'
import Welcome from './welcome'
import History from './history'

const styles = {
    forest: {
        backgroundColor: 'green',
        gridArea: 'main',
   },
    welcome: {
        backgroundColor: 'yellow',
        gridArea: 'sidebar',
    },
    history:  {
        backgroundColor: 'red',
        gridArea: 'footer',
    },
    container: {
        display: 'grid',
        maxHeight: '100vh',
        gridTemplateColumns: 'repeat(2, 60% 40%)',
        gridTemplateRows: 'repeat(4, 25vh)',
        gridTemplateAreas: '"main sidebar" "main footer" "main footer" "main footer"',
    },
};

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
      loading: false,
    };
    this.setPage = this.setPage.bind(this);
    this.loadAccount = this.loadAccount.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }
  
  componentDidMount() {
    this.loadAccount(this.state.account)
  }

  loadAccount(account) {
    this.setState({ loading: true });
    axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${account}&tag=latest`)
        .then(response => {
            let temp = [];
            response.data.result.forEach((t) => {
                temp.push([t.to, t.from, t.value])
            });
            this.setState({
                viewedAccount: account,
                transactions: temp,
                currentPage: temp.slice(0, 5),
                loading: false,
            });
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
      <div style={styles.container}>
        <Forest style={styles.forest} />
        <Welcome
          style={styles.welcome}
          account={this.state.account}
        />
        <History
          style={styles.history}
          viewedAccount={this.state.viewedAccount}
          currentPage={this.state.currentPage}
          loadAccount={this.loadAccount}
          selectedNum={this.state.selectedNum}
          setSelected={this.setSelected}
          setPage={this.setPage}
          loading={this.state.loading}
          transactions = {this.state.transactions}
        />
      </div>
    )
  }
}

export default App;
