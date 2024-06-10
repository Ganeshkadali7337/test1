import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
export default App;
