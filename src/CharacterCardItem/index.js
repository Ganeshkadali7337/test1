import "./index.css";

const CharacterCardItem = (props) => {
  const { item, onClickDetails } = props;
  const { name, gender } = item;

  const clickedDetails = () => {
    onClickDetails(item);
  };

  return (
    <li className="list-item">
      <h1 className="name">{name}</h1>
      <p className="para">Gender: {gender}</p>
      <button onClick={clickedDetails} className="details-button">
        More Details
      </button>
    </li>
  );
};

export default CharacterCardItem;
