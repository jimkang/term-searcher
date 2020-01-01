var titleLabel = document.getElementById('title');
var termInput = document.getElementById('term');

function renderForm({ term, archiveName, contentBaseURL }) {
  if (term) {
    termInput.value = term;
  }
  titleLabel.innerHTML = `Search <a href="${contentBaseURL}">${archiveName}</a> archive`;
  document.title = `Search ${archiveName} archive`;
}

module.exports = renderForm;
