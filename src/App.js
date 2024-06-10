import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import ResetPassword from "./ResetPassword";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/reset-password/:token" component={ResetPassword} />
        <Redirect from="/" to="/home" />
      </Switch>
    </Router>
  );
};
export default App;
