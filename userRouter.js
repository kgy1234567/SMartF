const express = require('express');
const dbModule=require('./db-module');

const alert =require('./view/alertMsg');
const template= require('./view/template');
const wm=require('./weather-module');
const router = express.Router();
router.get('/list', function(req, res) {
    if(req.session.userId=== undefined){
        let html = alert.alertMsg('로그인을 먼저하세요.','/');
        res.send(html);
    }else{
        wm.getWeather(function(weather){
            let navBar = template.navBar(false,weather, req.session.userName);
            let menuLink =template.menuLink(3);
            dbModule.getAllUsers(function(rows) {
                let view = require('./view/listUser');
                let html = view.listUser(navBar,menuLink,rows);
                //console.log(rows);
                res.send(html);
            });
        });
    }
});
router.get('/register',function(req,res){
    if(req.session.userId=== undefined){
        let html = alert.alertMsg('로그인을 먼저하세요.','/');
        res.send(html);
    }else if(req.session.userId != 'admin'){
        let html = alert.alertMsg('사용자를 등록할 권한가 없습니다.','/user/list');        
        res.send(html);
    }
    else {
        wm.getWeather(function(weather){

            let navBar = template.navBar(false,weather,req.session.userName);
            let menuLink =template.menuLink(3);
            dbModule.getAllDepts(function(rows){
            let view = require('./view/registerUser');
            let html = view.registerUser(navBar,menuLink,rows);
            res.send(html);
        });
    });
    }
});

router.post('/register',function(req,res){
    let uid=req.body.uid;
    let pswd=req.body.pswd;
    let pswd2=req.body.pswd2;
    let name=req.body.name;
    let deptId=parseInt(req.body.dept);
    let tel=req.body.tel;
   // console.log(uid, pswd, pswd2, deptId, tel);
   dbModule.getUserInfo(uid,function(row){
       ///console.log(row);
       if(row===undefined)
        {   
            if(pswd.length>4){
                if(pswd===pswd2)
                {
                    dbModule.registerUser(uid,pswd,name,deptId,tel,function(){
                    res.redirect('/user/list');
                });
                }else{
                    let html = alert.alertMsg(`패스워드가 일치하지 않습니다..`, '/user/register');
                    res.send(html);      
                }
            }else{
            let html = alert.alertMsg(`비밀번호 길이를 5자 이상으로 해주세요.`, '/user/register');
            res.send(html);
            }
        }else{
            let html = alert.alertMsg(`${uid} 아이디가 중복입니다.`, '/user/register');
            res.send(html);      
        }
   });
});




router.get('/update/uid/:uid', function(req, res) {
    let uid=req.params.uid;
    if(req.session.userId=== undefined){
        let html = alert.alertMsg('로그인을 먼저하세요.','/');
        res.send(html);
    }else if(uid !== req.session.userId){
        let html= alert.alertMsg(`본인 것만 수정가능`, '/user/list');
        res.send(html);      
    }
    else{
        wm.getWeather(function(weather){

            let navBar = template.navBar(false,weather,req.session.userName);
            let menuLink =template.menuLink(3);
            dbModule.getAllDepts(function(depts){
                dbModule.getUserInfo(uid,function(user){
                    let view =require('./view/updateUser');
                    let html =view.updateUser(navBar,menuLink,depts,user); //depts,user
                    res.send(html);
            });
        });
    });
    }
});

router.post('/update', function(req, res) {
    let uid = req.body.uid;
    let oldPswd= req.body.oldPswd;
    let pswd = req.body.pswd;
    let pswd2= req.body.pswd2;
    let changePswd = req.body.changePswd;
    let name = req.body.name;
    let deptId = parseInt(req.body.dept);
    let tel = req.body.tel;
    dbModule.getUserInfo(uid,function(user){
        if(changePswd === undefined){// 패스워드 체크박스 선택안될시
            dbModule.updateUser(uid, user.password,name, deptId, tel, function() {
                res.redirect('/user/list');
            });
       }else{ // 패스워드 체크박스 check
            if (oldPswd !== user.password){//현재 패스워드 틀리면
                let html = alert.alertMsg('현재 패스워드 틀림.',`/user/update/uid/${uid}`);
                res.send(html);
            } else if (pswd.length<5){// 패스워드 길이가 4자 이하다.
                let html = alert.alertMsg('신규 패스워드 길이가 4자 이하입니다.',`/user/update/uid/${uid}`);
                res.send(html);
            }
            else if (pswd !== pswd2){// 입력한 패스워드가 다르면
                let html = alert.alertMsg('입력한 패스워드 다르다.',`/user/update/uid/${uid}`);
                res.send(html);
            } else{ //조건을 모두 만족시
                dbModule.updateUser(uid, pswd,name, deptId, tel, function() {
                    res.redirect('/user/list');
                });
            }
        }
    });
});

router.get('/delete/uid/:uid', function(req, res) {
    if(req.session.userId === undefined){
        let html = alert.alertMsg('로그인을 먼저하세요.','/');
        res.send(html);
    }else if(req.session.userId != 'admin'){
        let html = alert.alertMsg('사용자를 삭제할 권한가 없습니다.','/user/list');        
        res.send(html);
    }
    else {
            let uid=req.params.uid;
            wm.getWeather(function(weather){

                let navBar = template.navBar(false,weather,req.session.userName);
                let menuLink =template.menuLink(3);
                let view =require('./view/deleteUser');
                let html =view.deleteUser(navBar,menuLink,uid); //depts,user
                res.send(html);
            });
    }
});

router.post('/delete', function(req, res) {
    let uid=req.body.uid;
    //let name= req.body.name;
    //let deptId = parselent(req.body.dept);
    //let tel = req.body.tel;
    dbModule.deleteUser(uid,function(){
        res.redirect('/user/list')

    });
});

router.post('/login', function(req, res) {
    let uid=req.body.uid;
    let pswd= req.body.pswd;
    dbModule.getUserInfo(uid,function(user){
        if(user === undefined){
            let html =alert.alertMsg('아이디 없음','/');
            res.send(html);
        }else if (pswd !== user.password){
            let html =alert.alertMsg('비밀번호 일치x','/');
            res.send(html);
        } else {
            console.log(`${uid}로그인 성공`);
            req.session.userId=uid;
            req.session.userName=user.name;
            let html = alert.alertMsg(`${user.name}님 환영합니다.`,'/home'); 

            res.send(html);
        }
    });
});
router.get('/logout', function(req,res){
    req.session.destroy();
    res.redirect('/')
});
router.get('/password/uid/:uid', function(req, res) {  
    res.send('password');
});
module.exports = router;