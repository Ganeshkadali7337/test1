import { Component } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Header from "../Header";
import CharacterCardItem from "../CharacterCardItem";
import "./index.css";

class Home extends Component {
  state = {
    data: {},
    apiUrl: "https://mobile-first-assignment-backend.onrender.com/characters",
    isLoading: true,
    detailsModel: null,
  };
  getData = async () => {
    const { apiUrl } = this.state;
    const token = sessionStorage.getItem("jwtToken");

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        this.setState({ data: res.data, isLoading: false });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
        const { history } = this.props;
        sessionStorage.removeItem("jwtToken");
        history.replace("/login");
      });
  };
  componentDidMount() {
    this.getData();
  }

  onClickPrev = () => {
    const { data } = this.state;
    const url = data.previous;
    if (url) {
      this.setState({ apiUrl: url, isLoading: true }, this.getData);
    }
  };

  onClickNext = () => {
    const { data } = this.state;
    const url = data.next;
    if (url) {
      this.setState({ apiUrl: url, isLoading: true }, this.getData);
    }
  };

  onClickDetails = (details) => {
    this.setState({ detailsModel: details });
  };

  onClickBack = () => {
    this.setState({ detailsModel: null });
  };

  render() {
    const { isLoading, data, detailsModel } = this.state;
    const list = data.results;
    console.log(detailsModel);
    return (
      <div className="home-bg-container">
        <Header />
        {isLoading ? (
          <div className="spinner">
            <TailSpin
              height="60"
              width="60"
              color="black"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div className="characters-list-main-container">
            <ul className="list-container">
              {list.map((each) => (
                <CharacterCardItem
                  onClickDetails={this.onClickDetails}
                  key={each.url}
                  item={each}
                />
              ))}
            </ul>
            <div>
              {detailsModel && (
                <div className="modal-container">
                  <div className="modal-content-container">
                    <h1>Name: {detailsModel.name}</h1>
                    <p>Gender: {detailsModel.gender}</p>
                    <p>Height: {detailsModel.height}</p>
                    <p>Birth year: {detailsModel.birth_year}</p>
                    <p>Eye Color: {detailsModel.eye_color}</p>
                    <p>Skin color: {detailsModel.sink_color}</p>
                    <p>Mass: {detailsModel.mass}</p>
                    <button className="back-button" onClick={this.onClickBack}>
                      Go Back
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="page-button-container">
              <button className="page-button" onClick={this.onClickPrev}>
                Previous
              </button>
              <button className="page-button" onClick={this.onClickNext}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
