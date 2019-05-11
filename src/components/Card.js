import React,{Component} from 'react';
import  { Card,Nav,Navbar,Spinner } from 'react-bootstrap';
import '../Css/Card.css'
import { Link } from 'react-router-dom';
import getTopRatedSeries from './getTopratedSeries';
import getTopRatedMovies from './getTopRatedMovies';
import getOnairSeries from './getOnairSeries';
import getUpComingMovies from './getUpcomingMovies';



class  cards extends Component{
    constructor(props) {
        super();
        this.state = {
            Data:props,
            header:props.header,
            progress:false,
        ImagePath:`https://image.tmdb.org/t/p/w500/`
        };

      this.GetTopRatedSeries = this.GetTopRatedSeries.bind(this);
      this.GetTopRatedMovies = this.GetTopRatedMovies.bind(this);
      this.SetpopularSeries = this.SetpopularSeries.bind(this);
      this.SetpopularMovies = this.SetpopularMovies.bind(this);
      this.GetOnairSeries = this.GetOnairSeries.bind(this);
      this.GetUpComingMovies = this.GetUpComingMovies.bind(this);
      
      }

      async GetTopRatedSeries(){
          this.setState({ progress:true});
          const tvshow = await getTopRatedSeries();
          const data ={tvshow};
           this.setState({Data:data,header:'Popular Tv Shows',progress:false});
      }

      async GetTopRatedMovies(){
          this.setState({ progress:true});
          const Movies = await getTopRatedMovies();
          const data ={Movies};
           this.setState({Data:data,header:'Popular Movies',progress:false});
      }

      async GetUpComingMovies(){
          this.setState({ progress:true});
          const Movies = await getUpComingMovies();
          const data ={Movies};
           this.setState({Data:data,header:'Popular Movies',progress:false});
      }

      async GetOnairSeries(){
        this.setState({ progress:true});
          const tvshow = await getOnairSeries();
          const data ={tvshow};
           this.setState({Data:data,header:'Popular Tv Shows',progress:false});
      }

      SetpopularSeries(){
        this.setState({Data:this.props,header:this.props.header})
      }
      

      SetpopularMovies(){
        this.setState({Data:this.props,header:this.props.header})
      }
      

      render() {
        

     
        return (

            <div  >

            {/* check if Data is Movies or Tv show */}

              {this.state.header === 'Popular Tv Shows' ? 
              <div className="SeriesStyle">
                <Navbar className="SeriesNavStyle"  sticky="top">
                <Nav    variant="tabs" >
  <Nav.Item>

  <Nav.Link onClick={this.SetpopularSeries}>  Popular Tv shows</Nav.Link>
  </Nav.Item>
  <Nav.Item onClick={this.GetTopRatedSeries}>
  <Nav.Link >  Top rated Tv shows</Nav.Link>
  </Nav.Item>
  <Nav.Item onClick={this.GetOnairSeries}>
  <Nav.Link >  Now On Tv</Nav.Link>
  </Nav.Item>
  {this.state.progress ? <Nav.Item>
  <Nav.Link > <Spinner animation="border" /></Nav.Link>
  </Nav.Item>: null }
 
</Nav>    
                </Navbar>
              
              {/* <h1 className="mainHeader">{this.state.header}</h1> */}
              
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
     
        <div className="top">{item.name}<br></br>{item.first_air_date}<br></br> </div>
        <div className="bottom">{item.vote_average * 10}%  <img className="loveicon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Emoji_u2665.svg/1024px-Emoji_u2665.svg.png" alt=""></img></div>



         </Link> 
         
       
       </Card>)}
            </div>
        </div>

        // if the data is of movies start handling here
              : 
              <div className="SeriesStyle">

<Navbar className="MoviesNavStyle" sticky="top">
<Nav     variant="tabs" defaultActiveKey="/">
  <Nav.Item >

  <Nav.Link  onClick={this.SetpopularMovies}>  Popular Movies</Nav.Link>
  </Nav.Item>
  <Nav.Item >
  <Nav.Link onClick={this.GetTopRatedMovies}>  Top Rated  Movies</Nav.Link>
  </Nav.Item>
  <Nav.Item>
  <Nav.Link onClick={this.GetUpComingMovies}>  Upcoming</Nav.Link>
  </Nav.Item>
  {this.state.progress ? <Nav.Item>
  <Nav.Link > <Spinner animation="border" /></Nav.Link>
  </Nav.Item>: null }
</Nav>
 
</Navbar>
               <div className="divStyle">
               {this.state.Data.Movies.results.map(item =>
         <Card  className="FigureStyle"  key={item.id}>
    
         <Link   to={{
  pathname: `/SeriesPage/${item.id}`,
  state: { 
    DataID: item.id,
    DataType: 'Movie'
  }
}} >
        
         <Card.Img
         title={item.title}
         className="imgFigure"
          src={this.state.ImagePath + item.poster_path}
         />


<div className="top">{item.title}<br></br>{item.release_date}<br></br></div>
<div className="bottom">{item.vote_average * 10}%  <img className="loveicon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Emoji_u2665.svg/1024px-Emoji_u2665.svg.png" alt=""></img></div>

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


 