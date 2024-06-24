const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const waterDataSchema = new Schema({
    capacity:{
        type: Number,
        required: [true, 'Capacity data is required']
    },
    volume:{
        type: Number,
        required: [true, 'Volume data is required']
    },
    depth:{
        type: Number,
        required: [true, 'Depth data is required']
    }
}, { timestamps: true });

const WaterData = mongoose.model('WaterData', waterDataSchema);

module.exports = WaterData;