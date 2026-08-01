// ============================================
// TargetBand9 — Reusable MCQ quiz engine
// Used by reading.html, listening.html, mock-test.html
// ============================================

function initQuiz({ questions, formId, submitId, retryId, progressId, resultsId, bandId, detailId }) {
  const form = document.getElementById(formId);
  const submitBtn = document.getElementById(submitId);
  const retryBtn = document.getElementById(retryId);
  const progressLabel = document.getElementById(progressId);
  const resultsPanel = document.getElementById(resultsId);
  const bandScoreEl = document.getElementById(bandId);
  const scoreDetailEl = document.getElementById(detailId);

  let answered = new Set();

  function render() {
    form.innerHTML = '';
    questions.forEach((q, qi) => {
      const qDiv = document.createElement('div');
      qDiv.className = 'question';
      qDiv.dataset.index = qi;

      const row = document.createElement('div');
      row.className = 'q-row';

      const num = document.createElement('div');
      num.className = 'q-num';
      num.textContent = String(qi + 1).padStart(2, '0');

      const body = document.createElement('div');
      body.className = 'q-body';

      const text = document.createElement('p');
      text.className = 'q-text';
      text.textContent = q.text;

      const opts = document.createElement('div');
      opts.className = 'options';

      q.options.forEach((optText, oi) => {
        const label = document.createElement('label');
        label.className = 'option';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'q' + qi;
        input.value = oi;
        input.addEventListener('change', () => {
          answered.add(qi);
          updateProgress();
        });

        const bubble = document.createElement('span');
        bubble.className = 'bubble';
        bubble.textContent = String.fromCharCode(65 + oi);

        const optSpan = document.createElement('span');
        optSpan.className = 'option-text';
        optSpan.textContent = optText;

        label.appendChild(input);
        label.appendChild(bubble);
        label.appendChild(optSpan);
        opts.appendChild(label);
      });

      body.appendChild(text);
      body.appendChild(opts);
      row.appendChild(num);
      row.appendChild(body);
      qDiv.appendChild(row);
      form.appendChild(qDiv);
    });
  }

  function updateProgress() {
    progressLabel.textContent = `${answered.size} / ${questions.length} answered`;
    submitBtn.disabled = answered.size < questions.length;
  }

  function scoreToBand(correctCount, total) {
    const pct = correctCount / total;
    if (pct >= 0.97) return 9.0;
    if (pct >= 0.90) return 8.5;
    if (pct >= 0.83) return 8.0;
    if (pct >= 0.75) return 7.5;
    if (pct >= 0.65) return 7.0;
    if (pct >= 0.55) return 6.5;
    if (pct >= 0.45) return 6.0;
    if (pct >= 0.35) return 5.5;
    if (pct >= 0.27) return 5.0;
    if (pct >= 0.20) return 4.5;
    if (pct >= 0.12) return 4.0;
    return 3.5;
  }

  function handleSubmit() {
    let correctCount = 0;
    questions.forEach((q, qi) => {
      const qDiv = form.querySelector(`.question[data-index="${qi}"]`);
      const selected = form.querySelector(`input[name="q${qi}"]:checked`);
      const selectedVal = selected ? parseInt(selected.value, 10) : null;
      const isCorrect = selectedVal === q.correct;
      if (isCorrect) correctCount++;

      qDiv.classList.add(isCorrect ? 'correct' : 'incorrect');
      const options = qDiv.querySelectorAll('.option');
      options.forEach((optLabel, oi) => {
        const input = optLabel.querySelector('input');
        input.disabled = true;
        if (oi === q.correct) optLabel.classList.add('mark-correct');
        else if (oi === selectedVal) optLabel.classList.add('mark-incorrect');
      });
    });

    const band = scoreToBand(correctCount, questions.length);
    bandScoreEl.textContent = band.toFixed(1);
    scoreDetailEl.textContent = `${correctCount} of ${questions.length} correct`;
    resultsPanel.classList.add('show');
    submitBtn.style.display = 'none';
    retryBtn.style.display = 'inline-block';
    resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });

    return band;
  }

  function reset() {
    answered = new Set();
    resultsPanel.classList.remove('show');
    submitBtn.style.display = 'inline-block';
    submitBtn.disabled = true;
    retryBtn.style.display = 'none';
    render();
    progressLabel.textContent = `0 / ${questions.length} answered`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  submitBtn.addEventListener('click', handleSubmit);
  retryBtn.addEventListener('click', reset);
  render();

  return { reset, getAnsweredCount: () => answered.size };
}
