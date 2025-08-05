export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { receiver, amount } = req.body;

    // Biconomy API Configuration
    const API_KEY = 'YOUR_BICONOMY_API_KEY'; // Replace with your API Key
    const RELAYER_URL = 'https://api.biconomy.io/api/v2/meta-tx/native'; // Example endpoint

    const txPayload = {
      to: receiver,
      data: '0x',
      value: (parseFloat(amount) * 1e18).toString(),
      gasLimit: 21000,
      gasPrice: '0',
      chainId: 8453 // Base Chain ID (Adjust as needed)
    };

    const response = await fetch(RELAYER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify(txPayload)
    });

    const data = await response.json();
    if (response.ok && data.txHash) {
      return res.status(200).json({ txHash: data.txHash });
    } else {
      console.error('Relayer Error:', data);
      return res.status(500).json({ message: data.message || 'Relayer failed' });
    }
  } catch (error) {
    console.error('API Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}