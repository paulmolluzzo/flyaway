#!/usr/bin/env node
'use strict';

require('dotenv').config({silent: true});
const fs = require('fs');
const path = require('path');
const meow = require('meow');
const Twitter = require('twitter');
const ora = require('ora');
const chalk = require('chalk');

/**
 * Help message
 */
meow(`
  Example
    $ flyaway tweets.csv
    ${chalk.green('✔')} ${chalk.green('202 Tweets Deleted.')} ${chalk.red('18 tweets produced an error.')}
    ✌
`);

// bail if no file provided
if (!process.argv[2]) {
  console.error('Must specify a file!');
  process.exit(0);
}

const filePath = path.resolve(process.argv[2]);
const tweetIDs = [];

/**
 * Grab all twitter IDs from tweets.csv
 */
fs.readFile(filePath, {flag: 'r', encoding: 'utf-8'}, (err, data) => {
  if (err) {
    console.error(`There's an issue with the supplied file.`);
    process.exit(0);
  }

  data.toString().split(/\n/).forEach(function (line) {
    if (/^"\d+"/.test(line)) {
      tweetIDs.push(line.match(/^"\d+"/)[0].replace(/"/g, ''));
    }
  });
});

/**
 * Initialize Twitter client
 * Pulls required values from env
 */
const client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

/**
 * sends POST to Twitter to delete specific Tweet by ID
 * @param  string   tweetID   ID of the tweet to delete
 * @param  Function err       function to call if there is an error in the POST
 * @param  Function success   function to call if the deletion is successful
 */
const deleteTweet = (tweetID, err = () => {}, success = () => {}) => {
  client.post(`statuses/destroy/${tweetID}.json`, error => {
    if (!error) {
      success();
      return;
    }

    err(error[0]);
  });
};

/**
 * Uses error object to determine if the process should end altogether
 * See https://dev.twitter.com/overview/api/response-codes
 * @param  object   errorObj First error object returned from Twitter with a code and message
 * @param  object   spinner  spinner inited in deleteTweetsQueue()
 */
const conditionallyEndDeleting = (errorObj, spinner) => {
  switch (errorObj.code) {
    case 32:
    case 50:
    case 63:
    case 64:
    case 88:
    case 89:
    case 99:
    case 185:
    case 215:
    case 226:
    case 261:
      spinner.fail(`${errorObj.message}`);
      process.exit(0);
      break;
    default:
      break;
  }
};

/**
 * Job queue for deleting all tweets read from csv file
 */
const deleteTweetsQueue = () => {
  let deletedCount = 0;
  let errorCount = 0;
  const spinner = ora(`${deletedCount} Tweets Deleted`).start();

  const updateSpinnerText = () => {
    let text = chalk.green(`${deletedCount} Tweets Deleted.`);
    if (errorCount > 0) {
      text += chalk.red(` ${errorCount} tweets produced an error.`);
    }

    return text;
  };

  setInterval(() => {
    if (tweetIDs.length > 0) {
      const tweet = tweetIDs.shift();
      deleteTweet(tweet,
      err => {
        errorCount++;
        spinner.text = updateSpinnerText();
        conditionallyEndDeleting(err, spinner);
      },
      () => {
        deletedCount++;
        spinner.text = updateSpinnerText();
      });
      return;
    }

    spinner.succeed(`${updateSpinnerText()}
✌`);
    process.exit(0);
  }, 5000); // run every 5 seconds to avoid rate limit constraints
};

// Start delete job queue
deleteTweetsQueue();
