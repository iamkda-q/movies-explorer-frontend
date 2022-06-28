import "./More.css";

function More({ handleClick }) {
    return (
        <section className="more">
            <button
                className="more__button app__link-button-type"
                type="button"
                onClick={handleClick}
            >
                Ещё
            </button>
        </section>
    );
}

export default More;
