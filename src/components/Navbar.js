import React,{Component} from 'react'
import '../Css/navbar.css'
import logo from '../logo.svg';
import { Navbar,Nav,Form,FormControl,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'


class NavBar extends Component{





render(){
  return (
 
      <Navbar    bg="dark" variant="dark">
    <img className="mainreactLogo" src={logo} alt=""></img>
    <Nav   defaultActiveKey="/" className="mr-auto">

    <Link className="SecNavStyle" to={`/`}><Navbar.Brand>Tv shows</Navbar.Brand></Link>
    <Link className="SecNavStyle" to={`/Movies`}><Navbar.Brand >Movies</Navbar.Brand></Link>
    </Nav>
   



    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-1" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>



)
}
 
  }
  export default NavBar;
  
  