import React,{Component} from 'react';
import Navbar from './Navbar';
import getPopularMovies from './getPopularMovies';
import Cards from './Card';
import { ProgressBar } from 'react-bootstrap';



class Movies extends Component{
constructor(){
    super()
    this.state = {
        popularMovie:[],
        afterfetch:false
    }
}

async componentDidMount(){

    const Data = await getPopularMovies();
    this.setState({popularMovie:Data,afterfetch:true});
    
}

    render(){
        return(
            <div>
                <Navbar></Navbar>
                
                {this.state.afterfetch ? <Cards header={'Popular Movies'} data={this.state.popularMovie}></Cards>
             : <ProgressBar animated now={100} />}
            </div>
        )
    }
}

export default Movies