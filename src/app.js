let contract;
let web3;
let account;

async function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            account = accounts[0];

            // Listen for account changes
            window.ethereum.on('accountsChanged', function (accounts) {
                account = accounts[0];
                console.log("Switched to account:", account);
                alert("Switched to account: " + account);
            });

            const contractAddress = '0xA98B4032DA9Ede0BEFcB2Aa2972fD31832265a90';
            const contractABI = [ /* ... your ABI here ... */ 
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        { "indexed": false, "internalType": "address", "name": "actor", "type": "address" }
                    ],
                    "name": "ActorAuthorized",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        { "indexed": false, "internalType": "uint256", "name": "productId", "type": "uint256" },
                        { "indexed": false, "internalType": "string", "name": "description", "type": "string" },
                        { "indexed": false, "internalType": "string", "name": "date", "type": "string" },
                        { "indexed": false, "internalType": "address", "name": "actor", "type": "address" }
                    ],
                    "name": "StepAdded",
                    "type": "event"
                },
                {
                    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
                    "name": "authorizedActors",
                    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true
                },
                {
                    "inputs": [],
                    "name": "productCount",
                    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true
                },
                {
                    "inputs": [{ "internalType": "address", "name": "_actor", "type": "address" }],
                    "name": "authorizeActor",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        { "internalType": "uint256", "name": "_productId", "type": "uint256" },
                        { "internalType": "string", "name": "_description", "type": "string" },
                        { "internalType": "string", "name": "_date", "type": "string" }
                    ],
                    "name": "addStep",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{ "internalType": "uint256", "name": "_productId", "type": "uint256" }],
                    "name": "getHistory",
                    "outputs": [
                        {
                            "components": [
                                { "internalType": "string", "name": "description", "type": "string" },
                                { "internalType": "string", "name": "date", "type": "string" },
                                { "internalType": "address", "name": "actor", "type": "address" }
                            ],
                            "internalType": "struct ProductTraceability.Step[]",
                            "name": "",
                            "type": "tuple[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true
                }
            ];

            contract = new web3.eth.Contract(contractABI, contractAddress);
            console.log('Web3 initialized');

            document.getElementById('addBtn').disabled = false;
            document.getElementById('viewBtn').disabled = false;

            document.getElementById('addBtn').addEventListener('click', addStep);
            document.getElementById('viewBtn').addEventListener('click', getHistory);
            document.getElementById('authBtn').addEventListener('click', authorizeActor);

        } catch (error) {
            console.error('User denied account access', error);
        }
    } else {
        alert('Please install MetaMask!');
    }
}

async function addStep() {
    if (!contract) {
        alert("Contract not initialized yet.");
        return;
    }

    const productId = document.getElementById('productId').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;

    try {
        await contract.methods.addStep(productId, description, date)
            .send({ from: account });
        alert('Step added successfully!');
    } catch (error) {
        console.error(error);
        alert('Error adding step: ' + error.message);
    }
}

async function getHistory() {
    if (!contract) {
        alert("Contract not initialized yet.");
        return;
    }

    const productId = document.getElementById('checkId').value;
    const historyDiv = document.getElementById('historyResult');
    historyDiv.innerHTML = '';

    try {
        const history = await contract.methods.getHistory(productId).call();

        history.forEach((step, index) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'card mb-2';
            stepDiv.innerHTML = `
                <div class="card-body">
                    <h5>Step ${index + 1}</h5>
                    <p><strong>Date:</strong> ${step.date}</p>
                    <p><strong>Description:</strong> ${step.description}</p>
                    <p><strong>Actor:</strong> ${step.actor}</p>
                </div>
            `;
            historyDiv.appendChild(stepDiv);
        });
    } catch (error) {
        console.error(error);
        alert('Error retrieving history: ' + error.message);
    }
}

async function authorizeActor() {
    const address = document.getElementById('authAddress').value;
    if (!web3.utils.isAddress(address)) {
        alert("Invalid address");
        return;
    }

    try {
        await contract.methods.authorizeActor(address).send({ from: account });
        alert(`Authorized: ${address}`);
    } catch (err) {
        console.error(err);
        alert("Authorization failed: " + err.message);
    }
}

window.addEventListener('load', initWeb3);
