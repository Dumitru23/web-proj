const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    address: {
        building: String,
        coord: [Number],
        street: String,
        zipcode: String
    },
    borough: String,
    cuisine: String,
    grades: [{
        date: Date,
        grade: String,
        score: Number
    }],
    name: String,
    restaurant_id: String
});

module.exports = class RestaurantDB{
    constructor(connectionString){
        this.connectionString = connectionString;
        this.Restaurant = null; // no "Restaurant" object until "initialize" is complete
    }

    // Establish a connection with the MongoDB server and initialize 
    //the "Restaurant" model with the "restaurant" collection (used above) 
    
    initialize(){
        return new Promise((resolve,reject)=>{
           let db = mongoose.createConnection(this.connectionString,{ useNewUrlParser: true,useUnifiedTopology: true });
           
            db.on('error', ()=>{
                reject();
            });
            db.once('open', ()=>{
                this.Restaurant = db.model("restaurants", restaurantSchema);
                resolve();
            });
        });
    }

    //: 1. Create a new restaurant in the collection using the object passed in the "data" parameter

    async addNewRestaurant(data){
        let newRestaurant = new this.Restaurant(data);
        await newRestaurant.save();
        return `new restaurant: ${newRestaurant._id} successfully added`
    }
    
    // Return an array of all restaurants for a specific page (sorted
    // by restaurant_id), given the number of items per page. For example, if page is 2 and perPage is 5, then this
    // function would return a sorted list of restaurants (by restaurant_id), containing items 6 – 10. T
    
    getAllRestaurants(page, perPage, borough){ 
        let findBy = borough ? { borough } : {};

        if(+page && +perPage){
            return this.Restaurant.find(findBy).sort({restaurant_id: +1}).skip(page * +perPage).limit(+perPage).exec();
        }
        
        return Promise.reject(new Error('page and perPage query parameters must be present'));
    }

    // Return a single restaurant object whose "_id" value matches the "Id" parameter
    
    getRestaurantById(id){
        return this.Restaurant.findOne({_id: id}).exec();
    }

    // Overwrite an existing restaurant whose "_id" value matches the "Id"
    // parameter, using the object passed in the "data" parameter.

    async updateRestaurantById(data, id){
        await this.Restaurant.updateOne({_id: id}, { $set: data }).exec();
        return `restaurant ${id} successfully updated`;
    }

    // Delete an existing restaurant whose "_id" value matches the "Id" parameter

    async deleteRestaurantById(id){
        await this.Restaurant.deleteOne({_id: id}).exec();
        return `restaurant ${id} successfully deleted`;
    }
}