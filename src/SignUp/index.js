import { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./index.css";

class SignUp extends Component {
  state = {
    isLoading: false,
    gmail: "",
    password: "",
    confirmPassword: "",
    Msg: "",
  };

  //take the details of the user from state add the user to db
  addUserToDb = async () => {
    const { gmail, password, confirmPassword } = this.state;
    const userDetails = {
      gmail,
      password,
      confirmPassword,
    };
    await axios
      .post(
        "https://mobile-first-assignment-backend.onrender.com/signup",
        userDetails
      )
      .then((res) => {
        this.setState({
          isLoading: false,
          Msg: `${res.data} please Login `,
          gmail: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          Msg: err.response.data,
          gmail: "",
          password: "",
          confirmPassword: "",
        });
      });
  };

  //call the addUserToDb function to add a new user, and show the loader while adding the user to db
  onSubmitRegistrationForm = (e) => {
    e.preventDefault();
    const { userName, password, confirmPassword } = this.state;
    if ((userName || password || confirmPassword) === "") {
      this.setState({ Msg: "*enter correct details" });
    } else {
      this.setState({ isLoading: true, Msg: "" }, this.addUserToDb);
    }
  };

  //store the entered gmail in the state
  onChangeUserMail = (e) => {
    this.setState({ gmail: e.target.value });
  };

  //store the entered password in the state
  onChangePass = (e) => {
    this.setState({ password: e.target.value });
  };

  //store the entered confirm password in the state
  onChangeConf = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  //navigate to login page by handling the click event of login button after successfully registered
  onClickLog = () => {
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    const { isLoading, gmail, password, confirmPassword, Msg } = this.state;

    //if jwt token is there in session storage redirect to home page to restrict the user to access login route if he is already logged in
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div className="home-container">
        <h1>Sign Up</h1>
        <div className="log-card-container">
          <form className="reg-card" onSubmit={this.onSubmitRegistrationForm}>
            <label htmlFor="name">GMAIL:</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your gmail"
              className="input-el"
              onChange={this.onChangeUserMail}
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
            <label htmlFor="conf">CONFIRM PASSWORD:</label>
            <input
              id="conf"
              type="password"
              placeholder="Confirm your password"
              className="input-el"
              onChange={this.onChangeConf}
              value={confirmPassword}
            />
            <p
              className={
                Msg.includes("successfully") ? "err-msg green" : "err-msg red"
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
                Register
              </button>
            )}

            <p>Already Registered?</p>
          </form>

          <button onClick={this.onClickLog} className="log-button">
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default SignUp;
