const Disease = require("../model/diseaseSchema");

const CreateDisease = async (req,res) => {
    const {name,symptoms,spreadLevel,affectedRegions} = req.body;
    try {
        const disease = await Disease.create({
            name,
            symptoms,
            spreadLevel,
            affectedRegions
        });
        return req.status(201).json({ success: true, disease });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { CreateDisease };