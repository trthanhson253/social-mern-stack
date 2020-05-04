const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
// bring routes
const companyRoutes = require('./routes/companyRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// cors
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
// routes middleware
app.use('/api', companyRoutes);
app.use('/api', commentRoutes);
app.use('/api', authRoutes);
app.use('/api', requestRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
