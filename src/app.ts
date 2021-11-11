import express, { Request, Response } from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
// import logger from 'morgan';

const app = express();
app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
import indexRouter from './routes/index';
import usersRouter from './routes/newroute';
app.use('/api/info', usersRouter);
app.use("/", (req, res)=>{
  res.send("Welcome to my api..")
})

app.use(function(req:Request, res:Response,next:any) {
  next(createError(404));
});
app.use(function(err:createError.HttpError, req: express.Request, res: express.Response, _next:express.NextFunction) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.send("Unable to process your request. Please send valid data.");
});
module.exports = app;
