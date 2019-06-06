import React, { Component } from 'react';
import Navbar from './Navbar';
import { combineReducers,createStore } from 'redux';
import { Provider } from 'react-redux'
import { Card,Spinner} from 'react-bootstrap';
import getpopular from './getPopular';
import getpopularMovie from './getPopularMovies'
import '../Css/Home.css';

        function productReducers(state = [],action){
            return state;
        }
        function UserReducer(state = '',{type,payload}){

            switch(type){
                case 'updateUser':
                    return payload.user;
                
                 default:
                      return state;
            }

        }

        const allReducers = combineReducers({
            prodects:productReducers,
            user:UserReducer
        })
    
    
    
const store = createStore(
    allReducers,
    {
        prodects:[{name:'i Phone'}],
        user:'Tom'
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
console.log(store.getState())


const updateUserAction = { 
type:'updateUser',
payload:{user:'John'}
}

store.dispatch(updateUserAction);



console.log(store.getState())



class Home extends Component {

    constructor(){
        super()
        this.state = {
          StartSliceHere:0,
          EndSliceHere:4,
          popularTvShow:[],
          popularMovie:[],
          afterFetchTvshow:false,
          afterFetchMovie:false,
          GeneralSearch:null,
          ImagePath:`https://image.tmdb.org/t/p/w500/`
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
        const themostPopularMovie = await getpopularMovie(page);
        this.setState({popularTvShow:themostPopularTvshow,popularMovie:themostPopularMovie,afterFetchTvshow:true,afterFetchMovie:true});
    
        setInterval(() =>{ 
          if(this.state.StartSliceHere === 16){
            this.setState({StartSliceHere:0,EndSliceHere:4});
          }else{
            this.setState({StartSliceHere:this.state.StartSliceHere+4,EndSliceHere:this.state.EndSliceHere+4});
    
          }
        }, 5000);
      }
    

    

    render(){
        return(
                   <div className="allSite">
             <Navbar ></Navbar>
           
          <h1 className="SeriesHeaderStyle">Most Popular Series</h1>
     
       
          {this.state.afterFetchTvshow ?        
            <div   className="IntervalInHomeStyle">
            {this.state.popularTvShow.results.slice(this.state.StartSliceHere,this.state.EndSliceHere).map(item =>
         <Card className="CardStyle"   key={item.id}>

         {item.poster_path ? 
   <Card.Img
   title={item.name}
   className="imgFigure"
    src={this.state.ImagePath + item.poster_path}
   />
        :
        <Card.Img
        title={item.name}
        className="imgFigure"
         src="https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg"
        />
        }
     
        <div className="top">{item.name}<br></br>{item.first_air_date}<br></br> </div>
        <div className="bottom">{item.vote_average * 10}%  <img className="loveicon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Emoji_u2665.svg/1024px-Emoji_u2665.svg.png" alt=""></img></div>
        


      
       </Card>)}
            </div>        : <div className="spinnerStyle">
             <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
         <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
       
               </div>}
               <br></br>
               <div className="navigationDot">
               <li  style={{background:this.state.StartSliceHere === 0 ? 'orange': null}} className="dot"></li>
               <li  style={{background:this.state.StartSliceHere === 4 ? 'orange': null}} className="dot"></li>
               <li  style={{background:this.state.StartSliceHere === 8 ? 'orange': null}} className="dot"></li>
               <li  style={{background:this.state.StartSliceHere === 12 ? 'orange': null}} className="dot"></li>
               <li  style={{background:this.state.StartSliceHere === 16 ? 'orange': null}} className="dot"></li>
          </div>
     
            <h1 className="MoviesHeaderStyle">Most Popular Movies</h1>
        
          {this.state.afterFetchMovie ?        
            <div   className="IntervalInHomeStyle">
            {this.state.popularMovie.results.slice(this.state.StartSliceHere,this.state.EndSliceHere).map(item =>
         <Card className="CardStyle2"   key={item.id}>
 

         {item.poster_path ? 
   <Card.Img
   title={item.title}
   className="imgFigure"
    src={this.state.ImagePath + item.poster_path}
   />
        :
        <Card.Img
        title={item.title}
        className="imgFigure"
         src="https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg"
        />
        }
     
       <div className="top">{item.title}<br></br>{item.release_date}<br></br></div>
        <div className="bottom">{item.vote_average * 10}%  <img className="loveicon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Emoji_u2665.svg/1024px-Emoji_u2665.svg.png" alt=""></img></div>



      
       </Card>)}
            </div>       : <div className="spinnerStyle">
             <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
         <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
       
               </div>
              }
 <br></br>
               <div className="navigationDot">
               <li style={{background:this.state.StartSliceHere === 0 ? 'aquamarine': null}} className="dot"></li>
               <li style={{background:this.state.StartSliceHere === 4 ? 'aquamarine': null}} className="dot"></li>
               <li style={{background:this.state.StartSliceHere === 8 ? 'aquamarine': null}} className="dot"></li>
               <li style={{background:this.state.StartSliceHere === 12 ? 'aquamarine': null}} className="dot"></li>
               <li style={{background:this.state.StartSliceHere === 16 ? 'aquamarine': null}} className="dot"></li>  
            </div>
      
            <br></br>

          


         </div>

        )
    }
}

export default Home;