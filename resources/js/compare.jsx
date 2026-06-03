import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Code2, ArrowLeftRight, Wand2, Trash2, Languages } from 'lucide-react';
import { Editor, DiffEditor } from "@monaco-editor/react";
import "../css/app.css";

function Compare() {
    const [firstCode, setFirstCode] = useState("");
    const [secondCode, setSecondCode] = useState("");
    const [showDiff, setShowDiff] = useState(false);

    const PLACEHOLDER_LEFT = "Tulis atau tempel kode di sini...";
    const PLACEHOLDER_RIGHT = "Tulis atau tempel kode di sini...";

    const handleDelete = () => {
        setFirstCode("");
        setSecondCode("");
        setShowDiff(false);
    };

    const isCodeLike = (text) => {
        const syntaxPattern =
            /[{}();=<>\[\]+\-*/]|=>|==|!=|<=|>=|\b(if|else|for|while|return|public|private)\b/;
        return syntaxPattern.test(text);
    };

    const handleCompare = () => {
        if (!isCodeLike(firstCode) || !isCodeLike(secondCode)) {
            alert("Please input valid source code");
            return;
        }
        setShowDiff(true);
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

                                <button className="flex items-center gap-4 bg-[#3b82f6] text-white px-5 py-3.5 rounded-[1.25rem] font-bold shadow-[0_8px_20px_-6px_rgba(59,130,246,0.6)] transition-all text-left">
                                    <ArrowLeftRight size={22} />
                                    <span className="text-[13px] tracking-wide">
                                        COMPARE
                                    </span>
                                </button>

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
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
                            COMPARE
                        </h1>
                        <button
                            onClick={handleCompare}
                            className="flex items-center gap-2 bg-[#3b82f6] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-[0_8px_20px_-6px_rgba(59,130,246,0.6)] hover:bg-blue-600 transition-all active:scale-95 cursor-pointer"
                        >
                            <ArrowLeftRight size={16} />
                            RUN COMPARISON
                        </button>
                    </div>

                    {!showDiff ? (
                        <div key={`input-mode-${showDiff}`} className="flex flex-1 gap-6">
                            {/* Input Block 1 */}
                            <div className="flex-1 bg-white rounded-[2rem] p-2 flex flex-col border border-slate-200/60 shadow-sm overflow-hidden min-h-[500px]">
                                <div className="flex justify-between items-center mb-2 px-4 py-3 border-b border-slate-100">
                                    <span className="text-[13px] font-bold text-slate-800">
                                        SOURCE_CODE
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setFirstCode("")} className="hover:text-slate-900 transition-colors cursor-pointer"><Trash2 size={18} /></button>
                                    </div>
                                </div>

                                <div className="flex-1 py-2 relative">
                                    {!firstCode && (
                                        <div className="absolute top-4 left-12 right-4 text-slate-400 font-mono text-sm pointer-events-none select-none z-10">
                                            {PLACEHOLDER_LEFT}
                                        </div>
                                    )}
                                    <Editor
                                        height="100%"
                                        value={firstCode}
                                        onChange={(value) => setFirstCode(value || "")}
                                        options={{
                                            fontSize: 14,
                                            fontFamily: "var(--font-sans), monospace",
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

                            {/* Input Block 2 */}
                            <div className="flex-1 bg-white rounded-[2rem] p-2 flex flex-col border border-slate-200/60 shadow-sm overflow-hidden min-h-[500px]">
                                <div className="flex justify-between items-center mb-2 px-4 py-3 border-b border-slate-100">
                                    <span className="text-[13px] font-bold text-slate-800">
                                        MODIFIED_CODE
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setSecondCode("")} className="hover:text-slate-900 transition-colors cursor-pointer"><Trash2 size={18} /></button>
                                    </div>
                                </div>

                                <div className="flex-1 py-2 relative">
                                    {!secondCode && (
                                        <div className="absolute top-4 left-12 right-4 text-slate-400 font-mono text-sm pointer-events-none select-none z-10">
                                            {PLACEHOLDER_RIGHT}
                                        </div>
                                    )}
                                    <Editor
                                        height="100%"
                                        value={secondCode}
                                        onChange={(value) => setSecondCode(value || "")}
                                        options={{
                                            fontSize: 14,
                                            fontFamily: "var(--font-sans), monospace",
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
                        </div>

                    ) : (

                        <div className="flex-1 flex gap-6 w-full rounded-[2rem] overflow-hidden">
                            <div className="w-full bg-white border border-slate-200/60 shadow-sm p-4 rounded-[2rem] flex flex-col">
                                <div className="flex gap-6 mb-4 pb-3 border-b border-slate-100 w-full">
                                    <div className="flex-1 flex justify-between items-center px-2">
                                        <span className="text-[13px] font-bold text-slate-800">SOURCE_CODE</span>
                                        <button 
                                            onClick={() => { setFirstCode(""); setShowDiff(false); }}  
                                            className="text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="flex-1 flex justify-between items-center px-2">
                                        <span className="text-[13px] font-bold text-slate-800">MODIFIED_CODE</span>
                                        <button 
                                            onClick={() => { setSecondCode(""); setShowDiff(false);}} 
                                            className="text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                                                            
                                <div className="flex-1 min-h-[450px]">
                                    <DiffEditor
                                        height="100%"
                                        original={firstCode}
                                        modified={secondCode}
                                        options={{
                                            fontSize: 14,
                                            fontFamily: "var(--font-sans), monospace",
                                            minimap: { enabled: false },
                                            lineNumbersMinChars: 3,
                                            scrollBeyondLastLine: false,
                                            renderSideBySide: true,
                                            originalEditable: false,
                                            readOnly: false,
                                            domReadOnly: false,
                                            padding: { top: 8 }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<Compare />);