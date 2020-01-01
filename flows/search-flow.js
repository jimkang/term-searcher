var request = require('basic-browser-request');
var handleError = require('handle-error-web');
var oknok = require('oknok');
var renderMessage = require('../dom/render-message');
var renderResults = require('../dom/render-results');
var getResultsContent = require('../tasks/get-results-content');

var searchingMessage = document.getElementById('searching-message');

function searchFlow({ term, searchBaseURL, contentBaseURL }) {
  searchingMessage.textContent = 'Searching…';
  searchingMessage.classList.remove('hidden');

  var reqOpts = {
    method: 'GET',
    url: `${searchBaseURL}/search?term=${encodeURIComponent(term)}`,
    json: true
  };
  request(reqOpts, oknok({ ok: onSearched, nok: handleError }));

  function onSearched(res, body) {
    if (res.statusCode < 300 && res.statusCode > 199) {
      renderMessage({
        message: `Found ${body.length} results.`,
        messageType: 'searching-message'
      });
      getResultsContent(
        { searchResults: body, contentBaseURL },
        oknok({ ok: onGotResultsContent, nok: handleError })
      );
    } else {
      renderMessage({
        message: `Search failed. ${res.statusCode}: ${body.message}`,
        messageType: 'searching-message'
      });
    }
  }

  function onGotResultsContent(resultsContents) {
    renderMessage({
      message: `Found content for ${resultsContents.length} results.`,
      messageType: 'searching-message'
    });
    renderResults({ resultsContents, contentBaseURL });
  }
}

module.exports = searchFlow;
