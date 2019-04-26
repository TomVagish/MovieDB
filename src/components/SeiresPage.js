import React,{Component} from 'react';
import '../Css/seriesPage.css';

class SeriesPage extends Component {
constructor(props){
    super(props);

    this.state ={
        SeiresID:this.props.history.location.state.seiresID,
        SeiresDetails:[],
        afterFetch:false,
        ImagePath:`https://image.tmdb.org/t/p/w500`

    }

}

 componentDidMount(){

  this.getSeiresData();
 
   }


getSeiresData(){

    return fetch(`https://api.themoviedb.org/3/tv/${this.state.SeiresID}?api_key=65a51587439f13177c0c078aac743a57&language=en-US`)
    .then(response => response.json())
    .then(response =>  this.setState({SeiresDetails:response,afterFetch:true}))
    .catch(e =>{
        console.log(e)
    });

}


 

    render(){

    
    const item = this.state.SeiresDetails;
        console.log(item)

  
   
        return(

            <div>
   <div  className="headerPage">
        
        <img className="imgSize" src={this.state.ImagePath + item.poster_path} alt=""></img>
        <h1 className="seriesName">{item.name}</h1>
 
            </div>

<div className="mainPage">
<h3><b>overview :</b></h3>
<p>{item.overview}</p>
<hr></hr>
<h5 className="avarageRate">{item.vote_average * 10}% loved this series</h5>

<h5  >First Air Date : <b>{ item.first_air_date}</b></h5>
<h5>Number Of Seasons : <b> {item.number_of_seasons}</b></h5>
<h5>Number Of Episodes:  <b>{item.number_of_episodes}</b></h5>

<h5>Genres :</h5>
{item.genres ? item.genres.map(x =>
<label> {x.name} | </label>



) : null}
<hr></hr>
{/* <h5>Network :</h5> */}
{item.networks ? item.networks.map(x => 
     <img className="networkLogo" src={this.state.ImagePath + x.logo_path} alt=""></img>
    )
: null}


</div>
            </div>

         
      
     
            
           
        )
    }

    }







export default SeriesPage