const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Dhaka');
const os = require('os');

module.exports = {
  config: {
    name: "uptime",
    aliases: ["up","upt"],
    version: "1.0",
    countDown: 10,
    author: "sahadat",
    role: 1,
    shortDescription: {
      en: "status bot"
    },
    longDescription: {
      en: "status bot"
    },
    category: "system",
    guide: {
      en: "{pn}"
    }
  },
  
onStart: async function ({ message, event, usersData, threadsData }) {
     const uptime = process.uptime();
     const startTime = Date.now();
     const jam = Math.floor(uptime / 3600);
     const menit = Math.floor((uptime % 3600) / 60);
     const detik = Math.floor(uptime % 60);
     
     const arif = `${jam} Hr(s) ${menit} Min(s) ${detik} sec(s)`;
     
     const now = moment();
     const riley = now.format('DD-MMMM-Y || hh.mm.ss A');
     
     const veli = `${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB`;
     const putra = await usersData.getAll();
     const loufi = await threadsData.getAll(); 
     const luxion = `${os.type()} ${os.release()}`;
     const rizky = `${os.cpus()[0].model} (${os.cpus().length} cores)`
     
     const endTime = Date.now();
     const raffa = endTime - startTime;
     
     const hadi = `🟢Bot Has Been Working For\n❯${arif}\n❯Bot Ping: ${raffa}\n❯Total Users: ${putra.length}\n❯Total Box: ${loufi.length}\n❯Running as: On Render\n❯Memory: ${veli}\n❯OS: ${luxion}\n❯CPU: ${rizky}\n❯D/T: ${riley}`
  message.reply(hadi);
	message.reaction("✅", event.messageID);
   },
};
