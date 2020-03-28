require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const morgan = require('morgan');
const passport = require('passport');
const Grid = require('gridfs-stream');

const methodOverride = require('method-override');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(passport.initialize());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);


if (app.get('env') === 'production') {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;
  app.set('trust proxy', 1);
}

app.use(morgan("dev"));


function startUp() {
  const conn = mongoose.createConnection(process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

  conn.once('open', function () {
    console.log('-----------------Connected to MongoDB----------------------')


    app.listen(PORT, function () {
      console.log(
        `==> API Server now listening on PORT ${PORT}!`
      );

    })

  })
  let gfs
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');

  return gfs

}
