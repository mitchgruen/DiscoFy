const wordCount = require('word-count');

function useful(text) {
  if (wordCount(text) < 400) {
    return false;
  }
  return true;
}

module.exports = useful;
