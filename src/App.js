import React from 'react';
import Routes from './routes';
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import MainLayout from './layouts/MainLayout'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={Routes.LOGIN} exact>
            <Login />
          </Route>
          <MainLayout>
            <Route path='/dashboard' exact component={Dashboard} />
            <Route path='/projects' exact component={Projects}/>
            <Route path='/tasks' exact component={Tasks} />
          </MainLayout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
