import React,{Component} from 'react';
import  { Card,Nav,Navbar,Spinner,Pagination} from 'react-bootstrap';
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

        var sectionNav = 'popular';
        var pageNumber = 1;
        var pageNumberAndSection = localStorage.getItem('pageNumberAndSection');
        const data = JSON.parse(pageNumberAndSection);
        if(data !== null){
          sectionNav = data.section;
          pageNumber = data.pageNumber;
        }

        var sectionNav2 = 'popular';
        var pageNumber2 = 1;
        var pageNumberAndSection2 = localStorage.getItem('pageNumberAndSection2');
        const data2 = JSON.parse(pageNumberAndSection2);
        if(data2 !== null){
          sectionNav2 = data2.section;
          pageNumber2 = data2.pageNumber;
        }
    
        this.state = {
           
            Data:props.data.results,
            header:props.header,
            progress:false,
            pageNumberToFetchData:pageNumber,
            pageNumberToFetchData2:pageNumber2,
            currentSeriesNav:sectionNav,
            currentmoviesNav:sectionNav2,
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
      this.setInLocalStorage = this.setInLocalStorage.bind(this);
      this.setInLocalStorage2 = this.setInLocalStorage2.bind(this);
    
      }



      
      componentDidMount() {
       
        // claer Localstorage after close tab/browser
        window.onbeforeunload = function () {
          localStorage.removeItem('pageNumberAndSection');
          localStorage.removeItem('pageNumberAndSection2');
      };

      // check wich to reload, series or movies
      if(this.state.header === 'Popular Tv Shows'){
        this.loadMorePopularSeries(this.state.pageNumberToFetchData);

      }else{
        this.loadMorePopularMovies(this.state.pageNumberToFetchData2);

      }

        this.checkIfscroll();
      }

    // handle the button that return the user to top of the page
      checkIfscroll(){
        window.addEventListener('scroll', this.handleScroll, { passive: true })
      
        window.onscroll = function(ev) {
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight/2) {
            this.setState({ShowHideGotoTop:'block'});
          }else{
            this.setState({ShowHideGotoTop:'none'});
          }
        }.bind(this);
      }


      setInLocalStorage(){
       
        var pageNumberAndSection = { pageNumber: this.state.pageNumberToFetchData, section: this.state.currentSeriesNav };
        localStorage.setItem('pageNumberAndSection', JSON.stringify(pageNumberAndSection));
      }
 
      setInLocalStorage2(){
       
        var pageNumberAndSection2 = { pageNumber: this.state.pageNumberToFetchData2, section: this.state.currentmoviesNav };
        localStorage.setItem('pageNumberAndSection2', JSON.stringify(pageNumberAndSection2));
      }
 

      async GetTopRatedSeries(){
        const page = 1;
          this.setState({ progress:true});
          const TopRatedtvshow = await getTopratedSeries(page);
            this.setState({Data:TopRatedtvshow.results,header:'Popular Tv Shows',progress:false,currentSeriesNav:'topRated',pageNumberToFetchData:1});
      }

      async GetTopRatedMovies(){
        const page =1 
          this.setState({ progress:true});
          const TopRatedmovies = await getTopRatedMovies(page);
          
           this.setState({Data:TopRatedmovies.results,currentmoviesNav:'topRated',progress:false,pageNumberToFetchData2:1});
      }

      async GetUpComingMovies(){
          this.setState({ progress:true});
          const page=1;
          const Upcomingmovies = await getUpComingMovies(page);
          
           this.setState({Data:Upcomingmovies.results,currentmoviesNav:'upcoming',progress:false,pageNumberToFetchData2:1});
      }

      async GetOnairSeries(){
        const page = 1;
        this.setState({ progress:true});
          const OnAirtvshow = await getOnairSeries(page);
           this.setState({Data:OnAirtvshow.results,header:'Popular Tv Shows',progress:false,currentSeriesNav:'onAir',pageNumberToFetchData:1});
      }

      SetpopularSeries(){
        this.setState({Data:this.props.data.results,header:this.props.header,currentSeriesNav:'popular',pageNumberToFetchData:1})
      }
      

      SetpopularMovies(){
        this.setState({Data:this.props.data.results,header:this.props.header,currentmoviesNav:'popular',pageNumberToFetchData2:1})
      }



      async  loadMorePopularSeries(pageNumber){
        
        switch(this.state.currentSeriesNav){
            case 'popular':
            const data = await getPopularseries(pageNumber);
            this.setState({Data:[...data.results],header:'Popular Tv Shows',progress:false,pageNumberToFetchData:pageNumber});
            break;
            case 'topRated':
            const TopRatedtvshow = await getTopratedSeries(pageNumber);
            this.setState({Data:[...TopRatedtvshow.results],header:'Popular Tv Shows',progress:false,pageNumberToFetchData:pageNumber});
            break;
            case 'onAir':
            const OnAirtvshow = await getOnairSeries(pageNumber);
            this.setState({Data:[...OnAirtvshow.results],header:'Popular Tv Shows',progress:false,pageNumberToFetchData:pageNumber});
            break;

            default:
            console.log('default');
            break;
        }
      }


      async  loadMorePopularMovies(pageNumber){
        
        switch(this.state.currentmoviesNav){
            case 'popular':
            const data = await getPopularMovies(pageNumber);
            this.setState({Data:[...data.results],progress:false,pageNumberToFetchData2:pageNumber});
            break;
            case 'topRated':
            const TopRatedMovies = await getTopRatedMovies(pageNumber);
            this.setState({Data:[...TopRatedMovies.results],progress:false,pageNumberToFetchData2:pageNumber});
            break;
            case 'upcoming':
            const upcomingMovies = await getUpComingMovies(pageNumber);
            this.setState({Data:[...upcomingMovies.results],progress:false,pageNumberToFetchData2:pageNumber});
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

        let active = this.state.pageNumberToFetchData;
        let items = [];
        for (let number = 1; number <= 10; number++) {
          items.push(
            <Pagination.Item onClick={()=> this.loadMorePopularSeries(number)} key={number} active={number === active}>
              {number}
            </Pagination.Item>,
          );
        }

        let active2 = this.state.pageNumberToFetchData2;
        let items2 = [];
        for (let number = 1; number <= 10; number++) {
          items2.push(
            <Pagination.Item onClick={()=> this.loadMorePopularMovies(number)} key={number} active={number === active2}>
              {number}
            </Pagination.Item>,
          );
        }


        return (
            <div>
            {/* check if Data is Movies or Tv show */}
            
              {this.state.header === 'Popular Tv Shows' ? 
              <div  className="SeriesStyle">
         
                   
                   <Navbar className="SeriesNavStyle"  sticky="top">
                   <Nav  defaultActiveKey={this.state.currentSeriesNav} >
     <Nav.Item>
     <Nav.Link eventKey="popular" className="SecNavStyle" onClick={this.SetpopularSeries}>Most Popular</Nav.Link>
     </Nav.Item>
     <Nav.Link > || </Nav.Link> 
     
   
     <Nav.Item >
     <Nav.Link eventKey="topRated" className="SecNavStyle" onClick={this.GetTopRatedSeries}>Top Rated</Nav.Link>
     </Nav.Item>
     <Nav.Link > || </Nav.Link>
   
   
     <Nav.Item >
     <Nav.Link eventKey="onAir" className="SecNavStyle" onClick={this.GetOnairSeries}>Now On Tv</Nav.Link>
     </Nav.Item>
     {this.state.progress ? <Nav.Item>
     <Nav.Link > <Spinner animation="border"  size="sm"/></Nav.Link>
     </Nav.Item>: null }
   </Nav>    
                   </Navbar> 
                
              
             
              
            <div   className="divStyle">
            {this.state.Data.map(item =>
         <Card className="FigureStyle"   key={item.id}>
    
         <Link
         onClick={this.setInLocalStorage}
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

          
          
        
          <div  className="laodMoreData">
            <hr></hr>
         <Pagination >{items}</Pagination>
            </div>
          
           
            <br></br>
           
        </div>

        // if the data is of movies start handling here
              : 
              <div className="SeriesStyle">

<Navbar className="MoviesNavStyle" sticky="top">
<Nav  defaultActiveKey={this.state.currentmoviesNav}>
  <Nav.Item >

  <Nav.Link eventKey="popular" className="SecNavStyle" onClick={this.SetpopularMovies}>Most Popular</Nav.Link>
  </Nav.Item>
   <Nav.Link > || </Nav.Link>

  <Nav.Item >
  <Nav.Link eventKey="topRated" className="SecNavStyle" onClick={this.GetTopRatedMovies}>Top Rated</Nav.Link>
  </Nav.Item>
 <Nav.Link > || </Nav.Link> 

  <Nav.Item>
  <Nav.Link eventKey="upcoming" className="SecNavStyle" onClick={this.GetUpComingMovies}>Upcoming..</Nav.Link>
  </Nav.Item>
  {this.state.progress ? <Nav.Item>
  <Nav.Link > <Spinner animation="border" size="sm" /></Nav.Link>
  </Nav.Item>: null }
</Nav>
 
</Navbar>
               <div className="divStyle">
               {this.state.Data.map(item =>
         <Card  className="FigureStyle"  key={item.id}>
    
         <Link  onClick={this.setInLocalStorage2} to={{
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
   
   <div  className="laodMoreData">
            <hr></hr>
          <Pagination >{items2}</Pagination>
            </div>
           
            <br></br>
           

              </div>
              
              }
           
         
        </div>
        
        );
      }
   

}

export default cards;


 