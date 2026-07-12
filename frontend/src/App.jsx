import { useEffect, useState } from "react";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Notification from "./components/Notification";
import FloatingText from "./components/FloatingText";
import Starfield from "./components/Starfield";
import QuizModal from "./components/QuizModal";
import TipPopup from "./components/TipPopup";
import tips from "./data/tips";
import upgrades from "./data/upgrades";

import "./styles/App.css";
import "./styles/Notification.css";
import "./styles/Animations.css";
import "./styles/Starfield.css";
import "./styles/Quiz.css";

const API = "https://time-clikcer-java-xvoe.onrender.com/game";

function App() {

    const [player, setPlayer] = useState({
        points: 0,
        clickPower: 1,
        passiveIncome: 0,
        upgradeCost: 10,
        passiveCost: 25,
        quizReward: 100
    });

    const [notification, setNotification] = useState("");
    const [floating, setFloating] = useState([]);
    const [currentTip, setCurrentTip] = useState("");
    const [quizOpen, setQuizOpen] = useState(false);

    async function loadState() {
        const r = await fetch(API + "/state");
        const d = await r.json();
        setPlayer(d);
    }

    useEffect(() => {
        loadState();
    }, []);

    useEffect(() => {

        const timer = setInterval(async () => {

            const r = await fetch(API + "/tick", {
                method: "POST"
            });

            const d = await r.json();
            setPlayer(d);

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    useEffect(() => {

        function randomTip() {
            const random = tips[Math.floor(Math.random() * tips.length)];
            setCurrentTip(random);
        }

        randomTip();

        const interval = setInterval(randomTip, 120000);

        return () => clearInterval(interval);

    }, []);

    async function study(e) {

        const r = await fetch(API + "/click", {
            method: "POST"
        });

        const d = await r.json();

        setPlayer(d);

        const id = Date.now();

        setFloating(f => [
            ...f,
            {
                id,
                x: e.clientX,
                y: e.clientY,
                text: "+" + d.clickPower
            }
        ]);

        setTimeout(() => {
            setFloating(f => f.filter(a => a.id !== id));
        }, 1000);

    }

    async function buyUpgrade() {

        const r = await fetch(API + "/upgrade", {
            method: "POST"
        });

        const d = await r.json();

        setPlayer(d);

        setNotification("📖 Click Power Increased!");

        setTimeout(() => setNotification(""), 2000);

    }

    async function buyPassive() {

        const r = await fetch(API + "/passive", {
            method: "POST"
        });

        const d = await r.json();

        setPlayer(d);

        setNotification("🤖 Passive Income Increased!");

        setTimeout(() => setNotification(""), 2000);

    }

    async function rewardPlayer(reward) {

        const r = await fetch(API + "/reward?reward=" + reward, {
            method: "POST"
        });

        const d = await r.json();

        setPlayer(d);

        setNotification(`🎉 Correct! +${reward} Grammar Points`);

        setTimeout(() => setNotification(""), 2000);

    }
    return (

        <>
            <Starfield />

            <div className="app">

                <Header />

                <Dashboard
                    points={player.points}
                    clickPower={player.clickPower}
                    passiveIncome={player.passiveIncome}
                    reward={player.quizReward}
                />

                <div className="mainButtonContainer">

                    <button
                        className="studyButton"
                        onClick={study}
                    >
                        ⏰
                        <br />
                        STUDY FUTURE TENSE
                    </button>

                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        flexWrap: "wrap",
                        marginTop: "40px"
                    }}
                >

                    <button
                        className="studyButton"
                        style={{
                            width: "250px",
                            height: "120px",
                            fontSize: "20px"
                        }}
                        onClick={buyUpgrade}
                    >
                        {upgrades[0].name}
                        <br />
                        Cost: {player.upgradeCost}
                    </button>

                    <button
                        className="studyButton"
                        style={{
                            width: "250px",
                            height: "120px",
                            fontSize: "20px"
                        }}
                        onClick={buyPassive}
                    >
                        {upgrades[1].name}
                        <br />
                        Cost: {player.passiveCost}
                    </button>

                    <button
                        className="studyButton"
                        style={{
                            width: "250px",
                            height: "120px",
                            fontSize: "20px",
                            background: "linear-gradient(135deg,#ff9800,#ff5722)"
                        }}
                        onClick={() => setQuizOpen(true)}
                    >
                        🧠
                        <br />
                        Grammar Quiz
                    </button>

                </div>

                <div
                    style={{
                        marginTop: "50px",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <div
                        style={{
                            maxWidth: "700px",
                            width: "100%",
                            background: "rgba(255,255,255,.08)",
                            borderRadius: "20px",
                            padding: "20px",
                            backdropFilter: "blur(12px)",
                            textAlign: "center",
                            fontSize: "20px"
                        }}
                    >
                        💡 <b>Grammar Tip</b>

                        <br /><br />

                        <TipPopup tip={currentTip} />
                    </div>
                </div>

                <Notification message={notification} />

                {floating.map(f => (
                    <FloatingText
                        key={f.id}
                        x={f.x}
                        y={f.y}
                        text={f.text}
                    />
                ))}

                <QuizModal
                    open={quizOpen}
                    onClose={() => setQuizOpen(false)}
                    onCorrect={rewardPlayer}
                />

            </div>
        </>

    );

}

export default App;