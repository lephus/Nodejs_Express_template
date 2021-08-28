const connect = require('../database/connect')
const asyncWrapper = require('../middleware/async')

const getSlide =  connect.connect(function(err) {
    if (err) throw err;
    connect.query("SELECT * FROM `slides`", function (err, result, fields) {
      if (err) throw err;
      return res.status(404).json({ msg: "result"})
    });
  });


  const getProduct = asyncWrapper(async (req, res, next) => {
    res.status(200).json({ product })
  })
module.exports = getSlide