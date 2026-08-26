function ConsentWarning({
  consent,
  setConsent
}) {

  return (
    <div className="consent-container">

      <div className="security-warning">

        <div className="warning-icon">
          !
        </div>

        <div>

          <h3>
            Protect sensitive information
          </h3>

          <p>
            Do not submit passwords, API keys,
            personal information, confidential
            source code, client information or
            commercially sensitive information.
          </p>

          <p>
            Code is processed temporarily for
            analysis and should not contain
            confidential information.
          </p>

        </div>

      </div>


      <label className="consent-checkbox">

        <input
          type="checkbox"
          checked={consent}
          onChange={(event) =>
            setConsent(event.target.checked)
          }
        />

        <span>
          I confirm that the code I am submitting
          does not contain personal, confidential
          or commercially sensitive information.
        </span>

      </label>

    </div>
  );
}

export default ConsentWarning;