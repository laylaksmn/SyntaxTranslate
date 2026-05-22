import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { DiffEditor } from "@monaco-editor/react";

function Compare() {
    const [firstCode, setFirstCode] = useState("");
    const [secondCode, setSecondCode] = useState("");
    return (
        <div className="">
            <button
                className="mt-4 rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={click}
            >
                RUN COMPARISON
            </button>

            <div>
                <div>
                    <textarea
                        className="min-w-100 rounded-3xl border border-gray-200"
                        value={firstCode}
                        onChange={(e) => setFirstCode(e.target.value)}
                        placeholder="First code..."
                    />
                </div>
                <div>
                    <textarea
                        className="min-w-100 rounded-3xl border border-gray-200"
                        value={secondCode}
                        onChange={(e) => setSecondCode(e.target.value)}
                        placeholder="Second code..."
                    />
                </div>

                <div>
                    <Diffeditor original={firstCode} modified={secondCode} />
                </div>
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<Compare />);
