const express = require('express');
const HajjCtrl = require('../controllers/hajj-ctrl');
const router = express.Router();
const Hajj = require('../models/hajj-model')

router.post('/hajj', HajjCtrl.createHajj); // Route to create a new user
router.delete('/hajj/:id', HajjCtrl.deleteHajj); // Route to delete a user
router.get('/hajjs', HajjCtrl.getAllHajjs); // Route to get all users
router.get('/', HajjCtrl.checkServiceRunning);
router.patch('/hajj/update/:id', HajjCtrl.updateHajj);
router.get('/hajj/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const hajjInfo = await Hajj.findById(id);
        if (!hajjInfo) {
            return res.status(404).json({ message: 'Hajj not found' });
        }
        const { hajjname, from_where, to_where, ticket_price, day_and_time } = hajjInfo;
        res.json({
            hajjname,
            from_where,
            to_where,
            ticket_price,
            day_and_time
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;