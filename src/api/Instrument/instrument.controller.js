const Instrument = require("./instrument.model");
const { setError } = require("../../utils/error/error");
const { deleteFile } = require("../../middlewares/delete-file");

const postNewInstrument = async (req, res, next) => {

    try {
        
        const newInstrument = new Instrument();
        newInstrument.model = req.body.model;

        if (req.file) {

            newInstrument.img = req.file.path

        }

        newInstrument.price = req.body.price;
        newInstrument.effects = req.body.effects;
        newInstrument.recording = req.body.recording;

        const instrumentDB = await newInstrument.save();

        return res.status(201).json(instrumentDB);

    } catch (error) {
        
        return next(setError(500, "Instrument not installed"));

    }

};

const getAllInstruments = async (req, res, next) => {

    try {

        const InstrumentsDB = await Instrument.find().populate("effects").populate("recording");
        
        res.status(200).json(InstrumentsDB)

    } catch (error) {

        return next(setError(500, "No instrument"));
    
    }
}

const getInstrument = async (req, res, next) => {

    try {

        const { model } = req.params;
        const InstrumentDB = await Instrument.find({ model: model }).populate("effects").populate("recording");

        if (!InstrumentDB) {

            return next(setError(404, "No instrument"));

        }

        return res.status(200).json(InstrumentDB);

    } catch (error) {

        return next(setError(500, "No instrument"));

    }
    
}

const patchInstrument = async (req, res, next) => {
    
    try {

        const { id } = req.params
        const patchInstrument = new Instrument(req.body)

        patchInstrument._id = id

        if (req.file) {

            patchInstrument.img = req.file.path

        }

        const InstrumentDB = await Instrument.findByIdAndUpdate(id, patchInstrument)

        if (!InstrumentDB) {

            return next(setError(404, "No instrument"))

        }

        if (InstrumentDB.img) {

            deleteFile(InstrumentDB.img);

        } 

        return res.status(200).json({ new: patchInstrument, old: InstrumentDB })

    } catch (error) {

        return next(setError(500, "Instrument cant be replaced 🐿"))

    }

}

/* const deletePc = async (req, res, next) => {

    try {

        const { model } = req.params;
        const PcDB = await Pc.findOneAndDelete({ model: model }).populate("components");

        if (!PcDB) {

            return next(setError(404, "WHERE IS MY PC?!!!!! 🐿"))

        }

        if (PcDB.img) {

            deleteFile(PcDB.img)

        } 

        return res.status(200).json(PcDB)

    } catch (error) {

        return next(setError(500, "Pc cant be removed🐿"))

    }

} */

module.exports = {
    
    postNewInstrument,
    getAllInstruments,
    getInstrument,
    patchInstrument,
    /* deletePc, */

}
