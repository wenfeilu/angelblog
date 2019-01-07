const mysql = require("mysql");

const db = mysql.createConnection({
    host     : ,
    user     : ,
    password : ,
    port     : ,
    database : 
  
  });
  
  db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('mysql connected.....');
  
  });

  module.exports = db;

  