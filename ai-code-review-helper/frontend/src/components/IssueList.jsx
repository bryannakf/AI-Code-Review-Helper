function IssueList({
  issues,
  title,
  emptyMessage
}) {

  return (
    <div className="issue-section">

      <h3>
        {title}
      </h3>


      {issues.length === 0 ? (

        <div className="no-issues">
          ✓ {emptyMessage}
        </div>

      ) : (

        <div className="issues">

          {issues.map((issue, index) => (

            <div
              className="issue"
              key={index}
            >

              <div className="issue-header">

                <span
                  className={`severity ${issue.severity}`}
                >
                  {issue.severity}
                </span>

                {issue.tool && (
                  <span className="tool">
                    {issue.tool}
                  </span>
                )}

                {issue.line && (
                  <span className="line">
                    Line {issue.line}
                  </span>
                )}

              </div>


              <p className="issue-message">
                {issue.message}
              </p>


              {issue.explanation && (
                <p>
                  <strong>
                    Explanation:
                  </strong>{" "}
                  {issue.explanation}
                </p>
              )}


              {issue.recommendation && (
                <p>
                  <strong>
                    Recommendation:
                  </strong>{" "}
                  {issue.recommendation}
                </p>
              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}


export default IssueList;