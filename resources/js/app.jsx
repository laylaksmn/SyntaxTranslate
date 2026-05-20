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
    const [sourceLang, setSourceLang] = useState("php");
    const [targetLang, setTargetLang] = useState("php");
    const click = async () => {
        if (!sourceLang || !targetLang || sourceLang === targetLang) {
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
        setResultCode(data.result);
    };
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center">
                <p className="font-bold text-3xl">TRANSLATE_SYNTAX</p>
                <button
                    className="mt-4 rounded-full bg-blue-500 px-9 py-3 text-white hover:bg-blue-600"
                    onClick={click}
                >
                    TRANSLATE
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex flex-col gap-2">
                    <p className="font-bold text-lg">SOURCE_CODE</p>
                    <SelectLang value={sourceLang} onChange={setSourceLang} />
                    <textarea
                        className="min-w-100 min-h-150 rounded-xl border border-gray-200 p-5"
                        value={sourceCode}
                        onChange={(e) => setSourceCode(e.target.value)}
                        placeholder="Paste function here..."
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="font-bold text-lg">TRANSLATED_CODE</p>
                    <SelectLang value={targetLang} onChange={setTargetLang} />
                    <textarea
                        className="min-w-100 min-h-150 rounded-xl border border-gray-200 p-5"
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
