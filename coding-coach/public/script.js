document
  .getElementById('submitButton')
  .addEventListener('click', async function () {
    const problemText = document.getElementById('problemText').value;
    const rudenessLevel = document.getElementById('rangeInput').value;
    const answerText = document.getElementById('answerText');

    answerText.innerHTML = 'Loading...';

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problem: problemText,
          rudenessLevel: rudenessLevel,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        answerText.innerHTML = data.answer;
      } else {
        answerText.innerHTML = 'Error: ' + data.error;
      }
    } catch (error) {
      answerText.innerHTML = 'An error occurred: ' + error.message;
    }
  });
