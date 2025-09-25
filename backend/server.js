const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
app.use(express.json());

// Updated Contract ABI with new structure
const CONTRACT_ABI = [
    "function registerTourist(string memory _name, string memory _idProof, string memory _tripDuration, string memory _emergencyContacts) public returns (bytes32)",
    "event TouristRegistered(address indexed touristAddr, bytes32 dataHash, uint256 timestamp)"
];

const CONTRACT_ADDRESS = "0x319884e7910D6142885b7e31c961A6a39BcC4203";
const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

// API Endpoints
app.post('/register', async (req, res) => {
    try {
        const { name, idProof, tripDuration, emergencyContacts } = req.body;
        const emergencyContactsStr = emergencyContacts.join(',');

        const maxPriorityFeePerGas = ethers.utils.parseUnits("25", "gwei");
        const maxFeePerGas = maxPriorityFeePerGas.mul(2);

        const tx = await contract.registerTourist(
            name,
            idProof,
            tripDuration,
            emergencyContactsStr,
            {
                maxFeePerGas,
                maxPriorityFeePerGas,
                gasLimit: 500000
            }
        );

        const receipt = await tx.wait();

        // Find the TouristRegistered event and get dataHash
        const event = receipt.events?.find(e => e.event === 'TouristRegistered');
        const dataHash = event?.args?.dataHash;

        res.json({
            success: true,
            message: 'Tourist registered successfully',
            transactionHash: tx.hash,
            dataHash: dataHash,
            blockNumber: receipt.blockNumber
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

app.get('/verify/:dataHash', async (req, res) => {
    try {
        const { dataHash } = req.params;
        
        // Get tourist data from blockchain
        const touristData = await contract.getTourist(wallet.address);
        
        res.json({
            verified: touristData.dataHash === dataHash,
            blockchainData: {
                name: touristData.name,
                timestamp: touristData.timestamp.toString(),
                dataHash: touristData.dataHash
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});