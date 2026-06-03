import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
    Code2,
    ArrowLeftRight,
    Wand2,
    Languages,
    X,
    Copy,
    ChevronDown,
} from "lucide-react";
import { Editor } from "@monaco-editor/react";
import "../css/app.css";

const LANGUAGES = [
    { label: "PHP", value: "php", monaco: "php" },
    { label: "Python", value: "python", monaco: "python" },
];

const Beautify = () => {
    const [sourceCode, setSourceCode] = useState("");
    const [resultCode, setResultCode] = useState("");
    const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [langOpen, setLangOpen] = useState(false);

    const handleCopy = async (code) => {
        if (!code) return;
        await navigator.clipboard.writeText(code);
    };

    const handleBeautify = async () => {
        if (!sourceCode.trim()) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/beautify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: sourceCode,
                    lang: selectedLang.value,
                }),
            });
            if (res.ok) {
                const data = await res.json();
                setResultCode(data.result);
            } else {
                const data = await res.json().catch(() => ({}));
                setError(
                    data.error || "Something went wrong. Please try again.",
                );
                setResultCode("");
            }
        } catch (e) {
            setError("Network error. Please try again.");
            setResultCode("");
        } finally {
            setLoading(false);
        }
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
                                <a
                                    href="/"
                                    className="flex items-center gap-4 text-slate-500 hover:bg-slate-50 px-5 py-3.5 rounded-[1.25rem] font-bold transition-all hover:text-slate-800"
                                >
                                    <Languages size={22} />
                                    <span className="text-[13px] tracking-wide">
                                        TRANSLATE
                                    </span>
                                </a>
                                <a
                                    href="/compare"
                                    className="flex items-center gap-4 text-slate-500 hover:bg-slate-50 px-5 py-3.5 rounded-[1.25rem] font-bold transition-all hover:text-slate-800"
                                >
                                    <ArrowLeftRight size={22} />
                                    <span className="text-[13px] tracking-wide">
                                        COMPARE
                                    </span>
                                </a>
                                <button className="flex items-center gap-4 bg-[#3b82f6] text-white px-5 py-3.5 rounded-[1.25rem] font-bold shadow-[0_8px_20px_-6px_rgba(59,130,246,0.6)] transition-all active:scale-95">
                                    <Wand2 size={22} />
                                    <span className="text-[13px] tracking-wide">
                                        BEAUTIFY
                                    </span>
                                </button>
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
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
                            BEAUTIFY
                        </h1>
                        <button
                            onClick={handleBeautify}
                            disabled={loading}
                            className="flex items-center gap-2 bg-[#3b82f6] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-[0_8px_20px_-6px_rgba(59,130,246,0.6)] hover:bg-blue-600 transition-all active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <Wand2 size={16} />
                            {loading ? "PROCESSING..." : "RUN BEAUTIFY"}
                        </button>
                    </div>

                    {/* Language Selector */}
                    <div className="flex items-center gap-3 mb-5">
                        <span className="text-xs font-bold text-slate-500 tracking-widest">
                            LANGUAGE
                        </span>
                        <div className="relative">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-5 py-2 font-bold text-sm text-slate-800 shadow-sm hover:border-blue-400 transition-all"
                            >
                                {selectedLang.label}
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform ${langOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {langOpen && (
                                <div className="absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-lg z-20 overflow-hidden min-w-[120px]">
                                    {LANGUAGES.map((lang) => (
                                        <button
                                            key={lang.value}
                                            onClick={() => {
                                                setSelectedLang(lang);
                                                setLangOpen(false);
                                            }}
                                            className={`w-full text-left px-5 py-3 text-sm font-bold transition-colors hover:bg-blue-50 hover:text-blue-600 ${selectedLang.value === lang.value ? "text-blue-600 bg-blue-50" : "text-slate-700"}`}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 px-5 py-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-semibold">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-1 gap-6">
                        {/* Input Block */}
                        <div className="flex-1 bg-white rounded-[2rem] p-2 flex flex-col border border-slate-200/60 shadow-sm overflow-hidden min-h-[500px]">
                            <div className="flex justify-between items-center mb-2 px-4 py-3 border-b border-slate-100">
                                <span className="text-[13px] font-bold text-slate-800">
                                    SOURCE_CODE
                                </span>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold text-slate-500 border border-slate-200 rounded-full px-3 py-1">
                                        {selectedLang.label.toUpperCase()}
                                    </span>
                                    <button
                                        onClick={() => setSourceCode("")}
                                        className="text-slate-400 hover:text-slate-800 transition-colors"
                                    ></button>
                                </div>
                            </div>

                            <div className="flex-1 py-2">
                                <Editor
                                    height="100%"
                                    language={selectedLang.monaco}
                                    value={sourceCode}
                                    onChange={(value) => setSourceCode(value)}
                                    options={{
                                        fontSize: 14,
                                        fontFamily:
                                            "var(--font-sans), monospace",
                                        minimap: { enabled: false },
                                        lineNumbersMinChars: 3,
                                        scrollBeyondLastLine: false,
                                        roundedSelection: false,
                                        padding: { top: 16 },
                                        renderLineHighlight: "none",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Output Block */}
                        <div className="flex-1 bg-white rounded-[2rem] p-2 flex flex-col border border-slate-200/60 shadow-sm overflow-hidden min-h-[500px]">
                            <div className="flex justify-between items-center mb-2 px-4 py-3 border-b border-slate-100">
                                <span className="text-[13px] font-bold text-slate-800">
                                    BEAUTIFIED_CODE
                                </span>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold text-slate-500 border border-slate-200 rounded-full px-3 py-1">
                                        {selectedLang.label.toUpperCase()}
                                    </span>
                                    <button
                                        onClick={() => handleCopy(resultCode)}
                                        className="text-slate-400 hover:text-slate-800 transition-colors"
                                    >
                                        <Copy size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 py-2">
                                <Editor
                                    height="100%"
                                    language={selectedLang.monaco}
                                    value={resultCode}
                                    options={{
                                        fontSize: 14,
                                        fontFamily:
                                            "var(--font-sans), monospace",
                                        minimap: { enabled: false },
                                        lineNumbersMinChars: 3,
                                        readOnly: true,
                                        scrollBeyondLastLine: false,
                                        padding: { top: 16 },
                                        renderLineHighlight: "none",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById("app"));
root.render(<Beautify />);
