var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const connectionString = process.env.MONGO_CON;
mongoose = require('mongoose');
mongoose.connect(connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true });

var Costume = require("./models/costume");
var Instrument = require("./models/instrument");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var instrumentsRouter = require('./routes/instruments');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/instruments', instrumentsRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter)
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// We can seed the collection if needed on server start
async function recreateDB() {
  // Delete everything
  await Costume.deleteMany();

  let instance1 = new Costume({ costume_type: "ghostrider", size: 'large', cost: 25.4 });
  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved in Costume")
  });

  let instance2 = new Costume({ costume_type: "spiderman", size: 'small', cost: 16.5 });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved in Costume")
  });

  let instance3 = new Costume({ costume_type: "batman", size: 'medium', cost: 32.4 });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved in Costume")
  });

  let instance4 = new Costume({ costume_type: "wonderwomen", size: 'extralarge', cost: 43.6 });
  instance4.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Fourth object saved in Costume")
  });

// Delete everything in Instrument
  await Instrument.deleteMany();

  let instance5 = new Instrument({ instrument_name: "Guitar", instrument_size: 500, instrument_cost: 5000 });
  instance5.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved in Instrument")
  });

  let instance6 = new Instrument({ instrument_name: "Keyboard", instrument_size: 1000, instrument_cost: 15207 });
  instance6.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved in Instrument")
  });

  let instance7 = new Instrument({ instrument_name: "Flute", instrument_size: 750, instrument_cost: 10000 });
  instance7.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved in Instrument")
  });

}
let reseed = true;
if (reseed) { recreateDB(); }

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () { console.log("Connection to DB succeeded") });