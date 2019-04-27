import React,{Component} from 'react';
import  { Figure } from 'react-bootstrap';
import '../Css/Card.css'
import { Link } from 'react-router-dom';



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
         <Figure  className="FigureStyle"  key={item.id}>
    
         <Link className="LinkStyle"  to={{
  pathname: `/SeriesPage/${item.id}`,
  state: { 
    DataID: item.id,
    DataType: 'Series'
  }
}} >
         <Figure.Image
         className="imgFigure"
          src={this.state.ImagePath + item.backdrop_path}
          
         />
      
     
      <Figure.Caption >
      <div className="HeaderDateOverViewStyle">

      <h3>{item.name}</h3>
           <h5 >{item.first_air_date}</h5>
           <br></br>
        
           {item.overview === '' ? <h5>No overview available</h5> : <h5 className="overviewStyle">{item.overview}</h5>}

      </div>
        
         
         </Figure.Caption>

         </Link> 
         
       
       </Figure>)}
            </div>
        </div>
              : 
              <div>
             <hr></hr>
              <h1 className="mainHeader">{this.state.header}</h1>
              <hr></hr>
               <div className="divStyle">
               {this.state.Data.Movies.results.map(item =>
         <Figure  className="FigureStyle"  key={item.id}>
    
         <Link className="LinkStyle"  to={{
  pathname: `/SeriesPage/${item.id}`,
  state: { 
    DataID: item.id,
    DataType: 'Movie'
  }
}} >
         <Figure.Image
         className="imgFigure"
          src={this.state.ImagePath + item.backdrop_path}
          
         />
    
      <Figure.Caption >
      <div className="HeaderDateOverViewStyle">

      <h3>{item.title}</h3>
           <h5 >{item.release_date}</h5>
           <br></br>
        
           {item.overview === '' ? <h5>No overview available</h5> : <h5 className="overviewStyle">{item.overview}</h5>}

      </div>
        
         
         </Figure.Caption>

         </Link> 
         
       
       </Figure>)}
       
               </div>
              </div>
              }
           
      
        </div>
        
        );
      }
   

}

export default cards;


 