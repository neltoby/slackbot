const { WebClient, LogLevel } = require('@slack/web-api');

const client = new WebClient(process.env.BOT_TOKEN, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG,
});

const postChat = response => client.chat.postMessage(response)

exports.postChat = postChat