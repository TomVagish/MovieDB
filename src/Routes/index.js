import React from 'react';
import {BrowserRouter, Route ,Switch} from 'react-router-dom'

import SeriesPage from '../components/SeiresPage';
import Movies from '../components/Movies';
import App from '../App'




export default () => 
  (
    <BrowserRouter>
    <Switch>
     
    <Route path="/" component={App} exact></Route>
    <Route path="/SeriesPage" render={props => <SeriesPage {...props}></SeriesPage>}></Route>
    <Route path="/Movies" render={props => <Movies {...props}></Movies>}></Route>
    </Switch>


    </BrowserRouter>
  );
