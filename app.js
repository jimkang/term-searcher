var qs = require('qs');
var handleError = require('handle-error-web');
var renderForm = require('./dom/render-form');
var searchFlow = require('./flows/search-flow');
var config = require('./config');

(async function go() {
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
