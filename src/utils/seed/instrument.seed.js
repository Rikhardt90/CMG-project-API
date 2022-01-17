const mongoose = require("mongoose");

const mongoDB = "mongodb+srv://root:CMG3141@cluster0.higjb.mongodb.net/CMG-project?retryWrites=true&w=majority";
const instrumentSchema = require("../../api/instrument/instrument.model.js");

const instruments = [
    {
        model: "Aero_Master",
        img: "https://res.cloudinary.com/dhp2zuftj/image/upload/v1642165383/pc-photos/Aero_Master_g1mhxa.png",
        price: 830,
        components: [],
    }
  ];

const InstrumentsDocuments = instruments.map((instrument) => new instrumentSchema(instrument));

console.log(mongoDB);

mongoose.connect(mongoDB, {

    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(async () => {

    const allInstruments = await instrumentSchema.find();

    if (allInstruments.length) {

      await instrumentSchema.collection.drop();

    }

}).catch((err) => console.log(`Error makings Instruments: ${err}`))
  
.then(async () => {

    await instrumentSchema.insertMany(InstrumentsDocuments);

    // console.log("asdf");

}).catch((err) => console.log(`Error makings Instruments: ${err}`))
  
.finally(() => mongoose.disconnect());