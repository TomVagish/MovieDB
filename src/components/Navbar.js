import React,{Component} from 'react'
import '../Css/navbar.css'
import logo from '../logo.svg';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'


class NavBar extends Component{





render(){
  return (
 
      <Navbar   bg="dark" variant="dark">
    <img className="mainreactLogo" src={logo} alt=""></img>
    <Nav  className="mr-auto">
    <Link to={`/`}><Navbar.Brand>Tv shows</Navbar.Brand></Link>
    <Link to={`/Movies`}><Navbar.Brand>Movies</Navbar.Brand></Link>
    </Nav>
   



    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>



)
}
 
  }
  export default NavBar;
  
  