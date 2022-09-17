import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <>
      <Switch>
        <Route exact path={"/"}>
          <h2>Hello from App</h2>
        </Route>
        <Route path={"/login"}>
          <LoginFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;