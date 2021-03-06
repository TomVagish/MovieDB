import React,{Component} from 'react';
import '../Css/seriesPage.css';
import { Spinner,Figure} from 'react-bootstrap';

class SeriesPage extends Component {
constructor(props){
    super(props);
  

    this.state ={
        DataID:this.props.history.location.state.DataID,
        DataDetails:[],
        DataType: this.props.history.location.state.DataType,
        afterFetch:false,
        ImagePath:`https://image.tmdb.org/t/p/w500`

    }

    this.AddtofavoriteList = this.AddtofavoriteList.bind(this);
}

 componentDidMount(){

    if(this.state.DataType === 'Series'){
        this.getSeiresData();
    }else 
  
    this.getMovieData();
   }

   AddtofavoriteList(){
    console.log(this.state.DataDetails.name);
   }


getSeiresData(){
    return fetch(`https://api.themoviedb.org/3/tv/${this.state.DataID}?api_key=65a51587439f13177c0c078aac743a57&language=en-US`)
    .then(response => response.json())
    .then(response =>  this.setState({DataDetails:response,afterFetch:true}))
    .catch(e =>{
        console.log(e)
    });

}

getMovieData(){
    return fetch(`https://api.themoviedb.org/3/movie/${this.state.DataID}?api_key=65a51587439f13177c0c078aac743a57&language=en-US`)
    .then(response => response.json())
    .then(response =>  this.setState({DataDetails:response,afterFetch:true}))
    .catch(e =>{
        console.log(e)
    });

}

    render(){

    
    const item = this.state.DataDetails;
  

  
   
        return(

            

             
                        
            <div className="AllPage"  >
                {this.state.afterFetch ? 
                <div>
                     <div  className="headerPage">
                    <img onClick={this.AddtofavoriteList} className="favoriteImg" alt="" title="Add to favorite" src="https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/heart_blue.png" ></img>
                     <img className="posterImg" src={this.state.ImagePath + item.poster_path} alt=""></img>

         {this.state.DataType === 'Series' ? <h1 className="seriesName">{item.name}</h1> : <h1 className="seriesName">{item.title}</h1> }

     
             </div>
 
 <div className="mainPage">

 <h3><b>overview :</b></h3>
 <p>{item.overview}</p>
 <hr></hr>
 <img className="backDropImg" src={this.state.ImagePath + item.backdrop_path} alt=""></img>

 {this.state.DataType === 'Series' ? <h5 className="avarageRate">{item.vote_average * 10}% loved this series</h5> : <h5 className="avarageRate">{item.vote_average * 10}% loved this movie</h5>}
 
 
 {this.state.DataType === 'Movie' ? 
 <div>
 <h5> Release date : <b>{ item.release_date}</b></h5>
 <h5> Budget : <b>{ item.budget}$</b></h5>

 <img className="ClockImg" src="https://cdn3.iconfinder.com/data/icons/time-clock-1/100/Time_2_00-512.png" alt=""></img>
 <h5><b>{item.runtime}m</b></h5>



 </div> :
 <div>
 <h5  >First Air Date : <b>{ item.first_air_date}</b></h5>
 <h5>Number Of Seasons : <b> {item.number_of_seasons}</b></h5>
 <h5>Number Of Episodes:  <b>{item.number_of_episodes}</b></h5>
 <h5>Genres :</h5>
 {item.genres ? item.genres.map(x =>
 <label key={x.id}> {x.name} | </label>
 
 ) : null}
 <hr></hr>
 {item.networks ? item.networks.map(x => 
      <img key={x.id} className="networkLogo" src={this.state.ImagePath + x.logo_path} alt=""></img>
     )
 : null}



</div>


 
 }
 
 {this.state.DataType === 'Series' ? <h1 className="SeasonsseriesName">{item.name} Seasons</h1> : null }

 
{this.state.DataDetails.seasons ?  item.seasons.map((item,index) =>
    <div key={item.id} className="SeasonsStyleDiv">

       <Figure >
          
           {item.poster_path ?   <Figure.Image
       className="SeasonsImg"
         alt="171x180"
         src={this.state.ImagePath + item.poster_path}
       />
       :
       <Figure.Image
       className="SeasonsImg"
         alt="171x180"
         src="https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg"
       />
        }
     
       <Figure.Caption>
         <h3><b>{item.name}</b></h3>
         <h5><b>First air date :</b> {item.air_date}</h5>
         {item.overview ? <h5><b>Overview : </b>{item.overview}</h5> : <h5>overview not available</h5>}
         <h5><b>Episode count : </b>{item.episode_count}</h5>
       </Figure.Caption>
     </Figure> 
     <hr></hr>
    </div>
    
       )  : null} 

 </div>
                </div>
                : <div>
              <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
                </div>}
  
            </div>

        )
    }

    }







export default SeriesPage




