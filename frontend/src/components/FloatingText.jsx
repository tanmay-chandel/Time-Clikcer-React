import "../styles/Animations.css";

function FloatingText({ x, y, text }) {

    return (
        <div
            className="floatingText"
            style={{
                left: x,
                top: y
            }}
        >
            {text}
        </div>
    );

}

export default FloatingText;