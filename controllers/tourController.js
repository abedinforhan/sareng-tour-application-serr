const Tour = require('../model/tourModel')


exports.getAllTours = async (req, res) => {
    try {
        //1.filtering and exclude query parameters
        const queryObj={...req.query};
        const excludeFields=['page','sort','limit','fields'];
        excludeFields.forEach(field=>delete queryObj[field]);
       
        let queryString=JSON.stringify(queryObj);
        queryString=queryString.replace(/\b(gt|gte|lt|lte\b)/g,match=>`$${match}`);
        const filter=JSON.parse(queryString);

        //2. advance iltring 
        //{ duration: { gte: '5' }, difficulty: 'easy' } what we are getting
        //{ duration: { $gte: '5' }, difficulty: 'easy' } what we need to do mongoDB
        //gte,gt,lt,lte


        const tours = await Tour.find(filter);
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
        // const newTour = new Tour(req.body)
        // const tour = await newTour.save()

        const tour = await Tour.create(req.body)

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
        const tour = await Tour.findById(req.params.id)
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
        const filter = req.params.id;
        const update = req.body
        const updatedTour = await Tour.findByIdAndUpdate(filter, update, { new: true });

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
        const filter =  req.params.id ;
        await Tour.findByIdAndDelete(filter);

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