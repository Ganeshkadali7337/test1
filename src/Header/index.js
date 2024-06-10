import { withRouter } from "react-router-dom";

import "./index.css";

const Header = (props) => {
  const onClickLogout = () => {
    sessionStorage.removeItem("jwtToken");
    const { history } = props;
    history.replace("/login");
  };
  return (
    <div className="nav-container">
      <p className="logo">StarWars characters</p>
      <div className="log-container">
        <button className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default withRouter(Header);
