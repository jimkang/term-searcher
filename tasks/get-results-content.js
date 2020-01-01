var { queue } = require('d3-queue');
var request = require('basic-browser-request');
var bodyMover = require('request-body-mover');
var compact = require('lodash.compact');

function getResultsContent({ searchResults, contentBaseURL }, getResultsDone) {
  var q = queue();
  searchResults.forEach(queueGet);
  q.awaitAll(passContents);

  function passContents(error, contents) {
    if (contents && Array.isArray(contents)) {
      getResultsDone(error, compact(contents));
    } else {
      getResultsDone(error);
    }
  }

  function queueGet(searchResult) {
    q.defer(getContent, searchResult);
  }

  function getContent({ ref }, done) {
    var reqsToTry = [
      { method: 'GET', json: true, url: `${contentBaseURL}/meta/${ref}.json` },
      { method: 'GET', json: false, url: `${contentBaseURL}/${ref}.html` }
    ];
    var tryCount = 0;
    tryToGet(reqsToTry[tryCount]);

    function tryToGet(reqOpts) {
      request(reqOpts, bodyMover(passContent));
    }

    function passContent(error, content) {
      tryCount += 1;

      if (error) {
        if (tryCount < reqsToTry.length) {
          tryToGet(reqsToTry[tryCount]);
        } else {
          console.log(
            'Error while trying to get content for',
            ref,
            error,
            error.stack
          );
          done();
        }
        return;
      }
      done(null, content);
    }
  }
}

module.exports = getResultsContent;
