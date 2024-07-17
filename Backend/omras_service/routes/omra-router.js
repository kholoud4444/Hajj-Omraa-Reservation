const express = require('express');
const OmraCtrl = require('../controllers/omra-ctrl');
const router = express.Router();
const Omra = require('../models/omra-model')

router.post('/omra', OmraCtrl.createOmra); // Route to create a new Omra
router.delete('/omra/:id', OmraCtrl.deleteOmra); // Route to delete a Omra
router.get('/omras', OmraCtrl.getAllOmras); // Route to get all Omras
router.get('/', OmraCtrl.checkServiceRunning);
router.patch('/omra/update/:id', OmraCtrl.updateOmra);
router.get('/omra/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const omraInfo = await Omra.findById(id);
        if (!omraInfo) {
            return res.status(404).json({ message: 'Omra not found' });
        }
        const { omraname, from_where, to_where, ticket_price, day_and_time } = hajjInfo;
        res.json({
            omraname,
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