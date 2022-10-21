import bodyParser from 'body-parser';
import express from 'express';
import apiErroHandler from './error/ErrorHandler';
import router from './routes/address_book';
const app = express();
app.use(bodyParser.json());
app.use(router)

app.use(apiErroHandler);
app.listen(3000);