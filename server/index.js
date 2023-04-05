require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
module.exports = require('express-ws')(app);
const router = require('./routers/http-router');
const wsRouter = require('./routers/ws-router');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieparser());
app.use('/api', router);
app.use('/api', wsRouter);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start();