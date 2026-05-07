// import "./bootstrap";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function Translate() {
    const [val, setVal] = useState("");
    const [result, setResult] = useState("");
    const change = (e) => {
        setVal(e.target.value);
    };
    const click = () => {
        setResult(val); //nnti konek ke API
    };
    return (
        <div className="Fields">
            <div className="InputField">
                <input
                    onChange={change}
                    value={val}
                    placeholder="Paste your function here..."
                />
                <button onClick={click}>Translate</button>
            </div>

            <div className="OutputField">
                <input value={result} readOnly />
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<Translate />);
