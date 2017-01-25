# Flyaway ✌

Command line utlity for deleting all Tweets from Twitter.

**Disclaimer: This will permanently destroy all of your tweets! Think about this before you go further.**

## Installation

### From `npm`

1. `npm install -g flyaway
2. [Create a new Twitter app](https://apps.twitter.com/) and grab the `consumer_key`, `consumer_secret`, `access_token_key`, and `access_token_secret`.

### From Source Code

1. Clone this repo and enter the directory.
2. Run `npm install` or `yarn install`.
3. [Create a new Twitter app](https://apps.twitter.com/) and grab the `consumer_key`, `consumer_secret`, `access_token_key`, and `access_token_secret`.
4. (Optional) If you want to run this from other directories run `npm install -g`. This allows you to use CLI utility just by running `flyaway`. Without this step you'll have to run `npm start [...remaining_args]` from the directory or `node path/to/flyaway/index.js [...remaining args]`.

## Usage

This requires having a csv of your tweets and a Twitter app and credentials for the app and for the user whose tweets are being deleted. You can get the file by requesting your [Twitter archive](https://blog.twitter.com/2012/your-twitter-archive). You need the file `tweets.csv`. You can [create a new Twitter app](https://apps.twitter.com/) and grab the `consumer_key`, `consumer_secret`, `access_token_key`, and `access_token_secret` for the user that generated the app.

Once you have the app installed and the required Twitter assets you can run it like this:

```bash
flyaway -f path/to/tweets.csv \ # specify the location of the tweets file
--ck=[consumer_key] \ # specify the Twitter consumer key for the app
--cs=[consumer_secret] \ # specify the Twitter consumer secret for the app
--atk=[access_token_key] \ # specify the Twitter access token key for the user
--ats=[access_token_secret] # specify the Twitter access token secret for the user
```

---

MIT

©2017 Paul Molluzzo