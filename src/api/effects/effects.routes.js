const EffectRoutes = require("express").Router();
const { isAdmin } = require("../../middlewares/auth");
const { postNewEffect, getAllEffects, getEffect, patchEffect, deleteEffect} = require("./effects.controller");

EffectRoutes.get("/", getAllEffects);
EffectRoutes.get("/:id", getEffect);
EffectRoutes.post("/", [isAdmin], postNewEffect);
EffectRoutes.patch("/:id", [isAdmin], patchEffect);
EffectRoutes.delete("/:id", [isAdmin], deleteEffect);

module.exports = EffectRoutes;