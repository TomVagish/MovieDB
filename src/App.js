import React, { Component } from 'react';

import { ProgressBar,input, Button } from 'react-bootstrap';
import Cards from './components/Card'
import getpopular from './components/getPopular'
import getToprated from './components/getToprated'
import './Css/App.css';
import Navbar from './components/Navbar'


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
    this.Search = this.Search.bind(this);
    this.getTopRatedTvshow = this.getTopRatedTvshow.bind(this);
  }

  inputTodo(event){
    this.setState({[event.target.name]: event.target.value});
 }
 
 async getTopRatedTvshow(){

  const a = await getToprated();
  this.setState({topratedTvshow:a,afterFetchMovie:true})
  console.log(this.state.topratedTvshow);

 }

  async componentDidMount(){
    const themostPopularTvshow = await getpopular();
    this.setState({popularTvShow:themostPopularTvshow,afterFetchTvshow:true})
  }


   Search(){
     const SearchInput = this.state.GeneralSearch;

    return fetch(`https://api.themoviedb.org/3/search/multi?api_key=65a51587439f13177c0c078aac743a57&language=en-US&query=${SearchInput}&page=1&include_adult=false`)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(e =>{
        console.log(e);
    });
  }



  render() {

      return (
        <div className="App">
             <Navbar getTopRatedAfterClick={this.getTopRatedTvshow}></Navbar>
      
             {/* <SecNavBar></SecNavBar> */}

             {/* <Button onClick={this.getTopRatedTvshow}>Get</Button> */}
             {/* <input name="GeneralSearch" onChange={this.inputTodo}></input>
             <Button onClick={this.Search}>Search</Button>
              <h1>{this.state.GeneralSearch}</h1> */}
             {this.state.afterFetchTvshow ? <Cards header={'Popular Tv Shows'} tvshow={this.state.popularTvShow}></Cards>
             : <ProgressBar animated now={100} />}
             {this.state.afterFetchMovie ? <Cards header={'Top Rated Tv Shows'} tvshow={this.state.topratedTvshow}></Cards>
             : <ProgressBar animated now={100} />}

        </div>
      );
    }
  
  
}

export default App;
