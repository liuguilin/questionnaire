import "amfe-flexible";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { MorningQuestion } from "./component/MorningQuestion";
import "./styles/global.css";

export const App = () => {
    return <MorningQuestion />;
};

const container = document.getElementById("root");
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
}
