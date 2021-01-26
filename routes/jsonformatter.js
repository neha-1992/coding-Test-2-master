const express = require('express');
const jsoncontroller = require("../controllers/json.formatter.controller");


const router = express.Router();

router.post(
  '/',
  async (req, res, next) => {
    try {
     await jsoncontroller.transformedJsonData(req,function (response){
          res.status(201).json(response);
      })
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;