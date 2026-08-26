const API_URL = "http://127.0.0.1:5000/api";


export async function checkHealth() {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("Backend server is unavailable.");
  }

  return response.json();
}


export async function reviewCode({
  code,
  language,
  consent
}) {

  const response = await fetch(
    `${API_URL}/review`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        code,
        language,
        consent
      })
    }
  );


  const data = await response.json();


  if (!response.ok) {
    throw new Error(
      data.error || "Code analysis failed."
    );
  }


  return data;
}