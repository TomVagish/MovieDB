import React,{Component} from 'react';
import  { Card,Nav,Navbar,Spinner, Button,ProgressBar,Form,FormControl } from 'react-bootstrap';
import '../Css/Card.css'
import { Link } from 'react-router-dom';
import getTopratedSeries from './getTopratedSeries';
import getTopRatedMovies from './getTopRatedMovies';
import getOnairSeries from './getOnairSeries';
import getUpComingMovies from './getUpcomingMovies';
 import getPopularseries from './getPopular';
import getPopularMovies from './getPopularMovies';




class  cards extends Component{
    constructor(props) {
        super();
        this.state = {
            Data:props.data.results,
            header:props.header,
            progress:false,
            pageNumberToFetchData:2,
            currentSeriesNav:'popular',
            currentmoviesNav:'popular',
            ShowHideGotoTop:'none',
        ImagePath:`https://image.tmdb.org/t/p/w500/`
        };

      this.GetTopRatedSeries = this.GetTopRatedSeries.bind(this);
      this.GetTopRatedMovies = this.GetTopRatedMovies.bind(this);
      this.SetpopularSeries = this.SetpopularSeries.bind(this);
      this.SetpopularMovies = this.SetpopularMovies.bind(this);
      this.GetOnairSeries = this.GetOnairSeries.bind(this);
      this.GetUpComingMovies = this.GetUpComingMovies.bind(this);
      this.loadMorePopularSeries = this.loadMorePopularSeries.bind(this);
      this.loadMorePopularMovies = this.loadMorePopularMovies.bind(this);
      this.ScrollUp = this.ScrollUp.bind(this);
    
      }



      // handle the button that return the user to top of the page
      componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, { passive: true })
      
        window.onscroll = function(ev) {
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight/2) {
            this.setState({ShowHideGotoTop:'block'});
          }else{
            this.setState({ShowHideGotoTop:'none'});
          }
        }.bind(this);
      }
    

 

      async GetTopRatedSeries(){
        const page = 1;
          this.setState({ progress:true});
          const TopRatedtvshow = await getTopratedSeries(page);
            this.setState({Data:TopRatedtvshow.results,header:'Popular Tv Shows',progress:false,currentSeriesNav:'topRated',pageNumberToFetchData:2});
      }

      async GetTopRatedMovies(){
        const page =1 
          this.setState({ progress:true});
          const TopRatedmovies = await getTopRatedMovies(page);
          
           this.setState({Data:TopRatedmovies.results,currentmoviesNav:'topRated',progress:false,pageNumberToFetchData:2});
      }

      async GetUpComingMovies(){
          this.setState({ progress:true});
          const page=1;
          const Upcomingmovies = await getUpComingMovies(page);
          
           this.setState({Data:Upcomingmovies.results,currentmoviesNav:'upcoming',progress:false,pageNumberToFetchData:2});
      }

      async GetOnairSeries(){
        const page = 1;
        this.setState({ progress:true});
          const OnAirtvshow = await getOnairSeries(page);
           this.setState({Data:OnAirtvshow.results,header:'Popular Tv Shows',progress:false,currentSeriesNav:'onAir',pageNumberToFetchData:2});
      }

      SetpopularSeries(){
        this.setState({Data:this.props.data.results,header:this.props.header,currentSeriesNav:'popular',pageNumberToFetchData:2})
      }
      

      SetpopularMovies(){
        this.setState({Data:this.props.data.results,header:this.props.header,currentmoviesNav:'popular',pageNumberToFetchData:2})
      }



      async  loadMorePopularSeries(){

        switch(this.state.currentSeriesNav){
            case 'popular':
            const data = await getPopularseries(this.state.pageNumberToFetchData);
            this.setState({Data:[...this.state.Data,...data.results],header:'Popular Tv Shows',progress:false,pageNumberToFetchData:this.state.pageNumberToFetchData+1});
            break;
            case 'topRated':
            const TopRatedtvshow = await getTopratedSeries(this.state.pageNumberToFetchData);
            this.setState({Data:[...this.state.Data,...TopRatedtvshow.results],header:'Popular Tv Shows',progress:false,pageNumberToFetchData:this.state.pageNumberToFetchData+1});
            break;
            case 'onAir':
            const OnAirtvshow = await getOnairSeries(this.state.pageNumberToFetchData);
            this.setState({Data:[...this.state.Data,...OnAirtvshow.results],header:'Popular Tv Shows',progress:false,pageNumberToFetchData:this.state.pageNumberToFetchData+1});
            break;

            default:
            console.log('default');
            break;
        }
      }


      async  loadMorePopularMovies(){

        switch(this.state.currentmoviesNav){
            case 'popular':
            const data = await getPopularMovies(this.state.pageNumberToFetchData);
            this.setState({Data:[...this.state.Data,...data.results],progress:false,pageNumberToFetchData:this.state.pageNumberToFetchData+1});
            break;
            case 'topRated':
            const TopRatedMovies = await getTopRatedMovies(this.state.pageNumberToFetchData);
            this.setState({Data:[...this.state.Data,...TopRatedMovies.results],progress:false,pageNumberToFetchData:this.state.pageNumberToFetchData+1});
            break;
            case 'upcoming':
            const upcomingMovies = await getUpComingMovies(this.state.pageNumberToFetchData);
            this.setState({Data:[...this.state.Data,...upcomingMovies.results],progress:false,pageNumberToFetchData:this.state.pageNumberToFetchData+1});
            break;

            default:
            console.log('default');
            break;
        }
      }

      ScrollUp(){
        window.scroll({top: 0, behavior: 'smooth' })
      }



      render() {

        return (
            <div>

            {/* check if Data is Movies or Tv show */}
              {this.state.header === 'Popular Tv Shows' ? 
              <div  className="SeriesStyle">
                <Navbar className="SeriesNavStyle"  sticky="top">
                <Nav  defaultActiveKey="/" >
  <Nav.Item>
  <Nav.Link eventKey="/" className="SecNavStyle" onClick={this.SetpopularSeries}>Most Popular</Nav.Link>
  </Nav.Item>
  <Nav.Link > || </Nav.Link> 
  

  <Nav.Item >
  <Nav.Link eventKey="link-1" className="SecNavStyle" onClick={this.GetTopRatedSeries}>Top Rated</Nav.Link>
  </Nav.Item>
  <Nav.Link > || </Nav.Link>


  <Nav.Item >
  <Nav.Link eventKey="link-2" className="SecNavStyle" onClick={this.GetOnairSeries}>Now On Tv</Nav.Link>
  </Nav.Item>
  {this.state.progress ? <Nav.Item>
  <Nav.Link > <Spinner animation="border"  size="sm"/></Nav.Link>
  </Nav.Item>: null }


 
</Nav>    
                </Navbar>
              
              {/* <h1 className="mainHeader">{this.state.header}</h1> */}
              
            <div   className="divStyle">
            {this.state.Data.map(item =>
         <Card className="FigureStyle"   key={item.id}>
    
         <Link
           to={{
  pathname: `/SeriesPage/${item.id}`,
state:{   DataID: item.id,  DataType: 'Series'}
}}

>     

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



         </Link> 
         
       
       </Card>)}
            </div>
          
            <img
             style={{display:this.state.ShowHideGotoTop}}
              title="Go To Top"
               alt=""
                onClick={this.ScrollUp}
                 className="GotoTop"
                  src="https://cdn.iconscout.com/icon/premium/png-256-thumb/go-to-top-897087.png"></img>

          
          
        
          <div onClick={this.loadMorePopularSeries} className="laodMoreData">
            Load more..
            </div>
          
           
            <br></br>
           
        </div>

        // if the data is of movies start handling here
              : 
              <div className="SeriesStyle">

<Navbar className="MoviesNavStyle" sticky="top">
<Nav  defaultActiveKey="/">
  <Nav.Item >

  <Nav.Link eventKey="/" className="SecNavStyle" onClick={this.SetpopularMovies}>Most Popular</Nav.Link>
  </Nav.Item>
   <Nav.Link > || </Nav.Link>

  <Nav.Item >
  <Nav.Link eventKey="link-1" className="SecNavStyle" onClick={this.GetTopRatedMovies}>Top Rated</Nav.Link>
  </Nav.Item>
 <Nav.Link > || </Nav.Link> 

  <Nav.Item>
  <Nav.Link eventKey="link-2" className="SecNavStyle" onClick={this.GetUpComingMovies}>Upcoming..</Nav.Link>
  </Nav.Item>
  {this.state.progress ? <Nav.Item>
  <Nav.Link > <Spinner animation="border" size="sm" /></Nav.Link>
  </Nav.Item>: null }
</Nav>
 
</Navbar>
               <div className="divStyle">
               {this.state.Data.map(item =>
         <Card  className="FigureStyle"  key={item.id}>
    
         <Link   to={{
  pathname: `/SeriesPage/${item.id}`,
  state:{   DataID: item.id,  DataType: 'Movie'}}} >
        
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

         </Link> 
         
       
       </Card>)}
       
               </div>
               <img
             style={{display:this.state.ShowHideGotoTop}}
              title="Go To Top"
               alt=""
                onClick={this.ScrollUp}
                 className="GotoTop"
                  src="https://cdn.iconscout.com/icon/premium/png-256-thumb/go-to-top-897087.png"></img>

<div onClick={this.loadMorePopularMovies} className="laodMoreData">
            Load more..
            </div>
              </div>
              
              }
           
         
        </div>
        
        );
      }
   

}

export default cards;


 