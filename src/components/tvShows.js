import React,{Component} from 'react';
import Navbar from './Navbar';
import getPopularTvshow from './getPopular';
import Cards from './Card';
import { Spinner } from 'react-bootstrap';



class tvShows extends Component{
constructor(){
    super()
    this.state = {
        popularTvshow:[],
        afterfetch:false
    }
}

async componentDidMount(){

    const Data = await getPopularTvshow(1);
    this.setState({popularTvshow:Data,afterfetch:true});
    
}

    render(){
        return(
            <div>
                <Navbar></Navbar>
                
                {this.state.afterfetch ? <Cards  header={'Popular Tv Shows'} data={this.state.popularTvshow}></Cards>
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

export default tvShows