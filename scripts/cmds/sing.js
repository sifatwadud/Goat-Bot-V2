const fs = require("fs-extra");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const axios = require('axios');

module.exports = {
  config: {
    name: "sing",
    aliases: ["song","play"],
    version: "1.0",
    author: "NZ R",
    category: "music",
    dependencies: {
      "fs-extra": "",
      "ytdl-core": "",
      "yt-search": "",
      "axios": ""
    }
  },

  onStart: async ({ api, event, usersData }) => {
    api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
    
    try {
      const input = event.body;
      const query = input.substring(6).trim();

      if (!query) {
        api.setMessageReaction("❌", event.messageID, () => {}, true);
        return api.sendMessage("Hey there! Please provide a song title, so I can search for it and sing it for you! 🎤", event.threadID);
      }

      const user = event.senderID;
      const userName = await usersData.getName(user);

      const searchResults = await yts(query);

      if (!searchResults.videos.length) {
        api.setMessageReaction("❌", event.messageID, () => {}, true);
        return api.sendMessage("Oops! I couldn't find any relevant results for this song title. Could you please try another one?", event.threadID);
      }

      const music = searchResults.videos[0];

      const stream = ytdl(music.url, { filter: "audioonly" });

      const fileName = `${Date.now()}_${music.title.replace(/\s+/g, '_')}.mp3`;
      const filePath = `${__dirname}/cache/${fileName}`;

      stream.pipe(fs.createWriteStream(filePath));

      stream.on('end', () => {
        const message = {
          body: `🎵 Here's the song you requested Enjoy ${userName}..!!🎤\n\nTitle: ${music.title}\nDuration: ${music.duration.timestamp}\nYouTube Link: ${music.url}`,
          attachment: fs.createReadStream(filePath)
        };

        api.sendMessage(message, event.threadID, () => {
          fs.unlinkSync(filePath);
          api.setMessageReaction("✅", event.messageID, () => {}, true);
        });
      });
    } catch (error) {
      console.error('[ERROR]', error);
      api.sendMessage("Oops! Something went wrong while processing your request. Please try again later.", event.threadID);
      api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
  }
};
