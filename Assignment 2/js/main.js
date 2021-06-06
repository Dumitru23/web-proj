let restaurantData =[];
var currentRestaurant = {};  
let page = 1;
const perPage = 10;
let map = null;

//  avg(grades) { _.meanBy(grades, (g)=> g.grades);
//     return avg.toFixed(2); 
// }

//average score 

function  avg(grades){
var total = 0;
    for(var i = 0; i < grades.length; i++) {
        total += grades[i].score;
    }
//console.log(total);
//console.log((total / grades.length).toFixed(2)); 
return (total / grades.length).toFixed(2); 
}


const TableRows = _.template(`
<% _.forEach(restaurants, restaurant =>{ %>
    <tr data-id=<%- restaurant._id %>>
        <td><%- restaurant.name %></td>
        <td><%- restaurant.cuisine %></td>
        <td><%- restaurant.address.building %> <%- restaurant.address.street %></td> 
        <td><%- avg(restaurant.grades) %></td>
    </tr> 
<% }); %>
`); 


function loadRestaurantData() {
    fetch(`https://frozen-anchorage-54331.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`)
    //fetch(`http://localhost:8080/api/restaurants?page=${page}&perPage=${perPage}`)
    .then(res => res.json()) 
    .then(data => {
        restaurantData = data;
        $("#restaurant-table tbody").html(TableRows({restaurants: data})); 
        $("#current-page").html(page);

    }) 
}

$(function(){
 // all events (button events, etc)
    loadRestaurantData();

    //1.
    $("#restaurant-table tbody").on("click", "tr", function() {
    
        let clickedId = $(this).attr("data-id");
        currentRestaurant = _.find(restaurantData, restaurant => {
           return restaurant._id === clickedId; 
        });

        $(".modal-title").empty();
        $(".modal-title").append(`${currentRestaurant.name}`);


        $(".restaurant-address").empty(); 
        $("#restaurant-address").append(`${currentRestaurant.address.building} ,${currentRestaurant.address.street}`);
  

        $('#restaurant-modal').modal({ // show the modal programmatically
            backdrop: 'static', // disable clicking on the backdrop to close
            keyboard: false // disable using the keyboard to close
        });
    });

    //4 Modal Window 
    $('#restaurant-modal').on('shown.bs.modal', function () {

        map = new L.Map('leaflet', {
            center: [currentRestaurant.address.coord[1], currentRestaurant.address.coord[0]],
            zoom: 18,
            layers: [
                new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png') 
            ]
        });
        
        L.marker([currentRestaurant.address.coord[1], currentRestaurant.address.coord[0]]).addTo(map);

    });

    //5. 
        $('#restaurant-modal').on('hidden.bs.modal', function () {
            map.remove();
        });

    //2 Pagination button decr
        $(".pagination").on("click", "#previous-page", function(){
            if(page > 1){
                page--;
                loadRestaurantData();
            }
        })
        
        //3. Pagination button incr
        $(".pagination").on("click", "#next-page", function(){
            page++;
            loadRestaurantData();        
        })        
});