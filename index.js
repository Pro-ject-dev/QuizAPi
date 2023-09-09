const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database'); 
app.use(express.json({ limit: '20mb' })); 
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cors());
app.use(express.json());

const apiport =8080;

//user

function myFunction() {
  // Your code here
  console.log("Function called every 14 minutes");
}

const interval = 14 * 60 * 1000;
setInterval(myFunction, interval);

app.post('/login', async (req, res) => {
    try {
        const result = await db.query("INSERT INTO login (teamname, status) VALUES ('"+req.body.teamname+"', 0)"); 
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/get_status', async (req, res) => {
    try {
        const result1=await db.query("select status from login where teamname='"+req.body.teamname+"'")
        res.send(result1);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/get_R1_question', async (req, res) => {
    try {
        const result1=await db.query("select * from r1_questions order by question_NO")
        res.send(result1);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/add_r1_performance', async (req, res) => {
    try {
        const result1=await db.query("insert into r1_performance (team_id,question_id,score,user_answer)values((select id from login where teamname='"+req.body.teamname+"'),'"+req.body.question_id+"','"+req.body.score+"','"+req.body.user_answer+"')")
        res.send(result1);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//---------------------------------------------------------------------------------------------------------------------------->   Admin

app.get('/get_login',async (req,res)=>{
    try {
        const result1=await db.query("select * from login order by id desc")
        res.send(result1);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/update_login', async (req, res) => {
    try {
        const result1=await db.query("update login set status=1 where id='"+parseInt(req.body.team_id)+"'")
        res.send(result1);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/del_login',async(req,res)=>{

    try{
        const result1=await db.query("delete from login where id='"+req.body.id+"'")
        console.log(result1)
        res.send(result1);
    }
    catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/insert_r1',async(req,res)=>{
console.log(req.body)
    try{
const result1 = await db.query("INSERT INTO r1_questions (question, question_no, option_1, option_2, option_3, option_4, answer, picture) VALUES ('"+req.body.question_no+"','"+req.body.question+"','"+req.body.option1+"', '"+req.body.option2+"','"+req.body.option3+"','"+req.body.option4+"','"+req.body.answer+"','"+req.body.img+"')");
      res.send(result1)
    }
    catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
 

app.post('/insert_r2', async (req, res) => {
    try {
        console.log(req.body);
      const query = "INSERT INTO r2_questions (question_id,PICTURE_1, PICTURE_2, PICTURE_3, PICTURE_4, ANSWER,PICTURE_COUNT) VALUES ('"+req.body.question_no+"','"+req.body.pic1+"','"+req.body.pic2+"','"+req.body.pic3+"','"+req.body.pic4+"','"+req.body.answer+"','"+req.body.count+"')"
      const result = await db.query(query);
      console.log('Insert result:', result);
      res.status(200).send('Image data inserted successfully');
    } catch (error) {
      console.error('Error inserting image data:', error);
      res.status(500).send('Internal Server Error');
    }
  });


  app.post('/insert_r3',async(req,res)=>{
    console.log(req.body)
        try{
            const result1=await db.query("insert into r3_questions (question_id,question,option_1,option_2,option_3, option_4,answer) values ('"+req.body.question_no+"','"+req.body.question+"','"+req.body.option1+"','"+req.body.option2+"','"+req.body.option3+"','"+req.body.option4+"','"+req.body.answer+"')")
            console.log(result1);
            res.send(result1);
        }
        catch(error){
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });
    
  



//codelog

app.get('/get_codelog',async(req,res)=>{

    try{
        const result1= {"statement1": "You are asked to ensure that the first and last names of people begin with a capital letter in their passports. For example, alison heck should be capitalised correctly as Alison Heck.","statement2":"alison heck => Alison Heck","statement3":"Given a full name, your task is to capitalize the name appropriately.", "Input Format": "A single line of input containing the full name, S.","Constraint1": "0 < len(S) < 1000", "Constraint2": "The string consists of alphanumeric characters and spaces.", "Note": "in a word only the first character is capitalized. Example 12abc when capitalized remains 12abc.", "Output Format": "Print the capitalized string, S.","Sample Input": "chris alan", "Sample Output": "Chris Alan"}
        res.send(result1);
    }
    catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
app.get('/test',async(req,res)=>{

    try{
        const result1=await db.query("select * from r2_questions")
        res.send(result1);
    }
    catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
  });
  

app.listen(apiport, () => {
    console.log("Server is Running in", apiport, "Port");
});


