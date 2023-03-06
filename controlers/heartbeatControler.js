//@desc Check current date
// @route GET /api/heartbeat
// @access Public
const heart = (req, res) => {
    const date = new Date();
    res.status(200).send(date)
};

module.exports = heart;