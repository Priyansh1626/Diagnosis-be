const asyncHandler = require("express-async-handler")
const multer = require("multer");
const selfService = require("../models/selfServices");

const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: Storage
}).single('selfServiceImage')

const uploadImage = asyncHandler(async (req, res) => {
    await upload(req, res, async (err) => {
        if (err) {
            console.log(err)
        } else {
            const newSelfService = new selfService({
                fileimage: [
                    {
                        name: req.body.name,
                        image: {
                            data: req.file.filename,
                            contentType: 'image/png'
                        }
                    }
                ]
            });

            const saveImage = await newSelfService.save();
            if (!saveImage) {
                res.send("error");
            }
            res.send("success")
        }
    })
});
module.exports = {
    uploadImage
}