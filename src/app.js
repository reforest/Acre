import React, {Component} from 'react';
import axios from 'axios';
import Forest from './forest'
import Welcome from './welcome'
import History from './history'

const { Scene } = require('./framework/Scene.js');
const THREE = require('three');
const { objects } = require('./framework/objects.js');
const { materials, greenShades } = require('./framework/materials.js');
const { createShape } = require('./framework/constructors.js');

const styles = {
    forest: {
        backgroundColor: '#e1a95f',
        gridArea: 'main',
   },
    welcome: {
        backgroundColor: 'rgba(225, 169, 95, 0.7)',
        gridArea: 'welcome',
    },
    history:  {
        backgroundColor: 'rgba(225, 169, 95, 0.7)',
        gridArea: 'history',
    },
    container: {
        display: 'grid',
        maxHeight: '100vh',
        gridTemplateColumns: 'repeat(2, 60% 40%)',
        gridTemplateRows: 'repeat(2, 40vh 60vh)',
        gridTemplateAreas: '"main main" "history welcome"',
        backgroundColor: '#e1a95f',
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
      forestWidth : 0,
      forestHeight: 0,
      loading: false,
    };
    this.setPage = this.setPage.bind(this);
    this.loadAccount = this.loadAccount.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }
  
  componentWillMount() {
    this.loadAccount(this.state.account)
  }

  loadAccount(account) {
    // console.log('hello', this.state);
    this.setState({ loading: true });
    axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${account}&tag=latest&offset=500&page=1`)
        .then(response => {
            let temp = [];
            console.log(response.data);
            response.data.result.forEach((t) => {
                temp.push([t.to, t.from, '.' + t.value])
            });
            this.setState({
                viewedAccount: account,
                transactions: temp,
                currentPage: temp.slice(0, 5),
                loading: false,
            });
            let forestHeight = (temp.length - 1) / 10 >= 5 ? 10 : (temp.length - 1) / 10 < 4 ? 4 : (temp.length - 1) / 10;
            let forestWidth = (temp.length - 1) / 10 >= 5 ? 12 : (temp.length - 1) / 10 < 4 ? 4 : (temp.length - 1) / 10;
            console.log('h x W', forestHeight, forestWidth, temp);
            //imports the setup from stage.js
            let scene = new Scene();
            // creates the group which is added to the scene
            let group = new THREE.Group();
            let tree = new THREE.Group();

            const treeMaker = function(x,z) {

              for (var i = 0; i < x; i++) {
                for (var j = 0; j < z; j++) {
            
                  let tree = new THREE.Group();
                  let trunk = objects.makeTrunk(materials.bone, 0, 50, 0);
                  tree.add(trunk);
            
            
                  // random height
                  let index = Math.floor(Math.random(1) * greenShades.length);
                  let material = greenShades[index];
                  //console.log(material);
            
                  let height = Math.floor(Math.random(1) * 50);
            
                  let h = (50 + Math.floor(Math.random(1) * 50));
                  let w = (50 + Math.floor(Math.random(1) * 50));
            
                  let shape1 = new THREE.BoxGeometry(w,h,w);
                  let shape2 = new THREE.BoxGeometry(w-20,h+20,w-20);
            
                  let leaves1 = createShape(shape1, material, 0, 100 + height, 0);
                  tree.add(leaves1);
            
                  let leaves2 = createShape(shape2, material, 0, 100 + height, 0);
                  tree.add(leaves2);
            
                  tree.position.set((i*200-1000),0,(j*200-1000))
                  group.add(tree)
                }
              }
            }
            treeMaker(forestHeight, forestWidth);
            scene.init(group);
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
      currentPage: this.state.transactions.slice(first, last),
      selectedNum: '',
    });
  }

  setSelected(e) {
    this.setState({selectedNum: e.target.value});
  }
  
  render() {
    return (
      <div style={styles.container}>
        <Forest style={styles.forest} height={this.state.forestHeight} width={this.state.forestWidth} />
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
          currentPageNum = {this.state.currentPageNum}
        />
      </div>
    )
  }
}

export default App;
