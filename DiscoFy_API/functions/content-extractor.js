const Mercury = require('@postlight/mercury-parser');
const cheerio = require('cheerio');
const { convert } = require('html-to-text');
const asyncHandler = require('./asyncHandler');
const colors = require('colors');
const wordCount = require('word-count');
const useful = require('./useful');

// TEST CONDITIONS
urlOption = 5;
showRawOutput = 1;
showPlainText = 1;
showPlaintTextLength = 0;

// VARIABLES
const errorUrlLength = 45;

// TEST URLS
const testUrls = [
  'https://gothamist.com/news/have-aetna-insurance-you-could-soon-lose-coverage-in-new-york-presbyterians-health-system',
  'https://jazz-nyc.com/',
  'https://www.eventbrite.com/d/ny--new-york/events--today/jazz/',
  'https://www.timeout.com/newyork/bars/best-non-alcoholic-cocktails-new-york-city',
  'https://observer.com/2023/07/best-alcohol-free-sober-bars-new-york-city/',
  'https://www.bbc.com/news/uk-68643137',
];
contentExtractor = asyncHandler(async function (url) {
  // Get the HTML content of the URL
  let content = await Mercury.parse(url);
  if (showRawOutput) console.log('Raw Mercury Output:', content);
  content = content.content;
  // if (content.includes('lazyload')) {
  //   console.log(
  //     `URL Rejected; Uses Lazy Loading: ${url.slice(0, errorUrlLength)}...`.red
  //   );
  //   return;
  // }
  if (!content) {
    console.log(
      `Mercury could not parse this URL: ${url.slice(0, errorUrlLength)}...`.red
    );
    return;
  }

  // Limit the content to 1000 characters
  // content = content.slice(0, 1000);

  // Remove Hyperlinks
  const $ = cheerio.load(content);
  $('a').each(function () {
    $(this).replaceWith($(this).text()); // Remove hyperlinks, but keep the link text
  });
  content = $.html(); // Get the modified HTML content
  // console.log('Modified HTML:', content);

  // Convert HTML content to plain text
content = convert(content, {
    formatters: {
      // Define a custom formatter to filter out unwanted patterns
      'filterUnwantedPatterns': function (elem, walk, builder, formatOptions) {
        const text = walk(elem.children, builder);
        // Use regular expressions to remove or replace unwanted artifacts
        const cleanedText = text.replace(/https:\/\/.*?\.jpg/g, '') // Remove .jpg URLs
                                .replace(/wp-content\/uploads\/sites\/\d+\/\d+\/\d+/g, '') // Remove specific paths
                                .replace(/\bquality=80\b/g, '') // Example of removing other unwanted text
                                .replace(/\bw=\d+\b/g, '');
        builder.addInline(cleanedText);
      }
    },
    selectors: [
      { selector: 'img', format: 'skip' }, // Skip images if not needed
      { selector: 'a', format: 'anchor' }, // Format links as needed, or use 'skip' to ignore
      // Apply custom formatter to all text nodes
      { selector: 'text', format: 'filterUnwantedPatterns' }
    ],
  });

  // Remove extra spaces
  // RegEx to replace multiple spaces with a single space and eliminate special characters
  content = content.replace(/[\s\W]+/g, ' ');

  if (showPlaintTextLength) console.log('Content Length:', wordCount(content), 'words');

  // Check if the content is useful
  if (!useful(content)) {
    console.log(
      `This URL does not seem useful: ${url.slice(0, errorUrlLength)}...`.red
    );
    return;
  }

  if (showPlainText) console.log(content);
});

contentExtractor(testUrls[urlOption]);

module.exports = contentExtractor;
