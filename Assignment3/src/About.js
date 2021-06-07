import {Button, Card} from 'react-bootstrap'
import { useHistory } from "react-router-dom"; 


export default function About(){

    let history = useHistory();
      
    return( 
        <>
          <Card style={{ width: '50rem' }}>
              <Card.Body>
                    <Card.Title>About</Card.Title>
                    <Card.Text>
                    This project was created in React. There are 3 main components
                    <ul>
                        <li>Restaurants</li>
                        <li>Restaurant</li>
                        <li>About</li>
                    </ul>
                    </Card.Text>
                </Card.Body>
                <Button  variant="primary" onClick={() => { history.push("/Restaurants")}}> Back to Restaurants</Button>
            </Card>
        </>
    );   
}