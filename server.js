'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
// const axios = require('axios');

const server = express();
server.use(cors());

server.use(express.json());


const PORT = process.env.PORT;

mongoose.connect('mongodb://localhost:27017/books', {useNewUrlParser: true, useUnifiedTopology: true});
// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');


let bookSchema = new mongoose.Schema({
  name: String,
  Img:String,
  description : String,
  status: String,
});



let userSchema = new mongoose.Schema({
  email: String,
  books: [bookSchema],
});



let newBookModel =mongoose.model('books',bookSchema);
let newUserModel =mongoose.model('user',userSchema);

module.exports =newUserModel;








function seedbookscollection(){

  let mamoun = new newUserModel({
email:'mamoun.alshishani@yahoo.com',
books:[{
  name:'Blockchain Secrets',
  Img:'https://images-na.ssl-images-amazon.com/images/I/71RCY4i9viL.jpg',
  description:'Discover the business of blockchain and what industries will benefit from using the technology',
  status:'top 3'
},{


  name:'Far Flung',
  Img:'https://image.isu.pub/200630175644-4c750a71513201c62c498b6f411e1a4a/jpg/page_1.jpg',
  description:'Asteroid miner, Tecton Chadeayne finds himself and his amorous geobot, Ruby, flung outside the Milky Way by a freak convergence of gravity waves. Their struggle for survival is filled with danger as well as surprises! Far Flung is an Illustrated Fractime story!',
  status:'top 2'

  
},
{


  name:'The Real Law Of Attraction Code',
  Img:'https://images-na.ssl-images-amazon.com/images/I/41cWu9nNMvL._SX334_BO1,204,203,200_.jpg',
  description:'What Really Is The Law Of Attraction? - How The Law Of Attraction Works. - Overcoming The Default Process. - Opportunities And Luck.',
  status:'top 1'

}
]

})
  console.log(mamoun);
  mamoun.save();
}
// seedbookscollection();




// http://localhost:3001/books?usermail=mamoun.alshishani@yahoo.com
server.get('/books',getUserData);
server.post('/addbooks',addBooksHandler);
server.delete('/removebooks/:userBooks',removeBooksHandler);

function getUserData(req, res){
let {usermail} = req.query;

newUserModel.find({email:usermail},function(error,userData){

if(error){
  res.send('no data ')
}else{
res.send(userData[0].books)}
console.log(userData[0].books);
})
}





function addBooksHandler(req, res){
console.log(req.body);

let {email ,name ,description ,Img ,stats} =req.body;

newUserModel.find({email:email},(error,userData)=>{

  if(error){
    res.send('cant find any informartion to post')
  }else{
  userData[0].books.push({
name: name,
Img: Img,
description: description,
stats: stats,

  })
  userData[0].save();
  res.send(userData[0].books)
  }

});
}


function removeBooksHandler(req, res){

  let {usermail} = req.query;
let  index=parseInt(req.params.userBooks);

newUserModel.find({email:usermail},(error,userData)=>{

  if(error){
    res.send('could not delete ')
  }else{
let deletedData=userData[0].books.filter((TheBooks, indx)=>{

if  (indx !== index){return TheBooks}

})
userData[0].books =deletedData;
userData[0].save();
res.send(userData[0].books);

}

})
}
// app.get('/test', (request, response) => {

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

// })
server.get('/',(req,res)=>{res.status(200).send('home')})

server.get('/test',(req,res)=>{
    res.status(200).send('allgood');
    
})
server.listen(PORT, () => console.log(`listening on ${PORT}`));
