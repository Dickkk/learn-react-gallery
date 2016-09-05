require('normalize.css/normalize.css');
require('styles/App.css');
//import TodoApp from 'index/TodoApp';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import reactplugin from 'react-tap-event-plugin';

import {Router,Link,IndexRedirect,Route,browserHistory,IndexRoute } from 'react-router';
var HomePage = require('./index/home'),
  AppPage=require('./index/app'),
  AboutPage=require('./index/about'),
InPage=require('./index/inpage'),
FnPage=require('./index/fnpage'),
LnPage=require('./index/lnpage');
import  depage from 'components/index/depage'
var DePage=depage.DePage,
  DeMain=depage.DeMain,
  DeDetail=depage.DeDetail;
import debase from 'components/DEcomponent/debase';
import derate from 'components/DEcomponent/derate';


function handleTouchTap () {
  alert('touch');
}
reactplugin();
class AppComponent extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Router history={browserHistory}>
            <Route path="/" component={AppPage}>
              <IndexRoute component={HomePage}/>
              <Route path="home" component={HomePage}/>
              <Route path="about" component={AboutPage}/>
              <Route path="inpage" component={InPage}/>
              <Route path="depage" component={DePage}>
                  <IndexRoute component={DeMain}/>
                  <Route path="prdts" component={DeMain}></Route>
                  <Route path="prdt/:prdt_no" component={DeDetail}>
                    <IndexRoute component={debase}/>
                    <Route path="base" component={debase}></Route>
                    <Route path="rate" component={derate}></Route>
                  </Route>
              </Route>
              <Route path="lnpage" component={InPage}/>
              <Route path="fnpage" component={FnPage}/>
            </Route>
          </Router>
        </div>
      </MuiThemeProvider>

    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
