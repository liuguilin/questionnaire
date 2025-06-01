import React from "react";
import "amfe-flexible";
import ReactDOM from "react-dom/client";
import { MorningQuestion } from "./component/MorningQuestion";
import { EveningQuestion } from "./component/EveningQuestion";
import "./styles/global.css";

const App: React.FC = () => {
  // 获取URL参数
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type");
  // 根据type参数渲染不同的问卷
  const renderQuestionnaire = () => {
    switch (type) {
      case "day":
        return <MorningQuestion />;
      case "night":
        return <EveningQuestion />;
      default:
        return <MorningQuestion />; // 默认显示早问卷
    }
  };

  return <div>{renderQuestionnaire()}</div>;
};

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
