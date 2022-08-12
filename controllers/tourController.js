const Tour = require('../model/tourModel')


exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find({})
        res.status(200).json({
            status: 'success',
            count: tours.length,
            data: tours
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: `Request Failed${err}`
        })
    }
}

exports.createTour = async (req, res) => {
    try {
        const newTour = new Tour(req.body)
        const tour = await newTour.save()

        res.status(200).json({
            status: 'sucess',
            data: tour,
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: `Creating new tour failed !!! Retry Again. ${err}`
        })
    }
}

exports.getTour = async (req, res) => {
    console.log(req.params.id);
    try {
        const tour = await Tour.findById( req.params.id )
        res.status(200).json({
            status: 'success',
            data: tour
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: `Request Failed${err}`
        })
    }
}

exports.updateTour = async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const update = req.body
        const updatedTour = await Tour.findOneAndUpdate(filter, update, { new: true });

        res.status(200).json({
            status: 'success',
            data: updatedTour
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: `Request Failed${err}`
        })
    }
}


exports.deleteTour = async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const deletedTour = await Tour.deleteOne(filter);

        res.status(200).json({
            status: 'success',
            data: deletedTour
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: `Failed to delete${err}`
        })
    }
}