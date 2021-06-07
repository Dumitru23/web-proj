
import React, { Component } from 'react'; 
import {useState, useEffect} from 'react';
import { Card,CardDeck } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'; 
//import { LinkContainer } from 'react-router-bootstrap';

export default function Restaurant(props){
    const [restaurant, setRestaurant] = useState(null);
    const[loading ,setLoading] = useState(true);
    const grades= 0;
    //let data;   

    useEffect(()=> {
        setLoading(true);
        fetch(`https://frozen-anchorage-54331.herokuapp.com/api/restaurants/${props.id}`)
        .then(res=> res.json()).then(data=>{
            console.log(data);
            setLoading(false); 
            //setRestaurant(restaurant);

            if(data.hasOwnProperty("_id")){
                setRestaurant(data);     
            }else{
                setRestaurant(null);
            }  
        });  
    }, [props.id]); 
    


    if(!loading){
        if(restaurant){
            return( 
                <>
                    <Card>
                    <Card.Body as="a3" primary>
                        <Card.Title>{restaurant.name}</Card.Title>
                        <Card.Text>
                            {restaurant.address.building} {restaurant.address.street}
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    <br/>
                    {/* map for the restaurant */}

                    <MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]] } zoom={13} scrollWheelZoom={false}> 
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> 
                        <Marker position={[ restaurant.address.coord[1], restaurant.address.coord[0]]}>
                        </Marker> 
                    </MapContainer>
                    <br />
                    <h3>Ratings</h3>
                    <br />

            

                    {/* display all of the "grades  and the grades data.*/} 
                       <CardDeck> 
                        {
                            restaurant.grades.map(grad=>(                                  
                                <Card bg='light'>    
                                    <Card.Body>
                                        <Card.Title> </Card.Title>
                                        <Card.Text>
                                        Grade: {grad.grade}
                                        </Card.Text>
                                    </Card.Body>
                                    { <Card.Footer style={{"text-color": "black"}}>
                                        <small>Completed: {new Date(grad.date).toLocaleDateString()}</small>
                                    </Card.Footer> }
                                </Card>
                            ))
                        } 
                    </CardDeck> 
                </> 
            ); 
        }else{
            return <Card>
                        <Card.Body>
                            <Card.Text>Unable to find Restaurant with id: {props.id} </Card.Text> 
                        </Card.Body>
                    </Card>
        }
    }else{
        return <Card>
                        <Card.Body>
                            <Card.Text> Loading Restaurant Data... </Card.Text> 
                        </Card.Body>
                    </Card>
    }

  

    
      
}


