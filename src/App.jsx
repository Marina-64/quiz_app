import { useState } from "react";
import "./App.css";

function App() {
  // 現在の問題数
  const [number, setNumber] = useState(0);
  // 回答フィードバック画面の表示
  const [next, setNext] = useState(false);
  // ユーザーの回答履歴
  const [answers, setAnswers] = useState([]);
  // ユーザーのスコア
  const [score, setScore] = useState(0);
  // フィードバックでの⚪︎×表示
  const [feedback, setFeedback] = useState(null);
  // スコアの表示
  const [showScore, setShowScore] = useState(false);
  // クイズの開始状態
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  // クリックイベントでの関数。
  // 引数itemがhandleAnswerの中でanswerという名前で受け取られる。
  // answerという引数名でitemの値が使われる。
  const handleAnswer = (answer) => {
    const newAnswer = {
      question: quizDate[number].question,
      answer: answer,
      correct: answer === quizDate[number].correct,
    };

    // console.log(newAnswer);

    // 正解していた場合
    if (newAnswer.correct) {
      // setScore(score + 1);
      setScore((prevScore) => prevScore + 1);
      setFeedback("⚪︎");
    } else {
      // 不正解の場合
      setFeedback("×");
    }

    // 回答履歴を追加
    setAnswers([...answers, newAnswer]);
    // console.log(answers);
    // スプレッド構文で中身を展開している。
    // newAnswerがオブジェクトとして追加され、配列になる。
    // [{}, {}, {}];

    setNext(true);
  };

  // const goToNextQestion = () => {
  //   // 次の問題がある場合
  //   if (number + 1 < quizDate.length) {
  //     setNumber(number + 1);
  //   }
  // };

  const goToNextQestion = () => {
    const nextQuestion = number + 1;
    // 次の問題がある場合
    if (nextQuestion < quizDate.length) {
      setNumber(nextQuestion);
    } else {
      // 次の問題がない場合
      setShowScore(true);
    }
    // 次の画面に遷移した後、選択肢画面を表示させて、
    // フィードバック画面を閉じたい
    // これがないとずっとフィードバック画面のままになってしまう！
    setNext(false);
  };

  return (
    <div className="quiz-container">
      {quizStarted ? (
        showScore ? (
          <div className="score-section">
            <h1>きみの得点は…</h1>
            <h2>
              {score} / {quizDate.length} だったよ！
            </h2>
            <table className="answer-table">
              <thead>
                <tr>
                  <td>質問</td>
                  <td>きみの解答</td>
                  <td>結果</td>
                </tr>
              </thead>
              <tbody>
                {answers.map((item, index) => (
                  <tr
                    key={index}
                    className={item.correct ? "correct" : "wrong"}
                  >
                    <td>{item.question}</td>
                    <td>{item.answer}</td>
                    <td>{item.correct ? "⚪︎" : "×"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="question-section">
            <h1>
              問題 {number + 1} / {quizDate.length}
            </h1>
            <h2>{quizDate[number].question}</h2>

            {next ? (
              <div className="feedback-section">
                <h2 className="large-feedback">{feedback}</h2>
                <p>解答</p>
                <p>{quizDate[number].correct}</p>
                <p>{quizDate[number].explanation}</p>
                <button onClick={goToNextQestion}>次の問題へ</button>
              </div>
            ) : (
              <div className="answer-section">
                {quizDate[number].options.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(item)}
                    className={`quiz-option-button option-${index}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      ) : (
        <div className="start-section">
          <h1>SDGsクイズ</h1>
          <button onClick={handleStartQuiz}>スタート！</button>
        </div>
      )}
    </div>
  );
}

const quizDate = [
  {
    question:
      "水を出しっぱなしにすると、1分間でどれくらいの水が流れるか知ってる？",
    options: [
      "A.コップ1杯分",
      "B.ペットボトル1本分",
      "C.バケツ1杯分",
      "D.水槽1つ分",
    ],
    correct: "C.バケツ1杯分",
    explanation:
      "水を出しっぱなしにすると、1分間で約12リットルもの水が流れてしまうんだ。これは、バケツ1杯分と同じくらいの量だよ。だから、歯を磨くときや手を洗うときは、水をこまめに止めることが大切だよ。",
  },
  {
    question:
      "日本では、一日にどれくらいのペットボトルが使われているか知ってる？",
    options: ["A. 100万本", "B. 500万本", "C. 1,000万本", "D. 2,000万本"],
    correct: "D. 2,000万本",
    explanation:
      "日本では、一日に約2,000万本ものペットボトルが使われているんだ。これをリサイクルすることや、マイボトルを使うことでゴミを減らすことができるよ。",
  },
  {
    question: "日本では、1年間にどれくらいの食べ物が捨てられているか知ってる？",
    options: [
      "A. バス10台分",
      "B. バス50台分",
      "C. バス80台分",
      "D. バス100台分",
    ],
    correct: "D. バス100台分",
    explanation:
      "日本では、1年間にバス約100台分の食べ物が捨てられているんだ。これはとても大きな量だから、必要な分だけを買って、食べ物を大切にすることが大事だね。",
  },
  {
    question: "家庭で、1時間にどれくらいの電気が使われているか知ってる？",
    options: [
      "A. テレビ1時間分",
      "B. エアコン1時間分",
      "C. 冷蔵庫1時間分",
      "D. 電子レンジ1時間分",
    ],
    correct: "B. エアコン1時間分",
    explanation:
      "家庭では、エアコンを1時間使うのと同じくらいの電気が使われているんだ。電気を大切に使うためには、使っていない家電の電源を切ったり、省エネモードを活用したりすることが大切だよ。節電方法を調べてみよう！",
  },
  {
    question: "世界には、安全な水が手に入らない人がどれくらいいるか知ってる？",
    options: ["A. 1万人", "B. 10万人", "C. 5億人", "D. 20億人"],
    correct: "D. 20億人",
    explanation:
      "世界では、約20億人もの人が、安全な水を手に入れることができないんだ。だから、私たちが水を大切に使うことが、地球全体の水を守ることにつながるんだよ。",
  },
];

export default App;
