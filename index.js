const express = require('express');
const mysql = require('mysql');
const app = express();

// Create connection
const db = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '',
  //  database    : 'nodemysql'
});

// Connect
db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...")
})

// Create DB
app.get('/createdb', (req, res)=>{
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    })
})

app.listen(300 , ()=>{
    console.log(`Server started on port 3000`);
})