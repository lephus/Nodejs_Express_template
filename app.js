require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const notFoundMiddleware = require('./middleware/not-found')
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const slider = require('./routes/slider')


// --- upload file ------
let tmpUrl = ""
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/uploads')
  },
  filename: (req, file, cb) => {
      tmpUrl = Date.now()+file.originalname;
      const { originalname } = file;
      // or 
      // uuid, or fieldname
      cb(null, tmpUrl);
  }
})
const upload = multer({ storage }); // or simply { dest: 'uploads/' }

app.post('/upload', upload.array('image'), (req, res) => {
  return res.json({ status: 'OK', url: "http://127.0.0.1:5000/images/"+tmpUrl });
});

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use('/images', express.static('public/uploads'))
app.use('/api/slider/', slider)
app.use(notFoundMiddleware)


const port = process.env.PORT || 5000

const start = async () => {
  try {
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()