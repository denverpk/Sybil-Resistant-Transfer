import { useState } from 'react';

export default function Home() {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [log, setLog] = useState('');

  const handleTransfer = async () => {
    setLog('Processing via Relayer...');
    const response = await fetch('/api/relayer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ receiver, amount })
    });

    const data = await response.json();
    if (response.ok) {
      setLog('Success! TxHash: ' + data.txHash);
    } else {
      setLog('Error: ' + data.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Biconomy Relayer Transfer</h1>
      <input type="text" placeholder="Receiver Address" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
      <br />
      <input type="text" placeholder="Amount in ETH" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <br />
      <button onClick={handleTransfer}>Send via Relayer</button>
      <pre>{log}</pre>
    </div>
  );
}