import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Main } from './main';
import { ViewEntry } from './view-entry';
import { AppBar, CssBaseline, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Auth } from './auth';
import Helmet from 'react-helmet';
export const App = () => {

  return (
    <>
      <Helmet>
        <meta name="og:image" content="https://i.imgur.com/fmlXMxb.png" />
      </Helmet>
      <Auth/>
      <CssBaseline/>
      <AppBar position="static" style={{ margin: 0 }}>
        <Toolbar>
          <Typography variant="h6">
            Mock Draft
          </Typography>
        </Toolbar>
      </AppBar>

      <Router>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/e/:id" component={ViewEntry}/>
        </Switch>
      </Router>
    </>
  );
};

export default App;
