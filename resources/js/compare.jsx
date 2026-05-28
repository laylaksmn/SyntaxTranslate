import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Editor } from "@monaco-editor/react";
import { DiffEditor } from "@monaco-editor/react";

function Compare() {
    const [firstCode, setFirstCode] = useState("");
    const [secondCode, setSecondCode] = useState("");
    const [showDiff, setShowDiff] = useState(false);

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
                    <nav className="flex items-center hover:bg-[#F3F8FF] gap-3 px-4 py-2 mt-6">
                        <img
                            src="images/translate-icon.png"
                            alt="icon"
                            className="w-5 h-5 m-2"
                        />
                        <a href="/" className="hover:">
                            TRANSLATE
                        </a>
                    </nav>
                    <nav className="flex items-center gap-3 rounded-full bg-blue-500 text-white px-4 py-2">
                        <img
                            src="images/compare-icon-active.png"
                            alt="icon"
                            className="w-5 h-5 m-2"
                        />
                        <a href="/compare" className="">
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
                            onClick={handleCompare}
                        >
                            RUN COMPAREISON
                        </button>
                    </div>

                    {!showDiff ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                            <div className="rounded-3xl border border-gray-200 overflow-hidden bg-white">
                                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                    <p className="font-bold text-xl">SOURCE_CODE</p>
                                </div>

                                <Editor
                                    height="600px"
                                    value={firstCode}
                                    onChange={(value) => setFirstCode(value)}
                                    options={{
                                        fontSize: 18,
                                        fontFamily: "var(--font-sans)",
                                        minimap: { enabled: false },
                                        fontLigatures: true,
                                    }}
                                />
                            </div>
                    
                            <div className="rounded-3xl border border-gray-200 overflow-hidden bg-white">
                                <div className="p-6 border-b border-gray-200">
                                    <p className="font-bold text-xl">MODIFIED_CODE</p>
                                </div>
    
                                <Editor
                                    height="600px"
                                    value={secondCode}
                                    onChange={(value) => setSecondCode(value)}
                                    options={{
                                        fontSize: 18,
                                        fontFamily: "var(--font-sans)",
                                        minimap: { enabled: false },
                                        fontLigatures: true,
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-3xl overflow-hidden border border-gray-200">
                            <DiffEditor
                                height="600px"
                                original={firstCode}
                                modified={secondCode}
                                options={{
                                    fontSize: 18,
                                    fontFamily: "var(--font-sans)",
                                    minimap: { enabled: false },
                                    fontLigatures: true,
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<Compare />);
