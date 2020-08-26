const Discord = require("discord.js");
const { Client, Util } = require("discord.js");
const { TOKEN, PREFIX, GOOGLE_API_KEY, INSTAGRAM,  ID, AUTHOR, COLOR, LEVEL, create} = require("./config");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const bot = new Client({ disableEveryone: true });
const moment = require("moment");
const Canvas = require("canvas");
require("./server.js");
const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();
const client = new Discord.Client();
let m = require('moment-duration-format'),
    os = require('os'),
    cpuStat = require('cpu-stat'),
    ms = require('ms'),
    fetch = require('node-fetch'),
    parse_ms = require('parse-ms')



////////////////////////////////////////////////////CLIENT////////////////////////////////////////////////////////////////////


const config = require('./config.json');

client.on("message", async message => {
    if (message.author.bot) return; // ignore bots

    // if the user is not on db add the user and change his values to 0
  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
  if (message.content.startsWith(`${PREFIX}ping`)) {
    
      let botMsg = await message.channel.send("Pinging...")


  botMsg.edit({ embed: {
    title: " Ping",
    description: [
      "**Server**: `" + (botMsg.createdAt - message.createdAt) + "ms`",
      "**API**: `" + Math.round(client.ping) + "ms`",
    ].join("\n"),
    color: 16777215,
    footer: { text: "Requested by " + message.author.tag, icon_url: message.author.displayAvatarURL },
    timestamp: new Date()
  }}).catch(e=> botMsg.edit(e.message))
  }
    
});










////////////////////////////////////////////////////////////BOT//////////////////////////////////////////////////////////////




function emoji (id) {
  return bot.emojis.get(id).toString();
}




/////////////////////////////////////////////////////////WARN////////////////////////////////////////////////////////////////

bot.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  
                      
                      
  let blacklisted = ["∆∆∆∆∆∆∆∆∆∆∆∆"]; //for blacklist message

  let foundInText = false;
  for (var i in blacklisted) {
    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase()))
      foundInText = true;
  }

  if (foundInText) {
    message.delete(5000);
  }

});


bot.on("warn", console.warn);

bot.on("error", console.error);

bot.on("disconnect", () => {
  bot.channels.get(`726733010589712395`).send(`Try Reconnect`)
});

bot.on("reconnecting", () => {
  bot.channels.get(`726733010589712395`).send(`Reconnecting`)
});

bot.on("ready", function() {
  bot.channels.get(`726733010589712395`).send(`Bot2 Ready <@331684540223586304>`)
  console.log(`${bot.user.tag} Ready 2`)
});

bot.on("message", function(message) {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  var args = message.content.substring(PREFIX.length).split(" ");
  var command = args[0].toLowerCase();

  //command

  if (command === "bot2" || command === "infobot2" || command === "status2" || command === "stats2") {
    let uptime = bot.uptime;

    let seconds = uptime / 1000;
    const days = parseInt(seconds / 86400);
    seconds %= 86400;
    const hours = parseInt(seconds / 3600);
    seconds %= 3600;
    const minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
    

    uptime = `${days}d, ${hours}h, ${minutes}m ${seconds}s`;

    cpuStat.usagePercent(function (error, percent, seconds) {
      if (error) {
        return console.error(error)
      }
    
    const Node = process.version
    const usage = formatBytes(process.memoryUsage().heapUsed)
    const CPU = percent.toFixed(2)
    const cpuModel = os.cpus()[0].model
    const cores = os.cpus().length
    const guild = bot.guilds.size // Counting how many servers invite your bot. Tolocalestring, meaning separate 3 numbers with commas.
    const user = bot.users.size // Counting how many members in the server that invite your bot.
    const channel = bot.channels.size // Counting how many channels in the server that invite your bot.
    let { version } = require("discord.js");

    let embed = new Discord.RichEmbed()
      .setAuthor("Status Hosting Music")
      .setThumbnail(bot.user.displayAvatarURL)
      .setColor(COLOR)
      .setTimestamp()
      .setDescription("**•MODULES**\n```Users      :: " + user + "\nServers    :: " + guild + "\nChannels   :: " + channel + "\nNode       :: " + Node + "\nDiscordJS  :: v" + version + "```\n**•ENGINES**\n```Uptime     :: " + uptime + "\nCPU        :: " + CPU + "\nMemory     :: " + usage + "\nModel CPU  :: " + cpuModel + "```")
      .setFooter(`Pesan Dari : ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL);
    message.channel.send(embed).then(console.log(error))
    })
  }

  if (command === "restart2" || command === "r2") {
    message.react('✅');
    if (message.author.id !== `${ID}`)
      return message.channel.send("You Not Owner");
     let r2 = new Discord.RichEmbed()
     .setColor(COLOR)
     .setDescription("Done Restart");
      message.channel.send(r2).then(message => {
      process.exit(1);
      })
  }
});

function formatBytes (a, b) {
  if (0 == a) return "0 Bytes";
  let c = 1024,
      d = b || 2,
      e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
  
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
  }
  
  function parseDur(ms) {
  let seconds = ms / 1000,
      days = parseInt(seconds / 86400);
  seconds = seconds % 86400
  
  let hours = parseInt(seconds / 3600);
  seconds = seconds % 3600
  
  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60)
  
  if (days) {
    return `${days} day, ${hours} hours, ${minutes} minutes`
  } else if (hours) {
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
  } else if (minutes) {
    return `${minutes} minutes, ${seconds} seconds`
  }
  
  return `${seconds} second(s)`
  }

bot.on("message", async msg => {
  // eslint-disable-line
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(PREFIX)) return undefined;

  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);

  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(PREFIX.length);
  

  if (command === "join") {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.send("You Join Your Voice")
    msg.react('👌');
    msg.member.voiceChannel.join();
  }

  if (command === "leave" || command === "dc" || command === "disconnect") {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.send("You Not Join Voice")
    msg.react('👋');
    queue.delete(msg.guild.id);
  }

  if (command === "play" || command === "p") {
    msg.delete(2000)
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.send(
        "You Not Join Voice"
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send(
        "Sorry, but i need **`CONNECT`** permissions to proceed!"
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.send(
        "Sorry, but i need **`SPEAK`** permissions to proceed!"
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      let embed = new Discord.RichEmbed()
      .setColor(COLOR)
    .setDescription("`Playlist " + playlist.title + " Success Add In List`")
    .setTimestamp()
      return msg.channel.send(embed);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;
          const embed1 = new Discord.RichEmbed()
            .setTitle(emoji("732128321655144478") + "Select Music" + emoji("732128321655144478"))
            .setDescription(`${videos.map(video2 => `${++index}. ${video2.title}`).join("\n")}\n**Select 1 - 10 Never Use a Prefix!** ` )
            .setColor(COLOR)
          .setFooter("Sorry if the music stops suddenly")
          msg.channel.sendEmbed(embed1).then(message => {
            message.delete(20000);
          });

          // eslint-disable-next-line max-depth
          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 20000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.send(
              "<@" +
                msg.author.id +
                ">" +
                " ```No Selected Song Selection Canceled ...```"
            );
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send("```⚠️ Error Chat Owner ⚠️```\n```" + error + "```");
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  }
  else if (command === "skip" || command === "s" || command === "next") {
    if (!msg.member.voiceChannel)
      return msg.channel.send(
        "```You Not Join Voice```"
      );
    if (!serverQueue)
      return msg.channel.send(
        "```There are no songs that I can skip.```"
      );
    serverQueue.connection.dispatcher.end("Perintah skip telah digunakan!");
    msg.channel.send(`⏭️ **|** Music Skip`);
    return undefined;
  } else if (command === "stop") {
    if (!msg.member.voiceChannel)
      return msg.channel.send(
        "```You Not Join Voice```"
      );
    if (!serverQueue)
      return msg.channel.send(
        "```There is no song I can stop.```"
      );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("Perintah berhenti telah digunakan!");
    msg.channel.send(`⏹️ **|** Music Stop`);
    return undefined;
  } 
  else if (command === "volume" || command === "vol" || command === "v") {
    if (!msg.member.voiceChannel)
      return msg.channel.send(
        "You Not Join Voice"
      );
    if (!serverQueue) return msg.channel.send("There Is No Song Which Can Use Volume");
    if (!args[1]) return msg.channel.send("```Volume : " + serverQueue.volume + "%```")
    if (isNaN(args[1]) || args[1] > 200) return msg.channel.send("Volume only can be set in range **1** - **200**.");
    let volume = serverQueue.volume
    let volemoji;
    if(volume > 200){volemoji = `🔊`;}else if(volume <= 150 && volume > 100){volemoji = `🔉`;}else if(volume > 0 && volume <= 50){volemoji = `🔈`;}
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 200);
    return msg.channel.send(`🔊 **|** Volume Set : ${args[1]}`);
    
  }else if (command === "volumea") {
    if(msg.author.id !== `${ID}`) return msg.channel.send("Lu siapa!")
    if (!msg.member.voiceChannel)
      return msg.channel.send(
        "You Not Join Voice"
      );
    if (!serverQueue) return msg.channel.send("There Is No Song Which Can Use Volume");
    if (!args[1]) return msg.channel.send("```Volume : " + serverQueue.volume + "%```")
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 200);
    let embed = new Discord.RichEmbed()
      .setColor(COLOR)
      .setDescription("```Volume Set : " + args[1] + "```")
      .setTimestamp()
    .setFooter(`Message From : ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL);
    return msg.channel.sendEmbed(embed);

  } else if (command === "nowplaying" || command === "np") {
    const serverQueue = queue.get(msg.guild.id);
    if (!serverQueue) return msg.channel.send("There is no song where you can see the song playing");
    const embedNP = new Discord.RichEmbed()
    .setTitle(`**Now Playing** ` + emoji("615732214797303849"))
    .setColor(COLOR)
    .addField(`**Uploader**`, `${serverQueue.songs[0].channel}`, true)
    .addField(`**Request**`, `${serverQueue.songs[0].request}`)
    .addField(`**Loop**`, `${serverQueue.loop === true ? "enable" : "disabled"}`)
    .addField(`**Duration**`, `**\`${serverQueue.songs[0].durationh}\`** Hours, **\`${serverQueue.songs[0].durationm}\`** Minutes and **\`${serverQueue.songs[0].durations}\`** Seconds`, true)
    .setImage(`https://i.ytimg.com/vi/${serverQueue.songs[0].id}/sddefault.jpg`)
    .setDescription(`[${serverQueue.songs[0].title}](https://www.youtube.com/watch?v=${serverQueue.songs[0].id})`)
    return msg.channel.send(embedNP);
  } else if (
    command === "queue" ||
    command === "q" ||
    command === "list" ||
    command === "daftarputar"
  ) {
    
    if (!serverQueue) return msg.channel.send("No Song Can See Music Lists");
    let index = 0;
    //  //  //
    const embedqu = new Discord.RichEmbed()
      .setTitle("List Song")
      .setDescription(
        "```" +
          serverQueue.songs
            .map(song => `${++index}. ${song.title}`)
            .join("\n") +
          "```\n**Now Playing**\n( " +
          `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})` +
          " )"
      )
    .setTimestamp()
      .setColor(COLOR)
    .setFooter(`Message From : ${msg.author.username}#${msg.author.discriminator}`, bot.user.displayAvatarURL);
    return msg.channel.send(embedqu);
  }
   else if (command === "pause" || command === "jeda") {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
   return msg.channel.send(`⏸️ **|** Success Pause!`);
    }
    return msg.channel.send("There is no song");
  } 
  else if (command === "resume") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
    return msg.channel.send(`⏯️ **|** Success Resume!`);
    }
    return msg.channel.send("There is no song");
  } else if (command === "loop") {
       if (!serverQueue)
      return msg.channel.send("There are no songs in the list")
    	if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return msg.channel.send(`🔁 **|** Loop ${serverQueue.loop === true ? "enabled" : "disabled"}!`);
	};
	return msg.channel.send("There is nothing playing.");
    bot.channels.get(`726737439951028285`).send(`Loop : ${serverQueue.loop === true ? "enabled" : "disabled"}\nIn Server ${msg.guild.name}`)
    console.log(`Loop ${serverQueue.loop === true ? "enable" : "disabled"}`)
  }
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`,
    channel: video.channel.title,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    durationh: video.duration.hours,
    publishedAt: video.publishedAt,
    request: msg.author.tag,
    guildname: msg.guild.name,
    idreq: msg.author.id,
    idguild: msg.guild.id
  };

  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      deleteMessage: msg.delete,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 40,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(msg.guild.id);
      return msg.channel.send(
        `I could not join the voice channel: **\`${error}\`**`
      );
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    let embed = new Discord.RichEmbed()
    .setTitle("**Success added to the list** " + emoji("615732163727589377") )
    .setColor(COLOR)
    .addField(`**Uploader**`, `${song.channel}`, true)
    .addField(`**Request**`, `${song.request}`)
    .addField(`**Duration**`, `**\`${song.durationh}\`** Hours, **\`${song.durationm}\`** Minutes and **\`${song.durations}\`** Seconds`, true)
    .setThumbnail(`https://i.ytimg.com/vi/${song.id}/sddefault.jpg`)
    .setDescription(`[${song.title}](https://www.youtube.com/watch?v=${song.id})`)
    
    let logqueue = new Discord.RichEmbed()
    .setTitle("**Success added to the list** " + emoji("615732163727589377") )
    .setColor(COLOR)
    .addField(`**Uploader**`, `${song.channel}`, true)
    .addField(`**Request**`, `${song.request}\n(ID: ${song.idreq})`)
    .addField(`**Server**`, `${song.guildname}\n(ID: ${song.idguild})`)
    .addField(`**Loop**`, `${serverQueue.loop === true ? "enabled" : "disabled"}`)
    .addField(`**Duration**`, `**\`${song.durationh}\`** Hours, **\`${song.durationm}\`** Minutes and **\`${song.durations}\`** Seconds`, true)
    .setThumbnail(`https://i.ytimg.com/vi/${song.id}/sddefault.jpg`)
    .setDescription(`[${song.title}](https://www.youtube.com/watch?v=${song.id})`) 
    
    msg.channel.send(embed);
    bot.channels.get(`726737439951028285`).send(logqueue)
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.textChannel.send("No Music, I'm Out! " + emoji("709983161807011910"))
    serverQueue.voiceChannel.leave();
    return queue.delete(guild.id);
  }
    
    const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === "Stream is not generating quickly enough.")
        console.log("Song Ended.");
      else console.log(reason);
      
     const shiffed = serverQueue.songs.shift();
    if (serverQueue.loop === true) {
	   	serverQueue.songs.push(shiffed); 
	    };
      play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

  let playingemb = new Discord.RichEmbed()
    .setTitle(`**Now Playing!** ` + emoji("664327173213257748"))
    .setColor(COLOR)
    .addField(`**Uploader**`, `${song.channel}`, true)
    .setFooter(`Published » ${song.publishedAt}`)
    .addField(`**Request**`, `${song.request}`)
    .addField(`**Loop**`, `${serverQueue.loop === true ? "enabled" : "disabled"}`)
    .addField(`**Duration**`, `**\`${song.durationh}\`** Hours, **\`${song.durationm}\`** Minutes and **\`${song.durations}\`** Seconds`, true)
    .setThumbnail(`https://i.ytimg.com/vi/${song.id}/sddefault.jpg`)
    .setDescription(`[${song.title}](https://www.youtube.com/watch?v=${song.id})`)

  let logmusic = new Discord.RichEmbed()
    .setTitle(`**Now Playing!** ` + emoji("664327173213257748"))
    .setColor(COLOR)
    .addField(`**Uploader**`, `${song.channel}`, true)
    .setFooter(`Published » ${song.publishedAt}`)
    .addField(`**Request**`, `${song.request}\n(ID: ${song.idreq})`)
    .addField(`**Server**`, `${song.guildname}\n(ID: ${song.idguild})`)
    .addField(`**Loop**`, `${serverQueue.loop === true ? "enabled" : "disabled"}`)
    .addField(`**Duration**`, `**\`${song.durationh}\`** Hours, **\`${song.durationm}\`** Minutes and **\`${song.durations}\`** Seconds`, true)
    .setThumbnail(`https://i.ytimg.com/vi/${song.id}/sddefault.jpg`)
    .setDescription(`[${song.title}](https://www.youtube.com/watch?v=${song.id})`)

    serverQueue.textChannel.send(playingemb);
  
  bot.channels.get(`726737439951028285`).send(logmusic)
}
bot.login(TOKEN);
