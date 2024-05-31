const doctors = require("../models/NewDoc");
const asyncHandler = require("express-async-handler");
// const DiagnosisUser = require("../models/newUser");

const findNearByDoc = asyncHandler(async (req, res) => {
    const { longitude, latitude} = req.body;
    try {
        const data = await doctors.find(
            {
               "loc": {

                 $near: {
                   $geometry: {
                      type: "Point" ,
                      coordinates: [ longitude , latitude ]
                   },
                 }
               }
            });
        res.json(data);
      } catch(err){
        res.send("Error: " + err.message);
    }
})

module.exports = {
    findNearByDoc
}