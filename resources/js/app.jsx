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
    const [sourceCode, setSourceCode] = useState("");
    const [resultCode, setResultCode] = useState("");
    const [sourceLang, setSourceLang] = useState("");
    const [targetLang, setTargetLang] = useState("");
    const click = async () => {
        if (!sourceLang || !targetLang) {
            alert("Please select languages");
            return;
        }
        const res = await fetch("/api/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: sourceCode,
                source_code_lang: sourceLang,
                selected_lang: targetLang,
            }),
        });
        const data = await res.json();
        setResultCode(data.value);
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
                    <textarea
                        className="min-w-100 rounded-3xl border border-gray-200"
                        value={sourceCode}
                        onChange={(e) => setSourceCode(e.target.value)}
                        placeholder="Paste function here..."
                    />
                </div>

                <div>
                    <SelectLang value={targetLang} onChange={setTargetLang} />
                    <textarea
                        className="min-w-100 rounded-3xl border border-gray-200"
                        value={resultCode}
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<Translate />);
