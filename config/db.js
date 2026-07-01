const { default: mongoose } = require("mongoose");

const connectDB = async ()=>{

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Conneted Database`);
        
    } catch (error) {
        console.log("Mongodb connecgtion faild");
        
    }
}

module.exports = connectDB;