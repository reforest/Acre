import React, {Component} from 'react';

const styles = {
  transactionList: {
    listStyle: 'none',
    width: '500px',
    margin: 'auto',
    paddingLeft: '0px',
    minHeight: '340.75px',
  },
  listBox: {
    padding: '5px',
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
  },
  closingLine: {
    borderBottom: '1px solid black',
  },
  cursor: {
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '500px',
    margin: '20px auto',
  },

  inputContainer: {
    position: 'relative',
    height: '100%',
  },
  inputText: {
    fontSize: '14px',
    height: '100%',
  },
  go: {
    height: '100%',
  }
};

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captionLeft: '20px',
      captionTop: '6px',
      captionSize: '16px',
      captionOpacity: '1',
    }
    this.shrinkLabel = this.shrinkLabel.bind(this);
  }

  shrinkLabel(focus, text) {
    if (focus ) {
      this.setState({
        captionLeft: '60%',
        captionTop: '4px',
        captionSize: '8px',
        captionOpacity: '.6',      
      })
    } else if (text === true) {
      this.setState({
        captionLeft: '20px',
        captionTop: '6px',
        captionSize: '16px',
        captionOpacity: '1',
      })
    }
  }

  render() {
    return (
      this.props.loading ?
        <div style={this.props.style}>
          <h1 style={{textAlign: 'center'}}> Loading...</h1>
        </div>
      :
        <div style={this.props.style}>
          <h2 style={{ fontSize: '1em', textAlign: 'center', textDecoration: 'underline' }}>{this.props.viewedAccount}</h2>
          <ul style={styles.transactionList}>
            {       
              this.props.currentPage.map((transaction, i) => {
                return (
                  i < this.props.currentPage.length - 1 ?
                    <li style={styles.listBox}>
                      To: <span style={styles.cursor} onClick={(e)=>{this.props.loadAccount(e.target.innerText)}}>{transaction[0]}</span> <br />
                      From:  <span style={styles.cursor} onClick={(e)=>{this.props.loadAccount(e.target.innerText)}}>{transaction[1]}</span> <br />
                      Value: {transaction[2]} <br />
                    </li>
                  :
                    <li style={Object.assign({}, styles.listBox, styles.closingLine)}>
                      To: <span style={styles.cursor} onClick={(e)=>{this.props.loadAccount(e.target.innerText)}}>{transaction[0]}</span> <br />
                      From:  <span style={styles.cursor} onClick={(e)=>{this.props.loadAccount(e.target.innerText)}}>{transaction[1]}</span> <br />
                      Value: {transaction[2]} <br />
                    </li>
                )
              })
            }
          </ul>
          <div style={styles.buttonContainer}>
            <button onClick={()=>{this.props.setPage(0)}} >0</button>
            <div style={styles.inputContainer}>
              <input 
                id="donationAmount"
                type="text"
                style={styles.inputText}
                value={this.props.selectedNum}
                onChange={this.props.setSelected}
                onFocus={(e)=>{this.shrinkLabel(true, e.target.value === '')}} 
                onBlur={(e)=>{this.shrinkLabel(false, e.target.value === '')}}
                onKeyPress={ (e)=>{ if (e.key === 'Enter') { this.props.setPage(this.props.selectedNum) } } }
              />
              <label 
                htmlFor="donationAmount"
                style={
                  {
                    position: 'absolute',
                    pointerEvents: 'none',
                    left: this.state.captionLeft,
                    top: this.state.captionTop,
                    fontSize: this.state.captionSize,
                    opacity: this.state.captionOpacity,
                    transition: '0.2s ease all',
                  }
                }
              >Select Page</label>
              <button style={styles.go} onClick={()=>{this.props.setPage(this.props.selectedNum)}}>GO!</button>
            </div>
            <button onClick={()=>{this.props.setPage(Math.ceil(this.props.transactions.length / 5) - 1)}} >{Math.ceil(this.props.transactions.length / 5) - 1}</button>              
          </div>
        </div>
    )
  }
}

export default History;
