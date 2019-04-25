import React,{Component} from 'react';
import  { Figure,Button } from 'react-bootstrap';
import '../Css/Card.css'
import {Link} from 'react-router-dom';



class  cards extends Component{
    constructor(props) {
        super();
  
        this.state = {
            Tvshow:props,
            header:props.header,
          index: 0,
          direction: null,
        ImagePath:`https://image.tmdb.org/t/p/w500/`
        };

      
      }
    

 
   

      render() {
    
        return (

            <div >
           
               <hr></hr>
              <h1 className="mainHeader">{this.state.header}</h1>
              <hr></hr>
            <div className="divStyle">
            {this.state.Tvshow.tvshow.results.map(item =>
         <Figure  className="FigureStyle"  key={item.id}>
             <Figure.Image
         className="imgFigure"
          src={this.state.ImagePath + item.backdrop_path}
         />
           <h3 >{item.name}</h3>
           <h5>{item.first_air_date}</h5>
         
       
     
          
         <Figure.Caption>
         {/* <ProgressBar  variant="success" now={item.vote_average*10} label={`${item.vote_average*10}%`} /> */}
         {item.overview === '' ? <h5>No overview available</h5> : <h5 className="overviewStyle">{item.overview}</h5>}
        
         
         </Figure.Caption>
         <br></br>
    
      
         <br></br>
         
         <Link to={{
  pathname: `/SeriesPage/${item.id}`,
  state: { 
    seiresID: item.id,
    seiresNAME: item.name
  }
}} ><Button variant="dark"> More details</Button></Link> 
 
         
       
       </Figure>)}
            </div>
        
      
        </div>
        
   

               



   
        

           
        );
      }
   

}

export default cards;


 