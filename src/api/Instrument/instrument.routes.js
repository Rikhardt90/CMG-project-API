const InstrumentRoutes = require("express").Router();
const { isAdmin } = require("../../middlewares/auth");
const { postNewInstrument, getAllInstruments, getInstrument, patchInstrument} = require("./instrument.controller");
const upload = require("../../middlewares/file");

InstrumentRoutes.get("/", getAllInstruments);
InstrumentRoutes.get("/:model", getInstrument);
InstrumentRoutes.post("/", [isAdmin], upload.single("img"), postNewInstrument);
InstrumentRoutes.patch("/:id", [isAdmin], upload.single("img"), patchInstrument);

module.exports = InstrumentRoutes;