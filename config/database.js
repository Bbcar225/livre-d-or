let mysql      = require('mysql')

let connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'ly_boubacar',
    password: 'ly_boubacar',
    database: 'lab-nodeJS_livre-or'
});

connection.connect();

module.exports = connection;