// to perform user database operation
const express = require("express");
const router = express.Router();
const Model = require("../models/filterModel");

// router endpoints
router.post("/add", (req, res) => {
  const formdata = req.body;
  console.log(formdata);
  new Model(formdata)
    .save()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/modify", (req, res) => {
  res.send("response from modifyer");
});

// router.get('/add',(req,res) =>{
//     res.send('response from userRouter')
// })
router.get("/getall", (req, res) => {
  Model.find()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/getbyuser/:userid", (req, res) => {
  
  Model.find({ createdBy: req.params.userid })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/delete/:id", (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/authenticate", (req, res) => {
  const formdata = req.body;
  console.log(req.body);
  // Model.findOne({email : formdata.email,password : formdata.password })
  Model.findOne({ email: formdata.email })
    .then((result) => {
      // logic for validating user ceredentials
      // if email and password matches then result will contain their data
      if (result) {
        if (bcrypt.compareSync(formdata.password, result.password))
          res.json(result);
        else {
          //if result is null
          res.status(401).json({ status: "login failed" });
        }
      } else {
        res.status(401).json({ status: "login failed" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
