import "../styles/Starfield.css";

function Starfield() {
    const stars = [];

    for (let i = 0; i < 80; i++) {
        stars.push(
            <span
                key={i}
                className="star"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 5}s`,
                    width: `${2 + Math.random() * 3}px`,
                    height: `${2 + Math.random() * 3}px`,
                }}
            />
        );
    }

    return <div className="starfield">{stars}</div>;
}

export default Starfield;