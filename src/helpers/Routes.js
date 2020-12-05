import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../views/Home';
import Watchlist from '../views/Watchlist';
import Favorites from '../views/Favorites';
import SearchResults from '../views/SearchResults';
import NotFound from '../views/NotFound';

export default function Routes({ user }) {
  return (
    <Switch>
      <Route
        exact
        path='/'
        component={() => <Home user={user} />}
      />
      <PrivateRoute
        exact
        path='/watchlist'
        component={Watchlist}
        user={user}
      />
      <PrivateRoute
        exact
        path='/favorites'
        component={Favorites}
        user={user}
      />
      <Route
        exact
        path='/search/:term'
        component={(props) => <SearchResults {...props} /> }
      />
      <Route component={NotFound} />
    </Switch>
  );
}

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (taco) => (user
    ? (<Component {...taco} user={user} />)
    : (<Redirect to={ { pathname: '/', state: { from: taco.location } }} />));

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
