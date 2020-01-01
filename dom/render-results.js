var getHTMLFragmentFromCell = require('@jimkang/get-html-fragment-from-cell');
var d3 = require('d3-selection');

var resultsRoot = d3.select('#results-root');

function renderResults({ resultsContents, contentBaseURL }) {
  var fragments = resultsContents.map(curriedGetFragment);
  resultsRoot.selectAll('li').remove();
  resultsRoot.html(fragments.join('\n'));

  function curriedGetFragment(cell) {
    return getHTMLFragmentFromCell(
      {
        mediaDir: `${contentBaseURL}/media`,
        baseDir: contentBaseURL
      },
      cell
    );
  }
}

module.exports = renderResults;
