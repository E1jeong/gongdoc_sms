import "./App.css";
import Form from "./Form";

function App() {
  return (
    <div className="container">
      <h1>경기 종합 중기㈜</h1>
      <p className="highlight">30만원을 드립니다</p>
      <p>
        경기 종합 중기㈜를 소개하는 차주 분들께 <br />
        소개비를 드립니다.
      </p>
      <Form />
    </div>
  );
}

export default App;
