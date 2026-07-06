import { useEffect, useState } from "react";
import questions from "../data/questions";
import "../styles/Quiz.css";

function QuizModal({ open, onClose, onCorrect }) {

    const [question, setQuestion] = useState(null);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);

    useEffect(() => {

        if (open) {
            loadQuestion();
        }

    }, [open]);

    function loadQuestion() {

        const random =
            questions[Math.floor(Math.random() * questions.length)];

        setQuestion(random);
        setSelected(null);
        setAnswered(false);

    }

    function choose(index) {

        if (answered) return;

        setSelected(index);
        setAnswered(true);

        if (index === question.answer) {
            onCorrect();
        }

    }

    if (!open) return null;

    return (

        <div className="quizOverlay">

            <div className="quizModal">

                <h1>🧠 Grammar Quiz</h1>

                <p className="quizType">
                    {question?.tense}
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

                    <div className="quizButtons">

                        <button
                            className="nextButton"
                            onClick={loadQuestion}
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

                )}

            </div>

        </div>

    );

}

export default QuizModal;