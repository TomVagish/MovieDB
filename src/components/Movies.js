import React,{Component} from 'react';
import Navbar from './Navbar';
import getPopularMovies from './getPopularMovies';
import Cards from './Card';
import { Spinner } from 'react-bootstrap';



class Movies extends Component{
constructor(){
    super()
    this.state = {
        popularMovie:[],
        afterfetch:false
    }
}

async componentDidMount(){

    const Data = await getPopularMovies(1);
    this.setState({popularMovie:Data,afterfetch:true});
    
}

    render(){
        return(
            <div>
                <Navbar></Navbar>
                
                {this.state.afterfetch ? <Cards header={'Popular Movies'} data={this.state.popularMovie}></Cards>
             : 
             <div className="spinnerStyle">
             <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
         <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="dark" />
               </div> 
            }
            </div>
        )
    }
}

export default Movies