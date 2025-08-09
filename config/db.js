const mongoose = require("mongoose");

const db = () => {
    mongoose.connect("YOUR_MONGODB_URL ", {
        useNewUrlParser : true,
        useUnifiedTopology: true
    }).then(() =>{
        console.log("mongoDB Connected.")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = db