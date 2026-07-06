import StatCard from "./StatCard";
import "../styles/Dashboard.css";

function Dashboard({

                       points,
                       clickPower,
                       passiveIncome,
                       reward

                   }) {

    return (

        <div className="dashboard">

            <StatCard
                icon="📚"
                title="Grammar Points"
                value={points}
            />

            <StatCard
                icon="⚡"
                title="Click Power"
                value={clickPower}
            />

            <StatCard
                icon="🤖"
                title="Passive Income"
                value={passiveIncome + "/sec"}
            />

            <StatCard
                icon="🧠"
                title="Quiz Reward"
                value={"+" + reward}
            />

        </div>

    );

}

export default Dashboard;