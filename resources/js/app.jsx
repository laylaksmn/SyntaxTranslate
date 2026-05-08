import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css";

const languages = [
    { value: "php", label: "PHP" },
    { value: "python", label: "Python" },
];
function SelectLang({ value, onChange }) {
    return (
        <select
            className="rounded-md border px-3 py-2"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                    {lang.label}
                </option>
            ))}
        </select>
    );
}

function Translate() {
    const [val, setVal] = useState("");
    const [result, setResult] = useState("");
    const [sourceLang, setSourceLang] = useState("PHP");
    const [targetLang, setTargetLang] = useState("Python");
    const click = async () => {
        const res = await fetch("/api/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: val,
                source_code_lang: sourceLang,
                selected_lang: targetLang,
            }),
        });
        const data = await res.json();
        setResult(data.result);
    };
    return (
        <div className="">
            <button
                className="mt-4 rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={click}
            >
                TRANSLATE
            </button>

            <div>
                <div>
                    <SelectLang value={sourceLang} onChange={setSourceLang} />
                    <input
                        className="min-w-100 rounded-3xl border border-gray-200"
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        placeholder="Paste function here..."
                    />
                </div>

                <div>
                    <SelectLang value={targetLang} onChange={setTargetLang} />
                    <input
                        className="min-w-100 rounded-3xl border border-gray-200"
                        value={result}
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<Translate />);
