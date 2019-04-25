import React,{Component} from 'react'
import '../Css/navbar.css'
import logo from '../logo.svg';

class NavBar extends Component{


render(){
  return (
    <div className="flex-container">      

<h5 onClick={()=> this.props.getTopRatedAfterClick()}>Movies</h5>    
<img className="mainreactLogo" src={logo} alt=""></img>
<h5>Tv shows</h5>  

 </div>
)
}
 
  }
  export default NavBar;
  
  