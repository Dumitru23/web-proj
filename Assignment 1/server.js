/********************************************************************************* 
 * * WEB422 – Assignment 1 
 * * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * * No part of this assignment has been copied manually or electronically from any other source 
 * * (including web sites) or distributed to other students. 
 * * * Name: Mindrigan Dumitru  Student ID: 140920174 Date: 1/20/2021
 * * Heroku Link: https://frozen-anchorage-54331.herokuapp.com/
 *  * * ********************************************************************************/
const express = require("express");
const cors =require("cors"); 
const bodyParser = require("body-parser");

const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB("mongodb+srv://userDumitru:userMindrigan@cluster0.ecsdp.mongodb.net/sample_restaurants?retryWrites=true&w=majority");


const app = express(); 

app.use(cors());

app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT || 8080;



// 1. POST /api/restaurants (Create)
//This route uses the body of the request to add a new "Restaurant" document to the collection 
//and return a success  fail message to the client.

app.post("/api/restaurants", (req, res)=>{
    db.addNewRestaurant(req.body).then((restaurants)=>{
        res.status(201).json(restaurants);       
    }).catch(err=>{
        res.status(500).json({message:err});
    });
}); 

//2.GET /api/restaurants
//This route must accept the numeric query parameters "page" and "perPage" as well as the string parameter
//"borough", ie: /api/restaurants?page=1&perPage=5&borough=Bronx
app.get("/api/restaurants", (req, res) => {
    db.getAllRestaurants(req.query.page, req.query.perPage, req.query.borough)
    .then((msg)=>{
        res.json(msg);
    }).catch(err => res.json({ message: err }));
});

//3. GET /api/restaurants (//ie:    GET http://localhost:8080/api/restaurants/5eb3d668b31de5d588f42c99)
// accept a numeric route parameter that represents the _id of the desired restaurant object,


app.get("/api/restaurants/:id", (req,res)=> {
    db.getRestaurantById(req.params.id)
    .then(restaurant=>res.json(restaurant)
    ).catch(err=>res.json({message: err}));
});

//4.PUT /api/restaurants  (PUT http://localhost:8080/api/restaurants/5eb3d668b31de5d588f4292e)
//This route must accept a numeric route parameter that represents the _id of the desired restaurant object,
//ie: /api/restaurants/5eb3d668b31de5d588f4292e as well as read the contents of the request body. It will
//use these values to update a specific "Restaurant" document in the collection and return a success / fail message to the client.
 
app.put("/api/restaurants/:id", (req, res) => {
    db.updateRestaurantById(req.body, req.params.id)
    .then(msg => res.json(msg)
    ).catch(err => res.json(err));
});


//5. DELETE /api/restaurants
//This route must accept a numeric route parameter that represents the _id of the desired restaurant object,
//ie: /api/restaurants/5eb3d668b31de5d588f4292e. It will use this value to delete a specific "Restaurant"
//document from the collection and return a success message / fail indication to the client.

app.delete("/api/restaurants/:id", (req, res) => { 
    db.deleteRestaurantById(req.params.id)
    .then(msg => res.json(msg)
    ).catch(err => res.json(err));
});


//To ensure to connect to the MongoDB Atlas cluster with our new connection string, we
//must invoke the db.initialize() method and only start the server once it has succeeded, otherwise we
//should show the error message in the console, ie:

db.initialize().then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
   }).catch((err)=>{
    console.log(err);
   });


