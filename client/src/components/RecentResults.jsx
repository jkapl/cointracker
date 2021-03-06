import React, {useState, useEffect} from 'react';

const RecentResults = ({ results, setMainResult, fetchResults }) => {
  const [txName, setTxName] = useState('');
  
  const [fullTxName, setFullTxName] = useState(Array(2).fill(null));
  useEffect(() => {
    fetch('/setName', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullTxName),
    })
      .then(() => fetchResults())
      .catch(err => console.log(err));
  }, [fullTxName]);

  const setNextMainResult = (txHash) => {
    for (let i = 0; i < results.length; i += 1) {
      if (results[i].txHash === txHash) {
        setMainResult(results[i]);
        return;
      }
    }
  };

  return (
    <div className="recent-results">
      <h4>Recent Searches</h4>
      <div className="recent-results-list">
        <div className="recent-results-header">
          <div>Transaction Hash</div>
          <div>Transaction Name</div>
        </div>
        <div className="recent-results-body">
          {results.length > 0 &&
            results.map(transaction => (
              <div key={transaction.txHash} className="line-item">
                <button type="button" className="transaction" value={transaction.txHash} onClick={e => setNextMainResult(e.target.value)}>
                  {transaction.txHash}
                </button>
                {transaction.txName ? (
                  <button type="button" className="transaction" value={transaction.txHash} onClick={e => setNextMainResult(e.target.value)}>
                    {transaction.txName}
                  </button>
                ) : (
                  <div>
                    <input className="set-name" type="text" onChange={e => setTxName(e.target.value)} />
                    <button type="button" value={transaction.txHash} onClick={e => setFullTxName([e.target.value, txName])}>Name Transaction</button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecentResults;
