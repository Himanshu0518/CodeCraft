import { useState, useEffect } from "react";
import SplitPane from "react-split-pane";
import { FaChevronDown, FaHtml5, FaCss3, FaJs } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import CodeMirror from "@uiw/react-codemirror";
import { html as htmlLang } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { css as cssLang } from "@codemirror/lang-css";

const NewProject = () => {
  const [html, setHtml] = useState("<h1>Hello World</h1>");
  const [css, setCss] = useState(
    "body { font-family: sans-serif; color: white; background-color: #1e293b; }"
  );
  const [js, setJs] = useState("console.log('Hello World');");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const updateOutput = () => {
      const combinedOutput = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Live Preview</title>
<style>${css}</style>
</head>
<body>${html}
<script>${js}</script>
</body>
</html>
`;
      setOutput(combinedOutput);
    };

    updateOutput();
  }, [html, css, js]);

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-slate-900">
      <header></header>

      <SplitPane split="horizontal" minSize={150} defaultSize="60%">
        {/* Top code section */}
        <div className="flex h-full">
          {/* HTML editor */}
          <SplitPane split="vertical" minSize={200} defaultSize="33%">
            <div className="flex flex-col h-full border-r border-slate-700">
              <div className="flex justify-between items-center px-2 py-1 bg-slate-800 border-b border-slate-700 rounded-t-md">
                <div className="flex items-center gap-2">
                  <FaHtml5 className="text-orange-500" />
                  <span className="text-sm font-medium text-white">HTML</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaChevronDown className="text-gray-400 hover:text-white cursor-pointer transition" />
                  <IoIosSettings className="text-gray-400 hover:text-white cursor-pointer transition" />
                </div>
              </div>
              <div className="flex-1 p-2">
                <CodeMirror
                  value={html}
                  height="100%"
                  width="100%"
                  theme="dark"
                  extensions={[htmlLang()]}
                  onChange={(value) => setHtml(value)}
                />
              </div>
            </div>

            {/* CSS editor */}
            <SplitPane split="vertical" minSize={200} defaultSize="50%">
              <div className="flex flex-col h-full border-r border-slate-700">
                <div className="flex justify-between items-center px-2 py-1 bg-slate-800 border-b border-slate-700 rounded-t-md">
                  <div className="flex items-center gap-2">
                    <FaCss3 className="text-blue-500" />
                    <span className="text-sm font-medium text-white">CSS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaChevronDown className="text-gray-400 hover:text-white cursor-pointer transition" />
                    <IoIosSettings className="text-gray-400 hover:text-white cursor-pointer transition" />
                  </div>
                </div>
                <div className="flex-1 p-2">
                  <CodeMirror
                    value={css}
                    height="100%"
                    width="100%"
                    theme="dark"
                    extensions={[cssLang()]}
                    onChange={(value) => setCss(value)}
                  />
                </div>
              </div>

              {/* JS editor */}
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center px-2 py-1 bg-slate-800 border-b border-slate-700 rounded-t-md">
                  <div className="flex items-center gap-2">
                    <FaJs className="text-yellow-500" />
                    <span className="text-sm font-medium text-white">JS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaChevronDown className="text-gray-400 hover:text-white cursor-pointer transition" />
                    <IoIosSettings className="text-gray-400 hover:text-white cursor-pointer transition" />
                  </div>
                </div>
                <div className="flex-1 p-2">
                  <CodeMirror
                    value={js}
                    height="100%"
                    width="100%"
                    theme="dark"
                    extensions={[javascript()]}
                    onChange={(value) => setJs(value)}
                  />
                </div>
              </div>
            </SplitPane>
          </SplitPane>
        </div>

        {/* Bottom preview section */}
        <div className="h-full border-t border-slate-700 bg-white">
          <iframe
            srcDoc={output}
            title="Live Preview"
            sandbox="allow-scripts"
            className="w-full h-full bg-white"
          ></iframe>
        </div>
      </SplitPane>
    </div>
  );
};

export default NewProject;
