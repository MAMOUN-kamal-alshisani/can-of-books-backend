'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();

const PORT = process.env.PORT
const app = express();
app.use(cors());
mongoose.connect('mongodb://localhost:27017/books-can', {useNewUrlParser: true, useUnifiedTopology: true});
// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');



const bookSchema = new mongoose.Schema({
  name: String,
  description : String,
  status: String,
});



const userSchema = new mongoose.Schema({
  email: String,
  books: [bookSchema],
});






const newBookModel =mongoose.model('books',bookSchema);
const newUserModel =mongoose.model('user',userSchema);


function seedbookscollection(){

const mamoun = new newUserModel({
email:'mamoun.alshishani@yahoo.com',
books:[{
  name:'Blockchain Secrets',
  description:'Discover the business of blockchain and what industries will benefit from using the technology',
  status:'top 3'
},{


  name:'Far Flung',
  description:'Asteroid miner, Tecton Chadeayne finds himself and his amorous geobot, Ruby, flung outside the Milky Way by a freak convergence of gravity waves. Their struggle for survival is filled with danger as well as surprises! Far Flung is an Illustrated Fractime story!',
  status:'top 2'

  
},
{


  name:'The Real Law Of Attraction Code',
  description:'What Really Is The Law Of Attraction? - How The Law Of Attraction Works. - Overcoming The Default Process. - Opportunities And Luck.',
  status:'top 1'

  
}



]

})
  console.log(mamoun);
  // mamoun.save();
}
// seedbookscollection()



app.get('/',(req,res)=>{res.status(200).send('home')})

app.get('/test',(req,res)=>{
    res.status(200).send('allgood');
    
})
// http://localhost:3001/books-can?userEmail=mamoun.alshishani@yahoo.com
app.get('/books-can',getUserData);

function getUserData(req, res){
let userEmail = req.query.userEmail;

newUserModel.findOne({email:userEmail},function(error,userData){

if(error){
  res.send('no data ')
}else{
res.send(userData)



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

app.listen(PORT, () => console.log(`listening on ${PORT}`));
