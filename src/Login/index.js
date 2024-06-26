import { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./index.css";

class Login extends Component {
  state = {
    isLoading: false,
    gmail: "",
    password: "",
    Msg: "",
  };

  //take the details of the user from state and send it to the signin api to login the user
  loginUser = async () => {
    const { gmail, password } = this.state;
    const { history } = this.props;
    const userDetails = {
      gmail,
      password,
    };
    await axios
      .post(
        "https://mobile-first-assignment-backend.onrender.com/signin",
        userDetails
      )
      .then(async (res) => {
        this.setState({
          isLoading: false,
          Msg: `Login successfull`,
          gmail: "",
          password: "",
        });
        let token = await res.data.token;
        sessionStorage.setItem("jwtToken", token);
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          Msg: err.response.data,
          gmail: "",
          password: "",
        });
      });
  };

  //call the loginUser function to login the user, and show the loader while logging the user
  onSubmitForm = (e) => {
    e.preventDefault();
    const { gmail, password } = this.state;
    if ((gmail || password) === "") {
      this.setState({ Msg: "*enter correct details" });
    } else {
      this.setState({ isLoading: true, Msg: "" }, this.loginUser);
    }
  };

  //store the entered gmail in the state
  onChangegmail = (e) => {
    this.setState({ gmail: e.target.value });
  };

  //store the entered password in the state
  onChangePass = (e) => {
    this.setState({ password: e.target.value });
  };

  //navigate to signup page by handling the click event of register now button
  onClickReg = () => {
    const { history } = this.props;
    history.push("/signup");
  };

  render() {
    const { isLoading, gmail, password, Msg } = this.state;

    //if jwt token is there in session storage redirect to home page to restrict the user to access login route if he is already logged in
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div className="home-container">
        <h1>Login</h1>
        <div className="log-card-container">
          <form className="reg-card" onSubmit={this.onSubmitForm}>
            <label htmlFor="gmail">GMAIL:</label>
            <input
              id="gmail"
              type="text"
              placeholder="Enter your gmail"
              className="input-el"
              onChange={this.onChangegmail}
              value={gmail}
            />
            <label htmlFor="pass">PASSWORD:</label>
            <input
              id="pass"
              type="password"
              placeholder="Enter your password"
              className="input-el"
              onChange={this.onChangePass}
              value={password}
            />
            <p
              className={
                Msg.includes("successfull") ? "err-msg green" : "err-msg red"
              }
            >
              {Msg}
            </p>
            {isLoading ? (
              <TailSpin
                height="30"
                width="30"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              <button type="submit" className="log-button">
                Login
              </button>
            )}

            <p>New User?</p>
          </form>

          <button onClick={this.onClickReg} className="log-button">
            Register Now
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
