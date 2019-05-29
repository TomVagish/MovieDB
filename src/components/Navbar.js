import React,{Component} from 'react'
import '../Css/navbar.css'
import logo from '../logo.svg';
import { Navbar,Nav,Button,Modal } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import search from './search';

class NavBar extends Component{

  constructor(){
    super();
    this.state ={
      inputData:'',
      show:false
    }
    this.handleChange = this.handleChange.bind(this);
    this.newSearch = this.newSearch.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }


  async newSearch(){
  const data = await search(this.state.inputData);
  console.log(data);
  this.setState({inputData:'',show: true });
  }

  handleChange(event) {
    this.setState({inputData: event.target.value});
  }

  handleClose() {
    this.setState({ show: false });
  }




render(){
  return (
    <div>
      <Navbar    bg="dark" variant="dark">
    <img className="mainreactLogo" src={logo} alt=""></img>
    <Nav   defaultActiveKey="/" className="mr-auto">

    <Link className="SecNavStyle" to={`/`}><Navbar.Brand>Tv shows</Navbar.Brand></Link>
    <Link className="SecNavStyle" to={`/Movies`}><Navbar.Brand >Movies</Navbar.Brand></Link>
    
    </Nav>
   
   



    {/* <Form inline>
      <FormControl value={this.state.inputData} onChange={this.handleChange} type="text" placeholder="Search" className="mr-sm-1" />
      <Button onClick={this.newSearch} variant="outline-info">Search</Button>
    </Form> */}
                        <img className="favoriteImg" alt="" title="Favorite List" src="https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/heart_blue.png" ></img>

  </Navbar>

<Modal show={this.state.show} onHide={this.handleClose}>
<Modal.Header closeButton>
  <Modal.Title>Modal heading</Modal.Title>
</Modal.Header>
<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={this.handleClose}>
    Close
  </Button>
  <Button variant="primary" onClick={this.handleClose}>
    Save Changes
  </Button>
</Modal.Footer>
</Modal>
</div>
)
}
 
  }
  export default NavBar;
  
  