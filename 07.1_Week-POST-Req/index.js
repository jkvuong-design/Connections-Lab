//1. install and load lowdb
//let express = require('express');
//require vs import
import express from 'express'
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

let app = express();


//2. connect to the db
const defaultData = { matchaTrackerData:[]};
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

//adding json parser
app.use(express.json());

let matchaTracker = [];


// app.get('/', (req,res)=> {
// res.send('this is the main page ^.^');
// });

// 2. in the index.js file need to add a route on the server

app.post('/numberCups',(req, res) => {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        matcha: req.body.number
    }
   // matchaTracker.push(obj);
   // console.log(matchaTracker);

   //3. add value to the database
    db.data.matchaTrackerData.push(obj);
    db.write()
    .then(()=> {
        res.json({task:"successful!"});
    })
})

app.use('/', express.static('public'));
app.listen(5000, ()=> {
    console.log('listening at localhost:5000');
})

//add route to get all matcha track information
app.get('/getCups', (req,res)=> {
// let obj = {data: matchaTracker};
    //4. fetch from the DB
    db.read()
    .then(() => {
        let obj = {data: db.data.matchaTrackerData};
        res.json(obj);

        })
    })
