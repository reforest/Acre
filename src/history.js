import React from 'react';

const History = ({ style, viewedAccount, currentPage, loadAccount, selectedNum, setSelected, setPage }) => {
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
      <input value={selectedNum} onChange={setSelected}/>
      <button onClick={()=>{setPage(selectedNum)}}>Select Page</button>
    </div>      
  )
}

export default History;
