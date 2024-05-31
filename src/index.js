require("./db/conn");
require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/user");
const docRouter = require("./routers/doctor");
const serviceRouter = require("./routers/services");
const appointmentRouter = require("./routers/appointment");
const nearByRouter = require("./routers/nearBy");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errrorMiddleware")

app.use(cors(
    { origin: "https://diagnosis-chi.vercel.app", credentials: true }
));
app.use(cookieParser());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Content-Type', 'application/json'),
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

app.use(userRouter);
app.use(docRouter);
app.use("/services", serviceRouter);
app.use(appointmentRouter);
app.use(nearByRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Connected to port ${port}`);
});