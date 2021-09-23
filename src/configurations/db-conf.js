const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'j8oay8teq9xaycnm.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'z8323r1ycwna4qu6',
    password: 'x6fwjl6nrovtxbe7',
    database: 'zint4hwvvzk5xj98',
    multipleStatements: true
  });

  mysqlConnection.connect(function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('Ahora estamos en Linea :D');
    }
  });

  module.exports = mysqlConnection;