const Recording = require("./recording.model");
const { setError } = require("../../utils/error/error");
const { deleteFile } = require("../../middlewares/delete-file");

const postNewRecording = async (req, res, next) => {

    try {
        
        const newRecording = new Recording();
        newRecording.name = req.body.name;
        newRecording.model = req.body.model;

        const recordingDB = await newRecording.save();

        return res.status(201).json(effectDB);

    } catch (error) {
        
        return next(setError(500, "Recording not installed"))

    }

};

const getAllRecordings = async (req, res, next) => {

    try {

        const RecordingsDB = await Recording.find();
        
        res.status(200).json(RecordingsDB)

    } catch (error) {

        return next(setError(500, "No recording"));
    
    }
}

const getRecording = async (req, res, next) => {

    try {

        const { id } = req.params
        const RecordingDB = await Recording.findById(id);

        if (!RecordingDB) {

            return next(setError(404, "No recording"));

        }

        return res.status(200).json(RecordingDB)

    } catch (error) {

        return next(setError(500, "Recording not installed"))

    }
}

const patchRecording = async (req, res, next) => {
    
    try {

        const { id } = req.params
        const patchRecording = new Recording(req.body)

        patchRecording._id = id

        if (req.file) {

            patchRecording.img = req.file.path

        }

        const RecordingDB = await Recording.findByIdAndUpdate(id, patchRecording)

        if (!RecordingDB) {

            return next(setError(404, "No recording"))

        }

        return res.status(200).json({ new: patchRecording, old: RecordingDB })

    } catch (error) {

        return next(setError(500, "Recording cant be replaced"))

    }

}

const deleteRecording = async (req, res, next) => {

    try {

        const { id } = req.params
        const RecordingDB = await Recording.findByIdAndDelete(id)

        if (!RecordingDB) {

            return next(setError(404, "No recording"))

        }

        return res.status(200).json(RecordingDB)

    } catch (error) {

        return next(setError(500, "Recording cant be removed"))

    }

}


module.exports = {
    
    postNewRecording,
    getAllRecordings,
    getRecording,
    patchRecording,
    deleteRecording,

}
