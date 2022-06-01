import "./MainTitle.css"

function MainTitle({text, mrgBot}) {
  return (
    <h3 className="main__title" style={{marginBottom: mrgBot}}>{text}</h3>
  );
}

export default MainTitle;