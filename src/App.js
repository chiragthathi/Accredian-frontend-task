import './App.css';
import React from 'react';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignupForm';
import ForgetPassword from './components/ForgetPassword';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginForm />
          </Route>
          <Route exact path="/signup">
            <SignUpForm />
          </Route>
          <Route exact path="/ForgetPassword">
            <ForgetPassword/>
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
