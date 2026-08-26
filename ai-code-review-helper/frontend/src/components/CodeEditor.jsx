function CodeEditor({
  code,
  setCode,
  language,
  setLanguage
}) {

  return (
    <div className="editor-section">

      <div className="editor-header">

        <div>
          <label htmlFor="language">
            Programming Language
          </label>

          <select
            id="language"
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value)
            }
          >
            <option value="python">
              Python
            </option>

            <option value="javascript">
              JavaScript
            </option>

            <option value="java">
              Java
            </option>
          </select>
        </div>

      </div>


      <label htmlFor="code">
        Source Code
      </label>

      <textarea
        id="code"
        className="code-editor"
        value={code}
        onChange={(event) =>
          setCode(event.target.value)
        }
        placeholder={`Paste your ${language} code here...`}
        spellCheck="false"
      />


      <div className="character-count">
        {code.length} characters
      </div>

    </div>
  );
}

export default CodeEditor;