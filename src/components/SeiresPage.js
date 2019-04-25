import React,{Component} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
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

        console.log(this.state.SeiresDetails)
  
        return(

            <div>
   <div  className="headerPage">
        
        <img className="imgSize" src={this.state.ImagePath + this.state.SeiresDetails.poster_path} alt=""></img>
        <h1 className="seriesName">{this.state.SeiresDetails.name}</h1>
 

         
    
            </div>

<div className="mainPage">
<h3>overview:</h3>
<p>{this.state.SeiresDetails.overview}</p>
<hr></hr>
<label style={{'fontweight': 'bold'}}>First Air Date : { this.state.SeiresDetails.first_air_date}</label>
<h5>{this.state.SeiresDetails.vote_average * 10}% love this</h5>



</div>
            </div>

         
      
     
            
           
        )
    }

}





export default SeriesPage