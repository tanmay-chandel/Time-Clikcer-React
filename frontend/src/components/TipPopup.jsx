import "../styles/TipPopup.css";

function TipPopup({ tip }) {

    return (
        <div className="tipPopup">
            <h3>💡 Grammar Tip</h3>
            <p>{tip}</p>
        </div>
    );

}

export default TipPopup;