const mysql = require("mysql");

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    port     : 8889,
    database : 'nodemysql'
  
  });

// const db = mysql.createConnection({
//   host     : 'aa12lltmnaeaptt.cumnkarhjrlj.us-east-2.rds.amazonaws.com:3306 ',
//   user     : 'angeladb',
//   password : 'password',
//   port     : 3306,
//   database : 'angeladb'

// });
  
  db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('mysql connected.....');
  
  });

  module.exports = db;

  