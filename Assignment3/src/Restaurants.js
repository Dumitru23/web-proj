/*********************************************************************************
* WEB422 – Assignment 3
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Mindrigan_________________ Student ID: 140920174_________ 
* Date: _Feb 19,2021______________________
*
********************************************************************************/ 
import {useEffect, useState} from 'react';
import {Table, Card, Pagination} from 'react-bootstrap'
import { useHistory } from "react-router-dom"; 
import queryString from 'query-string'; 


export default function Restaurants(props){

    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);
    const[loading,setLoading] = useState(true);
    let history = useHistory();
    let perPage=10;
    let borough;  
    



    if(props.query)
            borough = (queryString.parse(props.query)).borough;
        else
            borough = "";

        useEffect(()=>{
                return fetch(`https://frozen-anchorage-54331.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${borough}`)
                .then(res=>res.json()).then(restaurants=>{    
                    setRestaurants(restaurants);
                });      
        },[borough, page]);


    // Previous Page
    function previousPage() {
        if (page > 1) {
            setPage(page=>page-1); 
        }
    }
 
     // Next Page
    function  nextPage() {
            setPage(page=>page+1); 
    }   
    
    
    if(restaurants) {
        if(restaurants.length>0) {
            return( 
                <>
                    <Card bg='light'>
                        <Card.Body >
                            <Card.Title ><strong>Restaurant List</strong></Card.Title>
                            <Card.Text>
                                Full list of restaurant. Optionally sorted by borough
                            </Card.Text>
                        </Card.Body>                  
                    </Card>
                        <br/>
                
                        <Table striped bordered hover style={{"height": "400px"}}>    
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Borough</th>
                                    <th>Cuisine</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    restaurants.map((restaurant, index)=>(
                                        <tr key={index} onClick={()=>{ history.push(`/restaurant/${restaurant._id}`)}}>    
                                            <td>{restaurant.name}</td>
                                            <td>{restaurant.address.buildinig} {restaurant.address.street}</td>
                                            <td>{restaurant.borough}</td>
                                            <td>{restaurant.cuisine}</td>
                                        </tr>
                                    ))
                                }   
                            </tbody>
                        </Table>
                    

                    <Pagination>
                    <Pagination.Prev onClick={previousPage} />
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next  onClick={nextPage}/>
                    </Pagination>
                </>
            )
        }else{
           return <Card>
                        <Card.Body>
                            <Card.Text>No Restaurant Found</Card.Text>
                        </Card.Body>
                    </Card>
        }   
    }else{
        return  <Card>
                    <Card.Body>
                            <Card.Text>Loading Restaurants...</Card.Text>
                    </Card.Body>
                </Card> 
    }
    
       
}