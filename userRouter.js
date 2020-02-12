const express = require('express');
const dbModule=require('./db-module');


const router = express.Router();

router.get('/list', function(req, res) {
    dbModule.getAllUsers(function(rows) {
        let view = require('./view/userList');
        let html = view.userList(rows);
        //console.log(rows);
        res.send(html);
    });
});
router.get('/register',function(req,res){
    res.send('register');
});

router.get('/update/uid/:uid', function(req, res) {
    res.send('update');
});

router.get('/delete/uid/:uid', function(req, res) {
    res.send('delete');
});
router.get('/password/uid/:uid', function(req, res) {  
    res.send('password');
});
module.exports = router;