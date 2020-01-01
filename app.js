var qs = require('qs');
var handleError = require('handle-error-web');
var renderForm = require('./dom/render-form');
var searchFlow = require('./flows/search-flow');
var config = require('./config');
var { version } = require('./package.json');

(async function go() {
  renderVersion();
  window.onerror = reportTopLevelError;
  var { term } = qs.parse(window.location.search.slice(1));
  renderForm({ archiveName: config.archiveName, term });

  if (term) {
    searchFlow({
      term,
      searchBaseURL: config.searchBaseURL,
      contentBaseURL: config.contentBaseURL
    });
  }
})();

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

function renderVersion() {
  var versionInfo = document.getElementById('version-info');
  versionInfo.textContent = version;
}
