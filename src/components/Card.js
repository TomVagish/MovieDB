import React,{Component} from 'react';
import  { Figure, Container,Card } from 'react-bootstrap';
import '../Css/Card.css'
import { Link } from 'react-router-dom';
import FigureCaption from 'react-bootstrap/FigureCaption';



class  cards extends Component{
    constructor(props) {
        super();
        this.state = {
            Data:props,
            header:props.header,
          index: 0,
          direction: null,
        ImagePath:`https://image.tmdb.org/t/p/w500/`
        };

      
      }
      render() {
        
        
        return (

        

            <div >

            {/* check if Data is Movies or Tv show */}

              {this.state.header === 'Popular Tv Shows' ? 
              <div>
              <hr></hr>
              <h1 className="mainHeader">{this.state.header}</h1>
              <hr></hr>
            <div className="divStyle">
            {this.state.Data.tvshow.results.map(item =>
         <Card className="FigureStyle"   key={item.id}>
    
         <Link   to={{
  pathname: `/SeriesPage/${item.id}`,
  state: { 
    DataID: item.id,
    DataType: 'Series'
  }
}}

>     

         <Card.Img
         className="imgFigure"
         title={item.name}
          src={this.state.ImagePath + item.poster_path}
          
         />
     
        <div class="centered">{item.name}</div>
  

         </Link> 
         
       
       </Card>)}
            </div>
        </div>

        // if the data is of movies start handling here
              : 
              <div>
             <hr></hr>
              <h1 className="mainHeader">{this.state.header}</h1>
              <hr></hr>
               <div className="divStyle">
               {this.state.Data.Movies.results.map(item =>
         <Card  className="FigureStyle"  key={item.id}>
    
         <Link className="LinkStyle"  to={{
  pathname: `/SeriesPage/${item.id}`,
  state: { 
    DataID: item.id,
    DataType: 'Movie'
  }
}} >
        
         <Card.Img
         className="imgFigure"
          src={this.state.ImagePath + item.poster_path}
          
         />

<div class="centered">{item.title}</div>

{/*     
      <Figure.Caption >
      <div className="HeaderDateOverViewStyle">

      
           <h5 >{item.release_date}</h5>
           <br></br>
        
           {item.overview === '' ? <h5>No overview available</h5> : <h5 className="overviewStyle">{item.overview}</h5>}

      </div>
        
         
         </Figure.Caption> */}

         </Link> 
         
       
       </Card>)}
       
               </div>
              </div>
              }
           
      
        </div>
        
        );
      }
   

}

export default cards;


 