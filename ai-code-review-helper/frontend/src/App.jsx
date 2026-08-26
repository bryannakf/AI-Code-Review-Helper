import { useState } from "react";

import CodeEditor from "./components/CodeEditor";
import ConsentWarning from "./components/ConsentWarning";
import ReviewResults from "./components/ReviewResults";

import { reviewCode } from "./services/reviewApi";

import "./App.css";

function App() {
  const [language, setLanguage] = useState("python");

  const [code, setCode] = useState("");

  const [consent, setConsent] = useState(false);

  const [results, setResults] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleReview() {
    setError("");
    setResults(null);

    if (!code.trim()) {
      setError("Please enter some code before starting the review.");

      return;
    }

    if (!consent) {
      setError(
        "Please confirm that the code does not contain confidential or personal information.",
      );

      return;
    }

    setLoading(true);

    try {
      const data = await reviewCode({
        code,
        language,
        consent,
      });

      setResults(data);
    } catch (error) {
      setError(
        error.message || "Something went wrong while analysing the code.",
      );
    } finally {
      setLoading(false);
    }
  }

  function clearReview() {
    setCode("");
    setResults(null);
    setError("");
    setConsent(false);
  }

  return (
    <div className="app">
      {/* HEADER */}

      <header className="app-header">
        <div className="header-content">
          <div className="brand">
            <div className="brand-icon">AI</div>

            <div>
              <h1>AI Code Review Helper</h1>

              <p>Intelligent assistance for software code reviews</p>
            </div>
          </div>

          <div className="status">
            <span className="status-dot" />
            System ready
          </div>
        </div>
      </header>

      {/* MAIN */}

      <main className="main-content">
        {/* INTRODUCTION */}

        <section className="intro">
          <span className="eyebrow">CODE QUALITY ANALYSIS</span>

          <h2>Review your code with AI-assisted analysis</h2>

          <p>
            Submit a code snippet to receive automated static-analysis findings,
            AI-generated recommendations and an overall code-quality score.
          </p>
        </section>

        {/* INPUT */}

        <section className="review-card">
          <CodeEditor
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
          />

          <ConsentWarning consent={consent} setConsent={setConsent} />

          {error && (
            <div className="error-message">
              <strong>Review could not be started</strong>

              <p>{error}</p>
            </div>
          )}

          <div className="action-buttons">
            <button
              className="primary-button"
              onClick={handleReview}
              disabled={loading || !code.trim() || !consent}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Analysing...
                </>
              ) : (
                <>Analyse Code →</>
              )}
            </button>

            <button
              className="secondary-button"
              onClick={clearReview}
              disabled={loading}
            >
              Clear
            </button>
          </div>
        </section>

        {/* RESULTS */}

        {results && <ReviewResults results={results} />}

        {/* HOW IT WORKS */}

        {!results && !loading && (
          <section className="how-it-works">
            <h2>How it works</h2>

            <div className="steps">
              <Step
                number="01"
                title="Submit"
                description="Paste your source code and select the programming language."
              />

              <Step
                number="02"
                title="Analyse"
                description="Static-analysis tools and AI independently analyse the code."
              />

              <Step
                number="03"
                title="Score"
                description="The system combines the findings into a code-quality score."
              />

              <Step
                number="04"
                title="Improve"
                description="Use the recommendations to identify potential improvements."
              />
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}

      <footer>
        <p>AI Code Review Helper</p>

        <p>
          AI-generated recommendations should always be validated by a qualified
          developer.
        </p>
      </footer>
    </div>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="step">
      <span className="step-number">{number}</span>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}

export default App;
