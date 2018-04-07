import React from 'react';

const styles = {
  transactionList: {
    listStyle: 'none',
    width: '500px',
    margin: 'auto',
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
    justifyContent: 'space-around',
  }
};

const History = ({ style, viewedAccount, currentPage, loadAccount, selectedNum, setSelected, setPage, loading }) => {

  return (
    loading ?
      <div style={style}>
        <h1 style={{textAlign: 'center'}}> Loading...</h1>
      </div>
    :
      <div style={style}>
        <h2>{viewedAccount}</h2>
        <ul style={styles.transactionList}>
          {       
            currentPage.map((transaction, i) => {
              return (
                i < currentPage.length - 1 ?
                  <li style={styles.listBox}>
                    To: <span style={styles.cursor} onClick={(e)=>{loadAccount(e.target.innerText)}}>{transaction[0]}</span> <br />
                    From:  <span style={styles.cursor} onClick={(e)=>{loadAccount(e.target.innerText)}}>{transaction[1]}</span> <br />
                    Value: {transaction[2]} <br />
                  </li>
                :
                  <li style={Object.assign({}, styles.listBox, styles.closingLine)}>
                    To: <span style={styles.cursor} onClick={(e)=>{loadAccount(e.target.innerText)}}>{transaction[0]}</span> <br />
                    From:  <span style={styles.cursor} onClick={(e)=>{loadAccount(e.target.innerText)}}>{transaction[1]}</span> <br />
                    Value: {transaction[2]} <br />
                  </li>
              )
            })
          }
        </ul>
        <div style={styles.buttonContainer}>
          <input value={selectedNum} onChange={setSelected}/>
          <button onClick={()=>{setPage(selectedNum)}}>Select Page</button>
        </div>
      </div>      
  )
}

export default History;
