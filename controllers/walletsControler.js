const Wallet = require('../models/walletModel');

const handleGetWallets = async (req, res) => {
    try {
        const getWallets = await Wallet.find({}).catch(() => res.status(500).json({ message: 'Problem with connection' }));
        if (getWallets.length === 0) {
            res.status(404).json({ message: 'No resources found' });
        }
        res.status(200).json(getWallets);
    } catch (e) {
        if (e.errors) {
            res.status(500).json({ message: 'Problem connecting to the server' })
        };
    };
};

module.exports = {
    handleGetWallets
}