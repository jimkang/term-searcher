var getHTMLFragmentFromCell = require('@jimkang/get-html-fragment-from-cell');
var d3 = require('d3-selection');

const singlePageContentStartMarker = '<li class="pane">';
const singlePageContentEndMarker = '</li>\n</ul>\n  </section>';

var resultsRoot = d3.select('#results-root');

function renderResults({ resultsContents, contentBaseURL }) {
  var fragments = resultsContents.map(curriedGetFragment);
  resultsRoot.selectAll('li').remove();
  resultsRoot.html(fragments.join('\n'));

  function curriedGetFragment(cellOrHTML) {
    if (typeof cellOrHTML === 'object') {
      return getHTMLFragmentFromCell(
        {
          mediaDir: `${contentBaseURL}/media`,
          baseDir: contentBaseURL
        },
        cellOrHTML
      );
    }
    if (typeof cellOrHTML === 'string') {
      return scrapeContentsOut(cellOrHTML);
    }
  }
}

function scrapeContentsOut(pageHTML) {
  // Only works for old static-web-archive pages.
  var startIndex =
    pageHTML.indexOf(singlePageContentStartMarker) +
    singlePageContentStartMarker.length;
  var endIndex = pageHTML.indexOf(singlePageContentEndMarker);
  return '<li class="pane">' + pageHTML.slice(startIndex, endIndex) + '</li>';
}

module.exports = renderResults;
