// import "./bootstrap";
import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
    return <h1>React Berhasil Terpasang!</h1>;
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);
