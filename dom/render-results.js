var getHTMLFragmentFromCell = require('@jimkang/get-html-fragment-from-cell');
var d3 = require('d3-selection');
var curry = require('lodash.curry');

var resultsRoot = d3.select('#results-root');

function renderResults({ resultsContents, contentBaseURL }) {
  var fragments = resultsContents.map(
    curry(getHTMLFragmentFromCell)(`${contentBaseURL}/media`)
  );
  resultsRoot.selectAll('li').remove();
  resultsRoot.html(fragments.join('\n'));
}

module.exports = renderResults;
