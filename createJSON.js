var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.sqlite');

db.serialize(function() {
	db.all(`
      SELECT time, text, username, first_name, last_name FROM messages 
      LEFT JOIN users ON messages.sender_id = users.id
      WHERE source_id='';
    `, function(err, rows) {
    	if (err) {
    		console.log(err);
    		return;
    	} else {
    		addRowToDataJSON(rows);
    	}
	});
})

/*
 * adds row to local var, process the whole db with the new row and writes it to a file
 * this is awful code style!
 */
function addRowToDataJSON(rows) {
	console.log('This are our results: ', rows);
	for (let row of rows) {
		// single row stored in row: username accesable by using: row.username and so on
		// explore the row object by using console.log(row)
		// it is possible to change the content of a row
	}
	//sort our rows by time and 
	rows = sortRows(rows);
	//write rows to file
	var json = JSON.stringify(rows, null, 4);
	fs.writeFile('example.json', json, 'utf8', function(err){
	  if(err) console.log(err); 
	});
}

/*
 * process full db data set aka json
 */
function sortRows(rows) {
  rows.sort(compare);
  rows.reverse();
  return rows
}
/*
 * compare function
 */
function compare(a,b) {
  return a.time - b.time;
}
