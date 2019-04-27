import React,{Component} from 'react'
import '../Css/navbar.css'
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

class NavBar extends Component{


render(){
  return (
    <div className="flex-container">      


<Link className="LinkToMoviesComponent" to="/Movies"><h5 >Movies</h5></Link>
{/* <h5 onClick={()=> this.props.getTopRatedAfterClick()}>Movies</h5>     */}
<img className="mainreactLogo" src={logo} alt=""></img>

<Link className="LinkToAppComponent" to="/" ><h5 >Tv shows</h5>  </Link>

 </div>
)
}
 
  }
  export default NavBar;
  
  