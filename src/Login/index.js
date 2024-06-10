import { Component } from "react";

class Login extends Component {
  clicked = () => {
    const { history } = this.props;
    history.replace("/home");
  };
  render() {
    return (
      <div>
        <button onClick={this.clicked}>login</button>
      </div>
    );
  }
}

export default Login;
