var titleLabel = document.getElementById('title');
var termInput = document.getElementById('term');

function renderForm({ term, archiveName }) {
  if (term) {
    termInput.value = term;
  }
  titleLabel.textContent = `Search ${archiveName}`;
  document.title = `Search ${archiveName}`;
}

module.exports = renderForm;
