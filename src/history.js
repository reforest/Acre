import React from 'react';

const History = ({ style, viewedAccount, currentPage, loadAccount, selectedNum, setSelected, setPage, loading, transactions }) => {

  const transactionList = {
    listStyle: 'none',
    width: '500px',
    margin: 'auto',
  }

  const listBox = {
    padding: '5px',
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
  }

  const closingLine = {
    borderBottom: '1px solid black',
  }

  const cursor = {
    cursor: 'pointer',
  }

  const buttonContainer = {
    display: 'flex',
    justifyContent: 'space-around',
  }

  return (
    loading ?
      <div style={style}>
        <h1 style={{textAlign: 'center'}}> Loading...</h1>
      </div>
    :
      <div style={style}>
        <h2>{viewedAccount}</h2>
        <ul style={transactionList}>
          {       
            currentPage.map((transaction, i) => {
              return (
                i < currentPage.length - 1 ?
                  <li style={listBox}>
                    To: <span style={cursor} onClick={(e)=>{loadAccount(e.target.innerText)}}>{transaction[0]}</span> <br />
                    From:  <span style={cursor} onClick={(e)=>{loadAccount(e.target.innerText)}}>{transaction[1]}</span> <br />
                    Value: {transaction[2]} <br />
                  </li>
                :
                  <li style={Object.assign({}, listBox, closingLine)}>
                    To: <span style={cursor} onClick={(e)=>{loadAccount(e.target.innerText)}}>{transaction[0]}</span> <br />
                    From:  <span style={cursor} onClick={(e)=>{loadAccount(e.target.innerText)}}>{transaction[1]}</span> <br />
                    Value: {transaction[2]} <br />
                  </li>
              )
            })
          }
        </ul>
        <div style={buttonContainer}>
          <button>0</button>
          <div style={inputContainer}>
            <input id="donationAmount" type="text" style={inputText} required />
            <label for="donationAmount" style={shrinking}>Amount</label>
          </div>
          <button>{Math.ceil(transactions.length / 5) - 1}</button>          
        </div>
      </div>      
  )
}

export default History;
