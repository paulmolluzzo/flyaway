# Flyaway ✌

Command line utlity for deleting all Tweets from Twitter.

**Disclaimer: This will permanently destroy all of your tweets! Think about this before you go further.**

## Installation

1. Clone this repo and enter the directory.
2. Run `npm install` or `yarn install`.
3. [Create a new Twitter app](https://apps.twitter.com/) and grab the `consumer_key`, `consumer_secret`, `access_token_key`, and `access_token_secret`.
4. Copy the `.env-sample` to `.env` and replace the values properly.
5. (Optional) If you want to run this from other directories run `npm install -g`. This allows you to use CLI utility just by running `flyaway`. Without this step you'll have to run `npm start path/to/tweets.csv` from the directory or `node path/to/flyaway/index.js path/to/tweets.csv`.

## Usage

This requires having a csv of your tweets. You can get the file by requesting your [Twitter archive](https://blog.twitter.com/2012/your-twitter-archive). You need the file `tweets.csv`.

If you followed step 5 above you can run `flyaway path/to/tweets.csv`.

---

MIT

©2017 Paul Molluzzo