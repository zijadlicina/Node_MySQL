const express = require('express');
const mysql = require('mysql');
const app = express();

// Create connection
const db = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'nodemysql'
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

// Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created...')
    })
})

// Insert data  post 1
app.get('/addpost1', (req, res) => {
    let post = { title: 'Post One', body: 'This is post number one'}
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err; 
        console.log(result);
        res.send('Post 1 added...');
    })
})
// Insert data  post 2
app.get('/addpost2', (req, res) => {
    let post = { title: 'Post Two', body: 'This is post number two'}
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err; 
        console.log(result);
        res.send('Post 2 added...');
    })
})
// SELECT posts/records
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('Posts fetched...');
    })
})
// SELECT single post/record
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post fetched...');
    })
})

// UPDATE post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = "New title";
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        console.log(result);
        res.send('Post updated...');
    })
})

// DELETE post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        console.log(result);
        res.send('Post deleted...');
    })
})

app.listen(300, ()=>{
    console.log(`Server started on port 3000`);
})