# 🦫 CapybaraTrack — Ethereum Product Traceability System

Welcome to **CapybaraTrack**!  
CapybaraTrack is a decentralized application (DApp) built on the Ethereum blockchain, designed to help track products from creation to retail with transparency, security, and a sprinkle of tech magic! ✨  

Using **smart contracts** and **Web3.js**, CapybaraTrack allows manufacturers, distributors, and retailers to record and verify every step in a product’s journey — like a digital passport that guarantees authenticity.

---

## 💡 Features

- 📦 **Track Product History**  
  Follow a product’s complete lifecycle from manufacturing to retail.

- 👥 **Authorize Actors**  
  Allow verified manufacturers, distributors, and retailers to participate in the traceability process.

- 🔐 **Transparency & Security**  
  Every step is securely recorded on the blockchain — tamper-proof and publicly verifiable.

---

## 🔗 Smart Contract — `ProductTraceability.sol`

The smart contract handles the core logic for the product’s journey. Key functions:

- `authorizeActor(address _actor)`  
  Adds a trusted manufacturer, distributor, or retailer to the system.

- `addStep(uint _productId, string _description, string _date)`  
  Records a specific step in the product's journey (manufacturing, packaging, retail, etc.).

- `getHistory(uint _productId)`  
  Retrieves the full history of a product using its unique ID.

---

## 🖼️ Frontend — `index.html`

Our simple web interface makes interacting with the blockchain easy and fun!

- ➕ **Add Product Step**  
  Submit a new event in the product’s timeline using a friendly form.

- 🔍 **View Product History**  
  Enter a product ID to display its complete journey.

- ✅ **Authorize Actor**  
  Allow trusted entities to join the traceability system via form submission.

---

## 🧰 Technologies Used

- **Solidity** — Smart contract programming for Ethereum.  
- **Web3.js** — JavaScript library for blockchain interactions.  
- **Bootstrap** — Frontend styling for responsive and clean UI.

---

## 🚀 Getting Started

### Prerequisites:

- [Node.js & npm](https://nodejs.org/)
- [Ganache](https://trufflesuite.com/ganache/) for local Ethereum simulation.
- [MetaMask](https://metamask.io/) for Ethereum wallet management.
- [Truffle](https://trufflesuite.com/truffle/) for contract deployment and testing.

---

### Usage:

1. Launch your local blockchain using **Ganache**.
2. Deploy smart contracts using **Truffle**:
   ```bash
   truffle migrate --reset
