var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test'
});


connection.connect(function(err) {
  if (err) {
    console.log('mysql connect error');
    return;
  } else {
    console.log('success !');
  }
});


// connection.query('SELECT * FROM users', function(err, rows) {
//     if(err) {
//         console.log(err);
//     } else {
//         rows.forEach( function(item, index) {
//             console.log(item.id, item.password, item.username);
//         });
//     }
// });

module.exports = connection;






