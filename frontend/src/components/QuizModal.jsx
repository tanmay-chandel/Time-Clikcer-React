import { useEffect, useState } from "react";
import questions from "../data/questions";
import "../styles/Quiz.css";

function QuizModal({ open, onClose, onCorrect }) {

    const TOTAL_QUESTIONS = 30;

    const [question, setQuestion] = useState(null);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);

    const [usedQuestions, setUsedQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {

        if (open) {

            setFinished(false);
            setCurrentQuestion(1);
            setCorrectAnswers(0);
            setUsedQuestions([]);

            loadQuestion([]);

        }

    }, [open]);

    function loadQuestion(list = usedQuestions) {

        let available = questions.filter(q => !list.includes(q.id));

        if (available.length === 0) {
            setFinished(true);
            return;
        }

        const random =
            available[Math.floor(Math.random() * available.length)];

        setQuestion(random);
        setSelected(null);
        setAnswered(false);

        setUsedQuestions(prev => [...prev, random.id]);

    }

    function choose(index) {

        if (answered) return;

        setSelected(index);
        setAnswered(true);

        if (index === question.answer) {

            setCorrectAnswers(c => c + 1);

            onCorrect(question.reward);

        }

    }

    if (!open) return null;

    if (finished) {

        return (

            <div className="quizOverlay">

                <div className="quizModal">

                    <h1>🎉 Quiz Complete!</h1>

                    <h2>
                        {correctAnswers} / {TOTAL_QUESTIONS}
                    </h2>

                    <p
                        style={{
                            fontSize: "22px",
                            marginBottom: "20px"
                        }}
                    >
                        Accuracy: {Math.round(correctAnswers / TOTAL_QUESTIONS * 100)}%
                    </p>

                    <button
                        className="nextButton"
                        onClick={() => {

                            setFinished(false);
                            setCurrentQuestion(1);
                            setCorrectAnswers(0);
                            setUsedQuestions([]);

                            loadQuestion([]);

                        }}
                    >
                        🔄 Play Again
                    </button>

                    <br /><br />

                    <button
                        className="closeButton"
                        onClick={onClose}
                    >
                        Close
                    </button>

                </div>

            </div>

        );

    }

    return (

        <div className="quizOverlay">

            <div className="quizModal">

                <h1>🧠 Grammar Quiz</h1>

                <p
                    style={{
                        fontSize: "18px",
                        color: "#aaa",
                        marginBottom: "15px"
                    }}
                >
                    Question {currentQuestion} / {TOTAL_QUESTIONS}
                </p>

                <p className="quizType">
                    📚 {question?.topic}
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    ⭐ {question?.difficulty.toUpperCase()}
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    💰 +{question?.reward}
                </p>

                <h2>
                    {question?.question}
                </h2>

                <div className="options">

                    {question?.options.map((option, index) => (

                        <button

                            key={index}

                            className={
                                answered
                                    ? index === question.answer
                                        ? "correct"
                                        : index === selected
                                            ? "wrong"
                                            : ""
                                    : ""
                            }

                            onClick={() => choose(index)}

                        >

                            {option}

                        </button>

                    ))}

                </div>

                {answered && (

                    <>

                        <p
                            style={{
                                marginTop: "20px",
                                fontSize: "18px"
                            }}
                        >
                            💡 {question.explanation}
                        </p>

                        <div className="quizButtons">

                            <button
                                className="nextButton"
                                onClick={() => {

                                    if (currentQuestion >= TOTAL_QUESTIONS) {
                                        setFinished(true);
                                        return;
                                    }

                                    setCurrentQuestion(q => q + 1);

                                    loadQuestion();

                                }}
                            >
                                Next Question
                            </button>

                            <button
                                className="closeButton"
                                onClick={onClose}
                            >
                                Close
                            </button>

                        </div>

                    </>

                )}

            </div>

        </div>

    );

}

export default QuizModal;