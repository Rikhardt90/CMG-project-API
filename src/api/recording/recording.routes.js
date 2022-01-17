const RecordingRoutes = require("express").Router();
const { isAdmin } = require("../../middlewares/auth");
const { postNewRecording, getAllRecordings, getRecording, patchRecording, deleteRecording} = require("./recording.controller");

RecordingRoutes.get("/", getAllRecordings);
RecordingRoutes.get("/:id", getRecording);
RecordingRoutes.post("/", [isAdmin], postNewRecording);
RecordingRoutes.patch("/:id", [isAdmin], patchRecording);
RecordingRoutes.delete("/:id", [isAdmin], deleteRecording);

module.exports = RecordingRoutes;