const mongoose = require('mongoose');
const URL = process.env.NODE_ENV == production ?
'mongodb://admin:admin123321@ds023932.mlab.com:23932/rmc3_group':
'mongodb://admin:admin123321@ds237723.mlab.com:37723/kaligo-dev';


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose
    .connect(URL, options)
    .catch((e) => {
      console.error(URL, e.message);
    });

const db = mongoose.connection;

module.exports = db;
