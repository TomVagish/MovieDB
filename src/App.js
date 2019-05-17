import React, { Component } from 'react';

import { ProgressBar} from 'react-bootstrap';
import Cards from './components/Card';
import getpopular from './components/getPopular';

import './Css/App.css';
import Navbar from './components/Navbar';




class App extends Component {

  constructor(){
    super()
    this.state = {
      popularTvShow:[],
      topratedTvshow:[],
      afterFetchTvshow:false,
      afterFetchMovie:false,
      GeneralSearch:null
    }
    this.inputTodo = this.inputTodo.bind(this)
    // this.Search = this.Search.bind(this);
 
  }

  inputTodo(event){
    this.setState({[event.target.name]: event.target.value});
 }


  async componentDidMount(){
    const page = 1;
    const themostPopularTvshow = await getpopular(page);
    this.setState({popularTvShow:themostPopularTvshow,afterFetchTvshow:true})
  }


  //  Search(){
  //    const SearchInput = this.state.GeneralSearch;

  //   return fetch(`https://api.themoviedb.org/3/search/multi?api_key=65a51587439f13177c0c078aac743a57&language=en-US&query=${SearchInput}&page=1&include_adult=false`)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(e =>{
  //       console.log(e);
  //   });
  // }



  render() {

      return (
        <div >
             <Navbar ></Navbar>
      
     
             {this.state.afterFetchTvshow ? <Cards  header={'Popular Tv Shows'} data={this.state.popularTvShow}></Cards>
             : <ProgressBar animated now={100} />}
        

        </div>
      );
    }
  
  
}

export default App;
