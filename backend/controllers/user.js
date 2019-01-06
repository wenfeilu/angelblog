const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/database");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = {
      email: req.body.email,
      password: hash
    };
    let sql = 'INSERT INTO user SET ?';
    db.query(sql, user, (err, result) => {
      if (err) {
        
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      } else{
        res.status(201).json({
          message: "User created!",
          result: result
        });
      }
    });
  })
}


exports.userLogin = (req, res, next) => {
  let fetchedUser;
  let sql = `SELECT * FROM user WHERE email = '${req.body.email}'`;
  db.query(sql,(err, result) => {
    if (err) {
      console.log("Invalid authentication credentials!");
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    } else {
      fetchedUser = result;
      let isAuth = bcrypt.compare(req.body.password, fetchedUser[0].password);
      if (!isAuth) {
        console.log("Auth failed");
        return res.status(401).json({
          message: "Auth failed"
        });
      } else {
        console.log("fetch success");
        const token = jwt.sign(
          { email: fetchedUser[0].email, userId: fetchedUser[0].id },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetchedUser[0].email
        });
      }
    }

  });
}
