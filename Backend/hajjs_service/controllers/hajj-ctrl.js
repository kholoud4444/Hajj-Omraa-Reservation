const Hajj = require('../models/hajj-model')

updateHajj = async (req, res) => {
    const { id } = req.params;
    try {
        let existingHajj = await Hajj.findById(id);
        if (!existingHajj) {
            return res.status(404).json({
                success: false,
                error: 'Hajj not found',
            });
        }
        let currentMaxNumTrav = existingHajj.max_num_trav;
        currentMaxNumTrav -=1;
        existingHajj.max_num_trav = currentMaxNumTrav;
        const updatedHajj = await existingHajj.save();

        // Respond with the updated max_num_trav value
        res.status(200).json({
            success: true,
            data: updatedHajj.max_num_trav,
            message: 'max_num_trav decremented and updated successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
// Function to create a new hajj
createHajj = async (req, res) => {
    const { hajjname, password,from_where,to_where,ticket_price,day_and_time,max_num_trav } = req.body;

    try {
        const newHajj = new Hajj({ hajjname, password,from_where,to_where,ticket_price,day_and_time,max_num_trav });
        await newHajj.save();

        res.status(201).json({
            success: true,
            data: newHajj,
            message: 'Hajj created successfully!',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// Function to delete a user
deleteHajj = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedHajj = await Hajj.findByIdAndDelete(id);

        if (!deletedHajj) {
            return res.status(404).json({
                success: false,
                error: 'Hajj not found',
            });
        }

        res.status(200).json({
            success: true,
            data: {},
            message: 'Hajj deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// Function to get all users
getAllHajjs = async (req, res) => {
    try {
        const hajjs = await Hajj.find();
        res.status(200).json({
            success: true,
            data: hajjs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

checkServiceRunning = (req, res) => {
    res.send('Hello World! - from hajjs service');
}

module.exports = {
    checkServiceRunning,
    createHajj,
    deleteHajj,
    getAllHajjs,
    updateHajj
}