import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
    Code2,
    ArrowLeftRight,
    Wand2,
    Trash2,
    Copy,
    Play,
    ChevronDown,
    Languages,
} from "lucide-react";
import "../css/app.css";

const languages = [
    { value: "php", label: "PHP" },
    { value: "python", label: "Python" },
];

function SelectLang({ value, onChange }) {
    return (
        <div className="relative">
            <select
                className="appearance-none bg-white border-[1.5px] border-slate-300 rounded-full pl-5 pr-10 py-1.5 text-[13px] font-bold text-slate-900 shadow-sm hover:bg-slate-50 transition-colors outline-none cursor-pointer"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                        {lang.label}
                    </option>
                ))}
            </select>
            <ChevronDown
                size={14}
                strokeWidth={3}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-900 pointer-events-none"
            />
        </div>
    );
}

async function handleCopy(code) {
    if (!code) return;
    await navigator.clipboard.writeText(code);
}

const App = () => {
    const [sourceCode, setSourceCode] = useState("");
    const [resultCode, setResultCode] = useState("");
    const [sourceLang, setSourceLang] = useState("php");
    const [targetLang, setTargetLang] = useState("python");

    const click = async () => {
        if (!sourceLang || !targetLang || sourceLang === targetLang) {
            alert("Silakan pilih bahasa asal dan bahasa tujuan yang berbeda.");
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
        <div className="min-h-screen bg-[#f9fafb] p-6 font-sans text-slate-800 flex flex-col gap-6">
            {/* Header */}
            <header className="bg-white rounded-full border border-slate-200 px-8 py-4 flex items-center shadow-sm relative z-10">
                <div className="flex items-center gap-3 text-xl font-bold tracking-tight">
                    <div className="bg-blue-500 text-white p-1.5 rounded-lg flex items-center justify-center">
                        <Code2 size={22} strokeWidth={2.5} />
                    </div>
                    <span className="font-black text-slate-900 tracking-tighter">
                        SYNTAXTRANSLATE
                    </span>
                </div>
            </header>

            <div className="flex flex-1 gap-6 relative">
                {/* Sidebar */}
                <div className="w-[280px] flex flex-col h-full sticky top-6">
                    <aside className="bg-white rounded-[2rem] border border-slate-200 p-6 flex flex-col shadow-sm h-full min-h-[800px]">
                        <div>
                            <h2 className="text-xs font-bold text-slate-800 mb-6 tracking-widest pl-2">
                                WORKSPACE
                            </h2>
                            <nav className="flex flex-col gap-2">
                                <button className="flex items-center gap-4 bg-[#3b82f6] text-white px-5 py-3.5 rounded-[1.25rem] font-bold shadow-[0_8px_20px_-6px_rgba(59,130,246,0.6)] transition-all active:scale-95">
                                    <Languages size={22} />
                                    <span className="text-[13px] tracking-wide">
                                        TRANSLATE
                                    </span>
                                </button>
                                <a
                                    href="/compare"
                                    className="flex items-center gap-4 text-slate-500 hover:bg-slate-50 px-5 py-3.5 rounded-[1.25rem] font-bold transition-all hover:text-slate-800"
                                >
                                    <ArrowLeftRight size={22} />
                                    <span className="text-[13px] tracking-wide">
                                        COMPARE
                                    </span>
                                </a>
                                <a
                                    href="/beautify"
                                    className="flex items-center gap-4 text-slate-500 hover:bg-slate-50 px-5 py-3.5 rounded-[1.25rem] font-bold transition-all hover:text-slate-800"
                                >
                                    <Wand2 size={22} />
                                    <span className="text-[13px] tracking-wide">
                                        BEAUTIFY
                                    </span>
                                </a>
                            </nav>
                        </div>
                    </aside>

                    <div className="mt-8 text-[10px] font-bold text-slate-400 tracking-widest pl-8">
                        © 2026{" "}
                        <span className="text-slate-800">SYNTAXTRANSLATE</span>.
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-1 flex flex-col pb-8 min-w-0">
                    <div className="flex justify-between items-center mb-8 mt-2">
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">
                            TRANSLATE_SYNTAX
                        </h1>
                        <button
                            onClick={click}
                            className="flex items-center gap-2 bg-[#3b82f6] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-[0_8px_20px_-6px_rgba(59,130,246,0.6)] hover:bg-blue-600 transition-all active:scale-95 cursor-pointer"
                        >
                            <Play size={16} fill="currentColor" />
                            TRANSLATE
                        </button>
                    </div>

                    <div className="flex flex-1 gap-6">
                        {/* Input Block */}
                        <div className="flex-1 bg-[#f4f5f7] rounded-[2rem] p-5 flex flex-col border border-slate-200/60 shadow-sm">
                            <div className="flex justify-between items-center mb-4 px-3 mt-1">
                                <div className="flex items-center gap-3">
                                    <span className="text-[11px] font-bold text-slate-600 tracking-widest">
                                        INPUT_BLOCK
                                    </span>
                                    <SelectLang
                                        value={sourceLang}
                                        onChange={setSourceLang}
                                    />
                                </div>
                                <div className="flex gap-4 text-slate-500">
                                    <button
                                        onClick={() => setSourceCode("")}
                                        className="hover:text-slate-900 transition-colors cursor-pointer"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <textarea
                                className="w-full flex-1 bg-white rounded-[1.5rem] p-6 font-mono text-[13px] leading-[1.8] text-slate-700 shadow-sm min-h-[400px] outline-none border-none resize-none focus:ring-2 focus:ring-blue-100"
                                value={sourceCode}
                                onChange={(e) => setSourceCode(e.target.value)}
                                placeholder="Tulis atau tempel kode di sini..."
                            />

                            <div className="flex justify-between items-center mt-5 px-3 mb-1 text-[10px] font-bold text-slate-500 tracking-widest">
                                <span>{sourceLang.toUpperCase()}</span>
                                <span>CHARS: {sourceCode.length}</span>
                            </div>
                        </div>

                        {/* Output Block */}
                        <div className="flex-1 bg-[#f4f5f7] rounded-[2rem] p-5 flex flex-col border border-slate-200/60 shadow-sm">
                            <div className="flex justify-between items-center mb-4 px-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-[11px] font-bold text-slate-600 tracking-widest">
                                        OUTPUT_BLOCK
                                    </span>
                                    <SelectLang
                                        value={targetLang}
                                        onChange={setTargetLang}
                                    />
                                </div>
                                <div className="flex gap-4 text-slate-500">
                                    <button
                                        onClick={() => handleCopy(resultCode)}
                                        className="hover:text-slate-900 transition-colors cursor-pointer"
                                    >
                                        <Copy size={18} />
                                    </button>
                                </div>
                            </div>

                            <textarea
                                className="w-full flex-1 bg-white rounded-[1.5rem] p-6 font-mono text-[13px] leading-relaxed shadow-sm min-h-[400px] outline-none border-none resize-none"
                                value={resultCode}
                                readOnly
                                placeholder="Hasil terjemahan akan muncul di sini..."
                            />

                            <div className="flex justify-between items-center mt-5 px-3 mb-1 text-[10px] font-bold tracking-widest">
                                <span className="text-slate-500">
                                    {targetLang.toUpperCase()}
                                </span>
                                {resultCode && (
                                    <span className="flex items-center gap-1.5 text-emerald-600">
                                        <span className="text-[9px]">●</span>{" "}
                                        TRANSLATED_SUCCESSFULLY
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);
