import React from 'react';
import {BrowserRouter, Route ,Switch,Link} from 'react-router-dom'

import SeriesPage from '../components/SeiresPage';
import Cards from '../components/Card'
import App from '../App'




export default () => 
  (
    <BrowserRouter>
    <Switch>
     
    <Route path="/" component={App} exact></Route>
    <Route path="/SeriesPage" render={props => <SeriesPage {...props}></SeriesPage>}></Route>
    </Switch>


    </BrowserRouter>
  );
