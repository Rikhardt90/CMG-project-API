const Effect = require("./effects.model");
const { setError } = require("../../utils/error/error");
const { deleteFile } = require("../../middlewares/delete-file");

const postNewEffect = async (req, res, next) => {

    try {
        
        const newEffect = new Effect();
        newEffect.name = req.body.name;
        newEffect.model = req.body.model;

        const effectDB = await newEffect.save();

        return res.status(201).json(effectDB);

    } catch (error) {
        
        return next(setError(500, "Effect not installed"))

    }

};

const getAllEffects = async (req, res, next) => {

    try {

        const EffectsDB = await Effect.find();
        
        res.status(200).json(EffectsDB)

    } catch (error) {

        return next(setError(500, "No effects"));
    
    }
}

const getEffect = async (req, res, next) => {

    try {

        const { id } = req.params
        const EffectDB = await Effect.findById(id);

        if (!EffectDB) {

            return next(setError(404, "No effect"));

        }

        return res.status(200).json(EffectDB)

    } catch (error) {

        return next(setError(500, "Effect not installed"))

    }
}

const patchEffect = async (req, res, next) => {
    
    try {

        const { id } = req.params
        const patchEffect = new Effect(req.body)

        patchEffect._id = id

        if (req.file) {

            patchEffect.img = req.file.path

        }

        const EffectDB = await Effect.findByIdAndUpdate(id, patchEffect)

        if (!EffectDB) {

            return next(setError(404, "No effect"))

        }

        return res.status(200).json({ new: patchEffect, old: EffectDB })

    } catch (error) {

        return next(setError(500, "Effect cant be replaced"))

    }

}

const deleteEffect = async (req, res, next) => {

    try {

        const { id } = req.params
        const EffectDB = await Effect.findByIdAndDelete(id)

        if (!EffectDB) {

            return next(setError(404, "No effect"))

        }

        return res.status(200).json(EffectDB)

    } catch (error) {

        return next(setError(500, "Effect cant be removed🐿"))

    }

}


module.exports = {
    
    postNewEffect,
    getAllEffects,
    getEffect,
    patchEffect,
    deleteEffect,

}
