import "../styles/Cards.css";

function StatCard({ icon, title, value }) {

    return (

        <div className="statCard">

            <div className="statIcon">
                {icon}
            </div>

            <div className="statTitle">
                {title}
            </div>

            <div className="statValue">
                {value}
            </div>

        </div>

    );

}

export default StatCard;