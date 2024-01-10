// Import necessary modules from React and React Router
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import your components/pages
import Home from "./pages/Home";
import About from "./pages/About";
import Admission from "./pages/Admission";
import Login from "./pages/Login";
import { AuthProvider } from './AuthContext';
import StudentIdentity from "./pages/forms/StudentIdentity";
import StudentRegistration from "./pages/forms/StudentRegistration";
import PreviousSchool from "./pages/forms/PreviousSchool";
import SubmitDocuments from "./pages/forms/documents";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/admission" exact component={Admission} />
          <Route path="/studentidentity" exact component={StudentIdentity} />
          <Route path="/studentregistration" exact component={StudentRegistration} />
          <Route path="/previousschool" exact component={PreviousSchool} />
          <Route path="/documents" exact component={SubmitDocuments} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
