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
            className="rounded-full border border-gray-200 px-3 py-2 cursor-pointer"
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

async function Copy(code) {
    await navigator.clipboard.writeText(code);
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
        <div className="w-screen p-8">
            <div className="w-full p-6 rounded-full bg-white border border-gray-200">
                <div className="flex items-center gap-3">
                    <img src="images/logo.png" alt="Logo" className="w-8 h-8" />
                    <p className="font-bold text-3xl">SYNTAXTRANSLATE</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] mt-8">
                <div className="w-xs p-6 flex flex-col rounded-3xl bg-white border border-gray-200">
                    <p className="font-bold text-2xl">WORKSPACE</p>
                    <nav className="flex items-center gap-3 rounded-full bg-blue-500 text-white px-4 py-2 mt-6">
                        <img
                            src="images/translate-icon-active.png"
                            alt="icon"
                            className="w-5 h-5 m-2"
                        />
                        <a href="/" className="">
                            TRANSLATE
                        </a>
                    </nav>
                    <nav className="flex items-center hover:bg-[#F3F8FF] gap-3 px-4 py-2">
                        <img
                            src="images/compare-icon.png"
                            alt="icon"
                            className="w-5 h-5 m-2"
                        />
                        <a href="/compare" className="hover:">
                            COMPARE
                        </a>
                    </nav>
                    <nav className="flex items-center hover:bg-[#F3F8FF] gap-3 px-4 py-2">
                        <img
                            src="images/beautify-icon.png"
                            alt="icon"
                            className="w-5 h-5 m-2"
                        />
                        <a href="/beautify" className="hover:">
                            BEAUTIFY
                        </a>
                    </nav>
                </div>

                <div className="">
                    <div className="flex justify-between items-center mb-8">
                        <p className="font-bold text-3xl">TRANSLATE_SYNTAX</p>
                        <button
                            className="rounded-full bg-blue-500 px-9 py-3 text-white hover:bg-blue-600 active:bg-blue-800 cursor-pointer"
                            onClick={click}
                        >
                            TRANSLATE
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2 rounded-3xl border border-gray-200">
                            <div className="flex justify-between items-center p-6">
                                <p className="font-bold text-xl">SOURCE_CODE</p>
                                <SelectLang
                                    value={sourceLang}
                                    onChange={setSourceLang}
                                />
                            </div>
                            <textarea
                                className="font-semibold text-lg w-full min-h-150 bg-white rounded-b-3xl border-t-1 border-gray-200 p-5"
                                value={sourceCode}
                                onChange={(e) => setSourceCode(e.target.value)}
                                placeholder="Paste function here..."
                            />
                        </div>

                        <div className="flex flex-col gap-2 rounded-3xl border border-gray-200">
                            <div className="flex justify-between items-center p-6">
                                <p className="font-bold text-xl">
                                    TRANSLATED_CODE
                                </p>
                                <div className="flex items-center gap-3">
                                    <SelectLang
                                        value={targetLang}
                                        onChange={setTargetLang}
                                    />
                                    <button
                                        className="rounded-full hover:bg-gray-200 active:scale-95 transition-transform duration-200 cursor-pointer"
                                        onClick={() => Copy(resultCode)}
                                    >
                                        <img
                                            src="images/copy-icon.png"
                                            alt="copy"
                                            className="w-5 h-5 m-2"
                                        />
                                    </button>
                                </div>
                            </div>
                            <textarea
                                className="font-semibold text-lg w-full min-h-150 bg-white rounded-b-3xl border-t-1 border-gray-200 p-5"
                                value={resultCode}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<Translate />);
