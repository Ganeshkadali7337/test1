import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const token = sessionStorage.getItem("jwtToken");
  if (!token) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
