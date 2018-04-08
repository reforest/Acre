import React, {Component} from 'react';
import Fungus from 'reforest-fungus';

const styles = {
  container: {
    margin: 'auto',
    position: 'relative',
    height: '300px',
    width: '300px',
    border: '1px solid black',
    overflow: 'hidden',
  },
  inputContainerFirst: {
    marginTop: '8px',
  },
  inputContainer: {
    position: 'relative',
    width: '220px',
    marginBottom: '10px',
    paddingLeft: '20px',
  },
  inputText: {
    fontSize: '14px',
    height: '35px',
    width: '245px',
  }, 
  firstButton: {
    position: 'absolute',
    top: '200px',
    left: '20px',
  },
  secondButton: {
    position: 'absolute',
    top: '200px',
    right: '20px',
  }
};

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incomingAddress: ['20px', '6px', '16px', '1'],
      sentAmount: ['20px', '6px', '16px', '1'],
      donationAmount: ['20px', '6px', '16px', '1'],
      pageOneLeft: '0px',
      pageTwoLeft: '300px',
      pageThreeLeft: '600px',
      pageFourLeft: '900px',
      incomingAddressInput: '',
      sentAmountInput: '',
      donationAmountInput: '',
      wallet: 'celadon_wallet',
    }
    this.shrinkLabel = this.shrinkLabel.bind(this);
    this.fungus = new Fungus({
        lotionUrl: 'http://localhost:3000'
    });

    this.privKey = this.fungus.generateStaticPrivateKey(1);
  }

  advance(e) {
    let page = e.target.parentElement.id;
    if (page === 'pageOne') {
      this.setState({
        pageOneLeft: '-300px',
        pageTwoLeft: '0px',
        pageThreeLeft: '300px',
        pageFourLeft: '600px',
      })
    } else if (page === 'pageTwo') {
      this.setState({
        pageOneLeft: '-600px',
        pageTwoLeft: '-300px',
        pageThreeLeft: '0px',
        pageFourLeft: '300px',
        
      })
    } else if (page === 'pageThree') {
      console.log('submitted')
    } else if (e === 'done') {
      this.setState({
        pageOneLeft: '-900px',
        pageTwoLeft: '-600px',
        pageThreeLeft: '-300px',
        pageFourLeft: '0px',
        
      })
  }

  cancel() {
    this.setState({
      pageOneLeft: '0px',
      pageTwoLeft: '300px',
      pageThreeLeft: '600px',
      incomingAddressInput: '',
      sentAmountInput: '',
      donationAmountInput: '',
      wallet: 'celadon_wallet',
      attemptedTransaction: 'Success!'
    })  
  }

  shrinkLabel(focus, text, id) {
    if (focus ) {
      let labelStyle = {};
      labelStyle[id] = ['60%', '4px', '8px', '.6'];
      this.setState(labelStyle);
    } else if (text === true) {
      let labelStyle = {};
      labelStyle[id] = ['20%', '6px', '16px', '1'];
      this.setState(labelStyle)
    }
  }

  updateValue(e) {
    let temp = {};
    let amount = Number(this.state.sentAmountInput);
    temp[e.target.id + 'Input'] = e.target.value;
    this.setState(temp);
  }

  setPercentage(e) {
    let newValue = '';
    let amount = Number(this.state.sentAmountInput);
    if (e.target.innerText === '3%') {
      newValue = amount * .03;
      this.shrinkLabel(true, true, 'donationAmount');
    } else if (e.target.innerText === '2%') {
      newValue = amount * .02;
      this.shrinkLabel(true, true, 'donationAmount');      
    } else if (e.target.innerText === '1%') {
      newValue = amount * .01;
      this.shrinkLabel(true, true, 'donationAmount');      
    } else {
      this.shrinkLabel(false, true, 'donationAmount');  
    }
    this.setState({
      donationAmountInput: String(newValue)
    })
  }

  updateWallet(e){
    this.setState({wallet: e.target.value})
  }

  createTransaction() {
      const {
          sentAmountInput,
          acccount,
          incomingAddressInput,
          donationAmountInput,
      } = this.state;
      const donationPercentage = donationAmountInput / sentAmountInput;

      const txPayload = {
          address: incomingAddressInput,
          amount: sentAmountInput,
          feePortion: donationPercentage
      };
      console.log('~~~~~~~~~~~', txPayload);
      this.fungus.createTransaction(this.privKey, txPayload);
  }

  render() {
    return (
      <div style={this.props.style}>
        <h2 style= { { fontSize: '1em', textAlign: 'center', textDecoration: 'underline' } }>{this.props.account}</h2>
        <div style={styles.container}>
          <div
            id='pageOne' 
            style={
              {
                zIndex: '1',
                position: 'absolute',
                height: '300px',
                width: '300px',
                left: this.state.pageOneLeft,
                backgroundColor: 'grey',
                transition: '0.2s ease left',
              }
            }
          >
            <div style={Object.assign(styles.inputContainer, styles.inputContainerFirst)}>
              <input 
                type="text"
                id="outgoingAddress"
                style={styles.inputText}
                disabled 
                value={this.props.account}
              />
              <label
                htmlFor="outgoingAddress"
                style={
                  {
                    position: 'absolute',
                    pointerEvents: 'none',
                    left: '60%',
                    top: '4px',
                    fontSize: '8px',
                    opacity: '.6',
                    transition: '0.2s ease all',
                  }
                }
              >Sending Address</label>
            </div>
  
            <div style={styles.inputContainer}>
              <input
                type="text"
                id="incomingAddress"
                style={styles.inputText}
                required
                onFocus={(e)=>{this.shrinkLabel(true, e.target.value === '', e.target.id)}} 
                onBlur={(e)=>{this.shrinkLabel(false, e.target.value === '', e.target.id)}}
                onChange={this.updateValue.bind(this)}
                value= {this.state.incomingAddressInput}
              />
              <label
                htmlFor="incomingAddress"
                style={
                  {
                    position: 'absolute',
                    pointerEvents: 'none',
                    left: this.state.incomingAddress[0],
                    top: this.state.incomingAddress[1],
                    fontSize: this.state.incomingAddress[2],
                    opacity: this.state.incomingAddress[3],
                    transition: '0.2s ease all',
                  }
                }
              >Recieving Address</label>
            </div>
  
            <div style={styles.inputContainer}>
              <input
                id="sentAmount"
                type="text"
                style={styles.inputText}
                required
                onFocus={(e)=>{this.shrinkLabel(true, e.target.value === '', e.target.id)}} 
                onBlur={(e)=>{this.shrinkLabel(false, e.target.value === '', e.target.id)}}
                onChange={this.updateValue.bind(this)}
                value= {this.state.sentAmountInput}
              />
              <label
                htmlFor="sentAmount"
                style={
                  {
                    position: 'absolute',
                    pointerEvents: 'none',
                    left: this.state.sentAmount[0],
                    top: this.state.sentAmount[1],
                    fontSize: this.state.sentAmount[2],
                    opacity: this.state.sentAmount[3],
                    transition: '0.2s ease all',
                  }
                }
              >Amount</label>
            </div>
            <button style={styles.firstButton} onClick={this.advance.bind(this)}>Continue</button>
            <button style={styles.secondButton} onClick={this.cancel.bind(this)} type="reset">Cancel</button>
          </div>
          <div
            id='pageTwo'  
            style={
              {
                zIndex: '1',
                position: 'absolute',
                height: '300px',
                width: '300px',
                left: this.state.pageTwoLeft,
                backgroundColor: 'grey',
                transition: '0.2s ease left',
              }
            }
          >
            <p style={{marginLeft: '20px'}}>Donate to:  
              <select onChange={this.updateWallet.bind(this)} style={{marginLeft: '17px'}}>
                <option>celadon_wallet</option>
                <option>cosmos_wallet</option>
                <option>impacthub_wallet</option>
              </select>
            </p>
            <button style={{marginLeft: '20px', marginRight: '5px'}} onClick={this.setPercentage.bind(this)}>3%</button>
            <button style={{marginRight: '5px'}} onClick={this.setPercentage.bind(this)}>2%</button>
            <button style={{paddingLeft: '6px', paddingRight: '6px', marginRight: '5px'}} onClick={this.setPercentage.bind(this)}>1%</button>
            <button style={{paddingLeft: '6px', paddingRight: '6px'}} onClick={this.setPercentage.bind(this)}>Custom</button>
            <br />
            <div style={styles.inputContainer}>
              <input
              id="donationAmount"
              type="text"
              style={styles.inputText}
              required
              onFocus={(e)=>{this.shrinkLabel(true, e.target.value === '', e.target.id)}} 
              onBlur={(e)=>{this.shrinkLabel(false, e.target.value === '', e.target.id)}}
              onChange={this.updateValue.bind(this)}
              value= {this.state.donationAmountInput}
            />
              <label
                htmlFor="donationAmount"
                style={
                  {
                    position: 'absolute',
                    pointerEvents: 'none',
                    left: this.state.donationAmount[0],
                    top: this.state.donationAmount[1],
                    fontSize: this.state.donationAmount[2],
                    opacity: this.state.donationAmount[3],
                    transition: '0.2s ease all',
                  }
                }
              >Amount</label>
            </div>
            <button style={styles.firstButton} onClick={this.advance.bind(this)}>Continue</button>
            <button style={styles.secondButton} onClick={this.cancel.bind(this)} type="reset">Cancel</button>  
          </div>
          <div 
            id='pageThree' 
            style={
              {
                zIndex: '1',
                position: 'absolute',
                height: '300px',
                width: '300px',
                left: this.state.pageThreeLeft,
                backgroundColor: 'grey',
                transition: '0.2s ease left',
              }
            }
          >
            <p style={{marginLeft: '20px'}}>
              Send: {this.state.sentAmountInput}<br />
              From: {this.props.account.slice(0,5)}...{this.props.account.slice(-5)}<br />
              to: {this.state.incomingAddressInput.slice(0,5)}...{this.state.incomingAddressInput.slice(-5)}?
            </p>
            <p style={{marginLeft: '20px'}}>And Donate {this.state.donationAmountInput.slice(0,5)}{this.state.donationAmountInput.length > 6 && '...'} to {this.state.wallet}.</p>
            <button style={styles.firstButton} onClick={this.advance.bind(this)} type="submit">Confirm</button>
            <button style={styles.secondButton} onClick={this.cancel.bind(this)} type="reset">Cancel</button>
          </div>
          <div 
            id='pageFour' 
            style={
              {
                zIndex: '1',
                position: 'absolute',
                height: '300px',
                width: '300px',
                left: this.state.pageFourLeft,
                backgroundColor: 'grey',
                transition: '0.2s ease left',
              }
            }
          >
            <h2>{this.state.attemptedTransaction}></h2>
          </div>
        </div>
      </div>
    )
  }
};

export default Welcome;
