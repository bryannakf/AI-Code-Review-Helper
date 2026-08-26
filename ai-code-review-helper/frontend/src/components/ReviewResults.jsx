import ScoreCard from "./ScoreCard";
import IssueList from "./IssueList";


function ReviewResults({ results }) {

  const staticIssues =
    results.static_analysis || [];

  const aiIssues =
    results.ai_feedback?.issues || [];


  return (
    <section className="results-container">

      <div className="results-header">

        <div>

          <span className="results-label">
            ANALYSIS COMPLETE
          </span>

          <h2>
            Code Review Results
          </h2>

        </div>


        <div className="analysis-time">

          <span>
            Analysis time
          </span>

          <strong>
            {results.analysis_time}s
          </strong>

        </div>

      </div>


      <ScoreCard
        score={results.score}
      />


      <div className="score-breakdown">

        <ScoreMetric
          title="Readability"
          value={results.score.readability}
        />

        <ScoreMetric
          title="Maintainability"
          value={results.score.maintainability}
        />

        <ScoreMetric
          title="Style Compliance"
          value={results.score.style_compliance}
        />

        <ScoreMetric
          title="Potential Bugs"
          value={results.score.potential_bugs}
        />

      </div>


      <div className="summary">

        <h3>
          AI Summary
        </h3>

        <p>
          {results.ai_feedback?.summary ||
            "No summary was provided."}
        </p>

      </div>


      <IssueList
        title="Static Analysis Findings"
        issues={staticIssues}
        emptyMessage="No static-analysis issues were detected."
      />


      <IssueList
        title="AI Findings"
        issues={aiIssues}
        emptyMessage="No additional AI issues were identified."
      />


      <div className="ai-disclaimer">

        <strong>
          Important:
        </strong>

        AI-generated feedback is advisory.
        Developers remain responsible for
        validating suggestions and ensuring
        that final code meets appropriate
        security and quality standards.

      </div>

    </section>
  );
}


function ScoreMetric({
  title,
  value
}) {

  return (
    <div className="score-metric">

      <span>
        {title}
      </span>

      <strong>
        {value}
      </strong>

      <div className="progress-bar">

        <div
          className="progress-value"
          style={{
            width: `${value}%`
          }}
        />

      </div>

    </div>
  );
}


export default ReviewResults;