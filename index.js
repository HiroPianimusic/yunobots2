const Discord = require("discord.js");
const { Client, Util } = require("discord.js");
const { TOKEN, PREFIX, GOOGLE_API_KEY, INSTAGRAM, ID, AUTHOR, COLOR, LEVEL, DBLTOKEN} = require("./config");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const bot = new Client({ disableEveryone: true });
const moment = require("moment");
const Canvas = require("canvas");
require("./server.js");
const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();
const client = new Discord.Client();
const create = '2 April 2020';
const fs = require("fs");
const db = require('quick.db');
let m = require('moment-duration-format'),
    os = require('os'),
    cpuStat = require('cpu-stat'),
    ms = require('ms'),
    fetch = require('node-fetch'),
    parse_ms = require('parse-ms')
const dateformat = require('dateformat')
const getArtistTitle = require('get-artist-title');
const axios = require('axios');
const cheerio = require('cheerio');
const oneLinerJoke = require('one-liner-joke');
const https = require('https')
const snekfetch = require('snekfetch');
const got = require('got');
const { stringify } = require('querystring'); 
const weather = require("weather-js")
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();
var aq = require('animequote');
const translate = require('google-translate-api');
const DBL = require("dblapi.js");
const dbl = new DBL(DBLTOKEN, client);
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);





///////////////////////////////////// TOP.GG //////////////////////////////////////////////////
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})


///////////////////////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////CLIENT////////////////////////////////////////////////////////////////////

const config = require('./config.json');



client.on("message", async message => {
    if (message.author.bot) return; // ignore bots

    // if the user is not on db add the user and change his values to 
  
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
  
  
  
  if (message.content.startsWith(`${PREFIX}message`)) {
    const idch = args[0];
    const delaynya = args[1];
    let reply = message.content;
    bot.channels.get(idch).send(reply.replace(`${PREFIX}message ${idch} ${delaynya}`, "")).then(message => {
                                                                                    message.delete(delaynya)
    })
    message.channel.send("Success Send Message");
  }
  
  
  if (message.content.startsWith(`${PREFIX}test1`)) {
   const status1 = args[0]
    client.user.setStatus(status1)
  .then(console.log)
  .catch(console.error);
  }
  
  if (message.content.startsWith(`${PREFIX}changenm`)) {
    if (message.author.id !== `${ID}`) return message.channel.send("You not owner").then(message => { message.delelete(5000)})
    message.delete()
    const name09 = args.join(" ")
    client.user.setUsername(name09);
    message.channel.send("Change Name Success!")
  }
  
  if (message.content.startsWith(`${PREFIX}changeava`)) {
    if (message.author.id !== `${ID}`) return message.channel.send("You not owner!").then(message => { message.delete(5000)})
    message.delete()
    const link = args[0]
    client.user.setAvatar(link);
    message.channel.send("Avatar Success Change!")
  }
  
  
  if (message.content.startsWith(`${PREFIX}addRole`)) {
    const rolees = args[0]
    const role = message.guild.roles.find('name', rolees);
   message.member.addRole(role)
  .then(console.log)
  .catch(console.error);
    
  }
  
  if (message.content.startsWith(`${PREFIX}removeRole`)) {
    const roless = args[0]
    const roles1 = message.guild.roles.find('name', roless);
    message.member.removeRole(roles1)
  .then(console.log)
  .catch(console.error)
  
  }
  
  if (message.content.startsWith(`${PREFIX}setName`)) {
    message.delete()
    const namecn = args[0]
    message.member.setNickname(namecn)
    .then(console.log)
    .catch(console.error)
  }
               
  
  // economy
  
  if (message.content.startsWith(`${PREFIX}helpeconomy`)) {
    let embed = new Discord.RichEmbed()
    .setTitle("Money Man Help Centre [Prefix !!!]")
    .addField("Economy Commands", "`work` `beg` `rob` `pay` `balance` `profile` `withdraw` `deposit` `daily` `weekly` `store` `buy` `sell`")
    .addField("Gambling Commmands", "`roulette` `slots`")
    .addField("Economy Extra Commands", "`storeinfo [item]`")
    .setColor("#FFFFFF")
    message.channel.send(embed)




  }
  
  if (message.content.startsWith(`${PREFIX}bal`)) {
    let user = message.mentions.members.first() || message.author;

  let bal = db.fetch(`money_${message.guild.id}_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;

  let moneyEmbed = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`**${user}'s Balance**\n\nPocket: ${bal}\nBank: ${bank}`);
  message.channel.send(moneyEmbed)
};
  
  
  
  
  if (message.content.startsWith(`${PREFIX}daily`)) {
    let user = message.author;

  let timeout = 86400000;
  let amount = 1000;

  let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
    let timeEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You've already collected your daily reward `);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You've collected your daily reward of ${amount} coins`);
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`daily_${message.guild.id}_${user.id}`, Date.now())


  }
};
  
  if (message.content.startsWith(`${PREFIX}profile`)) {
    let user = message.mentions.members.first() || message.author;

  let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
  if (money === null) money = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;

  let vip = await db.fetch(`bronze_${message.guild.id}_${user.id}`)
    if(vip === null) vip = 'None'
    if(vip === true) vip = 'Bronze'

  let shoes = await db.fetch(`nikes_${message.guild.id}_${user.id}`)
  if(shoes === null) shoes = '0'

  let newcar = await db.fetch(`car_${message.guild.id}_${user.id}`)
  if(newcar === null) newcar = '0'

  let newhouse = await db.fetch(`house_${message.guild.id}_${user.id}`)
  if(newhouse === null) newhouse = '0'

  let moneyEmbed = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`**${user}'s Profile**\n\nPocket: ${money}\nBank: ${bank}\nVIP Rank: ${vip}\n\n**Inventory**\n\nNikes: ${shoes}\nCars: ${newcar}\nMansions: ${newhouse}`);
  message.channel.send(moneyEmbed)
};
  
  if (message.content.startsWith(`${PREFIX}beg`)) {
    let user = message.author;

  let timeout = 180000;
  let amount = 5;

  let beg = await db.fetch(`beg_${message.guild.id}_${user.id}`);

  if (beg !== null && timeout - (Date.now() - beg) > 0) {
    let time = ms(timeout - (Date.now() - beg));
  
    let timeEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You've begged and received ${amount} coins`);
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`beg_${message.guild.id}_${user.id}`, Date.now())


  }
};
  
  
  if (message.content.startsWith(`${PREFIX}work`)) {
    let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
        message.channel.send(timeEmbed)
      } else {

        let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 80) + 1;
        let embed1 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You worked as a ${replies[result]} and earned ${amount} coins`);
        message.channel.send(embed1)
        
        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`work_${message.guild.id}_${user.id}`, Date.now())
    };
  }
  
  
  
  if (message.content.startsWith(`${PREFIX}withdraw`)) {
    let user = message.author;

  let member = db.fetch(`money_${message.guild.id}_${user.id}`)
  let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)

  if (args[0] == 'all') {
    let money = await db.fetch(`bank_${message.guild.id}_${user.id}`)
    
    db.subtract(`bank_${message.guild.id}_${user.id}`, money)
    db.add(`money_${message.guild.id}_${user.id}`, money)
    let embed5 = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You have withdrawn all your coins from your bank`);
  message.channel.send(embed5)
  
  } else {

  let embed2 = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`Specify an amount to withdraw`);
  
  if (!args[0]) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You can't withdraw negative money`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You don't have that much money in the bank`);

  if (member2 < args[0]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You have withdrawn ${args[0]} coins from your bank`);

  message.channel.send(embed5)
  db.subtract(`bank_${message.guild.id}_${user.id}`, args[0])
  db.add(`money_${message.guild.id}_${user.id}`, args[0])
  }
  }
  
  if (message.content.startsWith(`${PREFIX}weekly`)) {
    let user = message.author;
  let timeout = 604800000;
  let amount = 500;

  let weekly = await db.fetch(`weekly_${message.guild.id}_${user.id}`);

  if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    let time = ms(timeout - (Date.now() - weekly));
  
    let timeEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You have already collected your weekly reward\n\nCollect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You've collected your weekly reward of ${amount} coins`);
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`weekly_${message.guild.id}_${user.id}`, Date.now())


  }
};
  
  
  if (message.content.startsWith(`${PREFIX}storeinfo`)) {
    if (args[0] == 'bronze') {
    
      let embed = new Discord.RichEmbed()
      .setDescription("**Bronze Rank**\n\nBenefits: Chance to get more coins from robbing someone")
      .setColor("#FFFFFF")
      message.channel.send(embed)
    } else if(args[0] == 'nikes') {
      let embed = new Discord.RichEmbed()
      .setDescription("**Fresh Nikes**\n\nBenefits: Chance to win coins, roles on our Discord Server + More by leading the leaderboard")
      .setColor("#FFFFFF")
      message.channel.send(embed)
    } else if(args[0] == 'car') {
      let embed = new Discord.RichEmbed()
      .setDescription("**Car**\n\nBenefits: Chance to win coins, roles on our Discord Server + More by leading the leaderboard")
      .setColor("#FFFFFF")
      message.channel.send(embed)
  } else if(args[0] == 'mansion') {
    let embed = new Discord.RichEmbed()
    .setDescription("**Mansion**\n\nBenefits: Chance to win coins, roles on our Discord Server + More by leading the leaderboard")
    .setColor("#FFFFFF")
    message.channel.send(embed)
  }

  }
  
  if (message.content.startsWith(`${PREFIX}store`)) {
    let embed = new Discord.RichEmbed()
    .setDescription(`**VIP Ranks**\n\nBronze: 3500 Coins [!!!buy bronze]\n\n**Lifestyle Items**\n\nFresh Nikes: 600 [!!!buy nikes]\nCar: 800 [!!!buy car]\nMansion: 1200 [!!!buy mansion]`)
    .setColor("#FFFFFF")
    message.channel.send(embed)
  }
  
  if (message.content.startsWith(`${PREFIX}buy`)) {
    let user = message.author;

    let author = db.fetch(`money_${message.guild.id}_${user.id}`)

    let Embed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You need 2000 coins to purchase Bronze VIP`);

    if (args[0] == 'bronze') {
        if (author < 3500) return message.channel.send(Embed)
        
        db.fetch(`bronze_${message.guild.id}_${user.id}`);
        db.set(`bronze_${message.guild.id}_${user.id}`, true)

        let Embed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Purchased Bronze VIP For 3500 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 3500)
        message.channel.send(Embed2)
    } else if(args[0] == 'nikes') {
        let Embed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You need 600 coins to purchase some Nikes`);

        if (author < 600) return message.channel.send(Embed2)
       
        db.fetch(`nikes_${message.guild.id}_${user.id}`)
        db.add(`nikes_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Check:618736570337591296> Purchased Fresh Nikes For 600 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 600)
        message.channel.send(Embed3)
    } else if(args[0] == 'car') {
        let Embed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You need 800 coins to purchase a new car`);

        if (author < 800) return message.channel.send(Embed2)
       
        db.fetch(`car_${message.guild.id}_${user.id}`)
        db.add(`car_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Purchased a New Car For 800 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 800)
        message.channel.send(Embed3)
    } else if(args[0] == 'mansion') {
        let Embed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You need 1200 coins to purchase a Mansion`);

        if (author < 1200) return message.channel.send(Embed2)
       
        db.fetch(`house_${message.guild.id}_${user.id}`)
        db.add(`house_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Purchased a Mansion For 1200 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 1200)
        message.channel.send(Embed3)
    } else {
        let embed3 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription('Enter an item to buy')
        message.channel.send(embed3)
    }

  }
  
  if (message.content.startsWith(`${PREFIX}sell`)) {
    let user = message.author;

    if(args[0] == 'nikes') {
        let Embed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You don't have Nikes to sell`);

        let nikeses = await db.fetch(`nikes_${message.guild.id}_${user.id}`)

        if (nikeses < 1) return message.channel.send(Embed2)
       
        db.fetch(`nikes_${message.guild.id}_${user.id}`)
        db.subtract(`nikes_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Sold Fresh Nikes For 600 Coins`);

        db.add(`money_${message.guild.id}_${user.id}`, 600)
        message.channel.send(Embed3)
    } else if(args[0] == 'car') {
        let Embed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You don't have a Car to sell`);

       let cars = await db.fetch(`car_${message.guild.id}_${user.id}`)

        if (cars < 1) return message.channel.send(Embed2)
       
        db.fetch(`car_${message.guild.id}_${user.id}`)
        db.subtract(`car_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Sold a Car For 800 Coins`);

        db.add(`money_${message.guild.id}_${user.id}`, 800)
        message.channel.send(Embed3)
    } else if(args[0] == 'mansion') {
        let Embed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You don't have a Mansion to sell`);

        let houses = await db.fetch(`house_${message.guild.id}_${user.id}`)

        if (houses < 1) return message.channel.send(Embed2)
       
        db.fetch(`house_${message.guild.id}_${user.id}`)
        db.subtract(`house_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Sold a Mansion For 1200 Coins`);

        db.add(`money_${message.guild.id}_${user.id}`, 1200)
        message.channel.send(Embed3)
    };

  }
  
  if (message.content.startsWith(`${PREFIX}roulette`)) {
    let user = message.author;

  function isOdd(num) { 
	if ((num % 2) == 0) return false;
	else if ((num % 2) == 1) return true;
}
    
let colour = args[0];
let money = parseInt(args[1]);
let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)

let random = Math.floor(Math.random() * 37);

let moneyhelp = new Discord.RichEmbed()
.setColor("#FFFFFF")
.setDescription(`Specify an amount to gamble | m!roulette <color> <amount>`);

let moneymore = new Discord.RichEmbed()
.setColor("#FFFFFF")
.setDescription(`You are betting more than you have`);

let colorbad = new Discord.RichEmbed()
.setColor("#FFFFFF")
.setDescription(`Specify a color | Red [1.5x] Black [2x] Green [15x]`);


    if (!colour)  return message.channel.send(colorbad);
    colour = colour.toLowerCase()
    if (!money) return message.channel.send(moneyhelp); 
    if (money > moneydb) return message.channel.send(moneymore);
    
    if (colour == "b" || colour.includes("black")) colour = 0;
    else if (colour == "r" || colour.includes("red")) colour = 1;
    else if (colour == "g" || colour.includes("green")) colour = 2;
    else return message.channel.send(colorbad);
    
    
    
    if (random == 0 && colour == 2) { // Green
        money *= 15
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed1 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You won ${money} coins\n\nMultiplier: 15x`);
        message.channel.send(moneyEmbed1)
        console.log(`${message.author.tag} Won ${money} on green`)
    } else if (isOdd(random) && colour == 1) { // Red
        money = parseInt(money * 1.5)
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You won ${money} coins\n\nMultiplier: 1.5x`);
        message.channel.send(moneyEmbed2)
    } else if (!isOdd(random) && colour == 0) { // Black
        money = parseInt(money * 2)
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed3 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You won ${money} coins\n\nMultiplier: 2x`);
        message.channel.send(moneyEmbed3)
    } else { // Wrong
        db.subtract(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed4 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You lost ${money} coins\n\nMultiplier: 0x`);
        message.channel.send(moneyEmbed4)
    }
  } 
  
  if (message.content.startsWith(`${PREFIX}add`)) {
    let ownerID = '331684540223586304'
  if(message.author.id !== ownerID) return;

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.add(`money_${message.guild.id}_${user.id}`, args[1])
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

    let moneyEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`Added ${args[1]} coins\n\nNew Balance: ${bal}`);
    message.channel.send(moneyEmbed)

};
  
  if (message.content.startsWith(`${PREFIX}remove`)) {
    let ownerID = '331684540223586304'
  if(message.author.id !== ownerID) return;

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.subtract(`money_${message.guild.id}_${user.id}`, args[1])
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

    let moneyEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`Removed ${args[1]} coins\n\nNew Balance: ${bal}`);
    message.channel.send(moneyEmbed)

};
  
  
  
  //lain lain
  
  if (message.content.startsWith(`${PREFIX}bio`)) {
    message.delete()
    const name = args[0];
    const age = args[1];
    const sex = args[2];
    const hobby = args[3];
    const game = args[4];
    
    const pesan = "`!!!bio <name> <age> <sex> <hobby> <game>`"
    
    if (!name) return message.channel.send(pesan)
    if (!age) return message.channel.send(pesan)
    if (!sex) return message.channel.send(pesan)
    if (!hobby) return message.channel.send(pesan)
    if (!game) return message.channel.send(pesan)
    
    let embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setTitle(":pencil:───✯BIO✯───:pencil:")
    .addField("**:card_index: Name**", name)
    .addField("**:bar_chart: Age**", age)
    .addField("**:label: Sex**", sex)
    .addField("**:book: Hobi**", hobby)
    .addField("**:video_game: Game**", game)
    message.channel.send(embed);
  
  }
  
  if (message.content.startsWith(`${PREFIX}translate`)) {
    const kata = args[0];
    const bahasa1 = args[1];
    const bahasa2 = args[2];
    const translate = require('google-translate-api');
    
    translate('You', {from: 'en', to: 'id'}).then(res => {
    console.log(res);
    console.log(res.text);
    //=> Ik spea Nederlands!
    console.log(res.from.text.autoCorrected);
    //=> false
    console.log(res.from.text.value);
    //=> I [speak] Dutch!
    console.log(res.from.text.didYouMean);
    //=> true
}).catch(err => {
    console.error(err);
});
  }
    
  
  if (message.content.startsWith(`${PREFIX}slap`)) {
    let slaps = ['https://i.imgur.com/4iPCfVO.gif', 'https://i.imgur.com/8g6t0a3.gif', 'https://i.imgur.com/u7bKmq0.gif', 'https://i.imgur.com/v1u3DpJ.gif', 'https://i.imgur.com/T7npUHy.gif', 'https://i.imgur.com/rDSHdbw.gif', 'https://i.imgur.com/VtbV4HW.gif', 'https://i.imgur.com/lzc81Yw.gif', 'https://i.imgur.com/MnfAJbs.gif'];
    let slapR = slaps[Math.floor(Math.random() * slaps.length)];
    let personslap = message.mentions.members.first();
    let quote = ['Oof', 'Ouch', 'That hurt', 'Wow', 'LOL', 'Yeet'];
    let quoter = quote[Math.floor(Math.random() * quote.length)];

    if (!personslap) {
        let personslap = 'nobody';

        let embed = new Discord.RichEmbed()
            .setDescription(`**<@${message.author.id}> just slapped ${personslap}! ${quoter}!**`)
            .setImage(slapR)
            .setColor(COLOR);

        message.channel.send(embed);
        return;
    }

    if (personslap.id === message.author.id) {
        let personslap = 'they own damn selves';
        let embed = new Discord.RichEmbed()
            .setDescription(`**<@${message.author.id}> just slapped ${personslap}! ${quoter}!**`)
            .setImage(slapR)
            .setColor(COLOR);

        message.channel.send(embed);
        return;
    }

    if (personslap.id === client.user.id) {
        let personslap = 'me, the fricc?';
        let embed = new Discord.RichEmbed()
            .setDescription(`**<@${message.author.id}> just slapped ${personslap}! ${quoter}!**`)
            .setImage(slapR)
            .setColor(COLOR);

        message.channel.send(embed);
        return;
    }

    let embed = new Discord.RichEmbed()
        .setDescription(`**<@${message.author.id}> just slapped ${personslap}! ${quoter}!**`)
        .setImage(slapR)
        .setColor(COLOR);

    message.channel.send(embed);
  }
  
  
  
   if (message.content.startsWith(`${PREFIX}snipe`)) {
     String.prototype.embedify = function() {
        return new Discord.RichEmbed().setColor(client.config.embedColor).setDescription(this)
    }
    
    let snipe = client.snipeMap.get(message.guild.id)
    if(!snipe) return message.channel.send('Could not find a message that was deleted.'.embedify())

    if(args[0] == 'image') {
        if(!args[1]) return message.channel.send('Please provide a message to retrieve the image from!'.embedify())
        let image = snipe[args[1] - 1]
        if(!image[1]) return message.channel.send('That message does not have an attached (deleted) image!'.embedify())
        console.log(image[1])
        return message.channel.send(new Discord.RichEmbed().setColor(client.config.embedColor).setImage(image[1]))
    }

    let counter = 0

    return message.channel.send(`${snipe.map(msg => `**${++counter} -** ${msg[0].content ? `${msg[0].content}${!msg[1] ? '' : '\n[IMAGE WAS DELETED]'}` : (!msg[1] ? '' : '[IMAGE WAS DELETED]')}\n**Author -** <@${msg[0].author.id}>`).join('\n\n')}`.embedify().addField('NOTE:', `Message appear in order, newest deleted message is \`1.\` ,etc. Only the last five deleted messages are preserved. Messages above a 200 character limit are truncated to fit within the embed. **Due to popular request, one image is now preserved from each message if an image was present!**\nTo view the images, please type \`yabe snipe image <number of message to get the image from>\``))
   }
  
  if (message.content.startsWith(`${PREFIX}anu...`)) {
    if (message.author.id !== `${ID}`)
      return message.channel.send("You Not Admin...")
    const randomanime = require("random-anime");
    const anime = randomanime.nsfw();
    const embed = new Discord.RichEmbed()
    .setImage(`${anime.split("?")[0]}?size=4096`)
    .setFooter("This Message Will Delete By Myself Within Seconds ")
    message.channel.send(embed).then(message => message.delete(5000))
    message.delete(1)
  }
  
  
  if (message.content.startsWith(`${PREFIX}lyrics`)) {
    const songName = args.join(" ")
    if (!songName) return message.channel.send("Enter Song Name")
    const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { GENIUS } = require("./config.js");
    
    if (
      songName == '' &&
      message.guild.musicData.isPlaying &&
      !message.guild.triviaData.isTriviaRunning
    ) {
      songName = message.guild.musicData.nowPlaying.title;
    } else if (songName == '' && message.guild.triviaData.isTriviaRunning) {
      return message.say('Please try again after the trivia has ended');
    } else if (songName == '' && !message.guild.musicData.isPlaying) {
      return message.say(
        'There is no song playing right now, please try again with a song name or play a song first'
      );
    }
    const sentMessage = await message.channel.send(
      '👀 Searching for lyrics 👀'
    );
    // get song id
    var url = `https://api.genius.com/search?q=${encodeURI(songName)}`;

    const headers = {
      Authorization: `Bearer ${GENIUS}`
    };
    try {
      var body = await fetch(url, { headers });
      var result = await body.json();
      const songID = result.response.hits[0].result.id;
      // get lyrics
      url = `https://api.genius.com/songs/${songID}`;
      body = await fetch(url, { headers });
      result = await body.json();

      const song = result.response.song;

      let lyrics = await getLyrics(song.url);
      lyrics = lyrics.replace(/(\[.+\])/g, '');
      if (!lyrics) {
        return message.say(
          'No lyrics have been found for your query, please try again and be more specific.'
        );
      }
      if (lyrics.length > 4095)
        return message.say(
          'Lyrics are too long to be returned in a message embed'
        );
      if (lyrics.length < 2048) {
        const lyricsEmbed = new MessageEmbed()
          .setColor('#00724E')
          .setDescription(lyrics.trim());
        return sentMessage.edit('', lyricsEmbed);
      } else {
        // 2048 < lyrics.length < 4096
        const firstLyricsEmbed = new MessageEmbed()
          .setColor('#00724E')
          .setDescription(lyrics.slice(0, 2048));
        const secondLyricsEmbed = new MessageEmbed()
          .setColor('#00724E')
          .setDescription(lyrics.slice(2048, lyrics.length));
        sentMessage.edit('', firstLyricsEmbed);
        message.channel.send(secondLyricsEmbed);
        return;
      }
    } catch (e) {
      console.error(e);
      return sentMessage.edit(
        'Something when wrong, please try again or be more specific'
      );
    }
    async function getLyrics(url) {
      const response = await fetch(url);
      const text = await response.text();
      const $ = cheerio.load(text);
      return $('.lyrics')
        .text()
        .trim();
    }
    
  }
  
  
  
  if (message.content.startsWith(`${PREFIX}furry`)) {
    const request = require('node-superfetch');
    const num = Math.floor(Math.random() * 100000);
    message.channel.send(
      {files: [`https://thisfursonadoesnotexist.com/v2/jpgs/seed${num.toString().padStart(5, '0')}.jpg`]}
    )
    
  }
  
  
  
  
  if (message.content.startsWith(`${PREFIX}waifu`)) {
  const num = Math.floor(Math.random() * 100000);
    message.channel.send(
      {files: [`https://www.thiswaifudoesnotexist.net/example-${num}.jpg`]}
    )
  }
  
  
  
  if (message.content.startsWith(`${PREFIX}birds`)) {
    const request = require('node-superfetch');
    const { body } = await request
				.get('https://shibe.online/api/birds')
				.query({
					count: 1,
					urls: true,
					httpsUrls: true
				});
    message.channel.send(
      { files: [body[0]] }
    )
  }
  
  
  
  if (message.content.startsWith(`${PREFIX}duck`)) {
    const request = require('node-superfetch');
    const { body } = await request.get('https://random-d.uk/api/v1/random');
    let embed = new Discord.RichEmbed()
		return message.channel.send({ files: [body.url] });
		}
  
  
  if (message.content.startsWith(`${PREFIX}bunny`)) {
    const request = require('node-superfetch');
    const { body } = await request
				.get('https://api.bunnies.io/v2/loop/random/')
				.query({ media: 'gif,png' });
			let fileToSend;
			let fileType = 'gif';
			const gif = await request.get(body.media.gif);
			if (Buffer.byteLength(gif.body) > 8e+6) {
				const poster = await request.get(body.media.poster);
				fileToSend = poster.body;
				fileType = 'png';
			} else {
				fileToSend = gif.body;
			}
		return message.channel.send({ files: [{ attachment: fileToSend, name: `${body.id}.${fileType}` }] });
		}
  
  
  if (message.content.startsWith(`${PREFIX}zodiac`)) {
    const day = parseInt(args[0]);
        const month = parseInt(args[1]);

        if (!month) {
            return message.reply(' please enter a valid number for month.');
        }

        if (month < 1 || month > 12) {
            return message.reply(' please enter a valid month [1, 12].');
        }

        if (!day) {
            return message.reply(' please enter a valid number for day.');
        }

        if (month === 1) {
			if (day >= 1 && day <= 19) return message.reply(', your zodiac is Capricorn');
			if (day >= 20 && day <= 31) return message.reply(', your zodiac is Aquarius');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 2) {
			if (day >= 1 && day <= 18) return message.reply(' your zodiac is Aquarius');
			if (day >= 19 && day <= 29) return message.reply(' your zodiac is Pisces');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 3) {
			if (day >= 1 && day <= 20) return message.reply(' your zodiac is Pisces');
			if (day >= 21 && day <= 31) return message.reply(' your zodiac is Aries');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 4) {
			if (day >= 1 && day <= 19) return message.reply(' your zodiac is Aries');
			if (day >= 20 && day <= 31) return message.reply(' your zodiac is Taurus');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 5) {
			if (day >= 1 && day <= 20) return message.reply(' your zodiac is Taurus');
			if (day >= 21 && day <= 31) return message.reply(' your zodiac is Gemini');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 6) {
			if (day >= 1 && day <= 20) return message.reply(' your zodiac is Gemini');
			if (day >= 21 && day <= 31) return message.reply(' your zodiac is Cancer');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 7) {
			if (day >= 1 && day <= 22) return message.reply(' your zodiac is Cancer');
			if (day >= 23 && day <= 31) return message.reply(' your zodiac is Leo');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 8) {
			if (day >= 1 && day <= 22) return message.reply(' your zodiac is Leo');
			if (day >= 23 && day <= 31) return message.reply(' your zodiac is Virgo');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 9) {
			if (day >= 1 && day <= 22) return message.reply(' your zodiac is Virgo');
			if (day >= 23 && day <= 31) return message.reply(' your zodiac is Libra');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 10) {
			if (day >= 1 && day <= 22) return message.reply(' your zodiac is Libra');
			if (day >= 23 && day <= 31) return message.reply(' your zodiac is Scorpio');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 11) {
			if (day >= 1 && day <= 21) return message.reply(' your zodiac is Scorpio');
			if (day >= 22 && day <= 31) return message.reply(' your zodiac is Sagittarius');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 12) {
			if (day >= 1 && day <= 21) return message.reply(' your zodiac is Sagittarius');
			if (day >= 22 && day <= 31) return message.reply(' your zodiac is Capricorn');
			return message.reply(' please enter a valid date.');;
        } 
        else {
			return message.reply(' please enter a valid date.');;
		}


    }
  
  
  
  
  
  if (message.content.startsWith(`${PREFIX}roleinfo`)) {
    let inline = true

    let role = args.join(` `)
    if(!role) return message.reply("Specify a role!");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("Couldn't find that role.");

    const status = {
        false: "No",
        true: "Yes"
      }

    let roleemebed = new Discord.RichEmbed()
    .setColor("#00ff00")
    .addField("ID", gRole.id, inline )
    .addField("Name", gRole.name, inline)
    .addField("Mention", `\`<@${gRole.id}>\``, inline)
    .addField("Hex", gRole.hexColor, inline)
    .addField("Members", gRole.members.size, inline)
    .addField("Position", gRole.position, inline)
    .addField("Hoisted", status[gRole.hoist], inline)
    .addField("Mentionable", status[gRole.mentionable], inline)
    .addField("Managed", status[gRole.managed], inline)
    
    message.channel.send(roleemebed);

  }
  
  
  
  if (message.content.startsWith(`${PREFIX}8ball`)) {
    //!8ball question
    if(!args[1]) return message.reply("Plesae enter a full question with 2 or more words!");
    let replies = ["Yes", "No", "I don't know", "Ask again later!", "Cyka", "I am not sure!", "Pls No", "You tell me", "Without a doubt", "Cannot predict now", "Without a doubt", ];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.join(" ");

    let ballembed = new Discord.RichEmbed()

    .setAuthor(message.author.username)
    .setColor("#00ff00")
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.channel.send(ballembed)

    message.delete();


  }
  
  
  if (message.content.startsWith(`${PREFIX}028198392∆∆`)) {
    let args = message.content.split(/[ ]+/);
    let from = args[1];
    let lang = args[2];
    let suffix = args.slice(3).join(' ');
    if (!suffix) message.channel.send({
        embed: {
            color: 0xff2727,
            description: `:warning: **${message.author.username}**, You didn't give me anything to translate.\n{m!translate \`language\` \`input\`}`,
            timestamp: new Date(),
            footer: {
                text: 'API Lantancy is ' + `${Date.now() - message.createdTimestamp}` + ' ms'
            }
        }
    });
    if (!lang) return;
    translate(suffix, {from: from, to: lang}).then(res => {
        let embed = new Discord.RichEmbed()
        .setColor(`#4885ed`)
        .setAuthor(`Language detected: "${lang}"`, `http://nyamato.me/i/kbfuj.png`)
        .setDescription(`**Original**: ${suffix}\n**Translation**: ${res.text}`)
        .setTimestamp()
        .setFooter('API Lantancy is ' + `${Date.now() - message.createdTimestamp}` + ' ms', message.author.displayAvatarURL);
    return message.channel.send({
        embed: embed
    });
    }).catch(error => message.channel.send({
        embed: {
            color: 0xff2727,
            description: `:warning: **${message.author.username}**, ${error}`,
            timestamp: new Date(),
            footer: {
                text: 'API Lantancy is ' + `${Date.now() - message.createdTimestamp}` + ' ms'
            }
        }
    })); return message.react("👌");
};
  
  
  
  if (message.content.startsWith(`${PREFIX}google`)) {
    const google = require('google');
    let args = message.content.split(/[ ]+/);
    let suffix = args.slice(1).join(' ');
    if (!suffix) {
        message.channel.send({
            embed: {
                color: 0xff2727,
                description: `:warning: **${message.author.username}**, You didn't give me anything to search. {m!google \`input\`}`,
                footer: {
                    text: 'API Lantancy is ' + `${Date.now() - message.createdTimestamp}` + ' ms',
                }
            }
        });
    }
    google.resultsPerPage = 25;
    google(suffix, function (err, res) {
        if (err) message.channel.send({
            embed: {
                color: 0xff2727,
                description: `:warning: **${message.author.username}**, ${err}`,
                footer: {
                    text: 'API Lantancy is ' + `${Date.now() - message.createdTimestamp}` + ' ms',
                }
            }
        });
        for (var i = 0; i < res.links.length; ++i) {
            var link = res.links[i];
            if (!link.href) {
                res.next;
            } else {
                let embed = new Discord.RichEmbed()
                    .setColor(`#ffffff`)
                    .setAuthor(`Result for "${suffix}"`, `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`)
                    .setDescription(`**Link**: [${link.title}](${link.href})\n**Description**:\n${link.description}`)
                    .setTimestamp()
                    .setFooter('API Lantancy is ' + `${Date.now() - message.createdTimestamp}` + ' ms', message.author.displayAvatarURL);
                return message.channel.send({
                    embed: embed
                });
            } return message.react("👌");
        }
    });
}; 
    
  
  if (message.content.startsWith(`${PREFIX}picsnsfw`)) {
    if (!message.channel.nsfw) return message.channel.send("this channel is not active NSFW").then(message => message.delete(8000));
    const randomanime = require("random-anime");
    const anime = randomanime.nsfw();
    const embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setImage(`${anime.split("?")[0]}?size=4096`)
    message.channel.send(embed)
  }
  
  if (message.content.startsWith(`${PREFIX}picsanime`)) {
    const randomanime = require("random-anime");
const anime = randomanime.anime();
    const embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setImage(`${anime.split("?")[0]}?size=4096`);
    message.channel.send(embed)
  }
  
  if (message.content.startsWith(`${PREFIX}anisearch`)) {
    let anime2020 = await message.channel.send("Search Anime...")
    if (!args[0]) {
     return anime2020.edit("Please Give ous the name of anime");
      
    }
    //main part
        var search = message.content.split(/\s+/g).slice(1).join(" ");
        kitsu.searchAnime(search).then(async result => {
            if (result.length === 0) {
                return anime2020.edit(`No results found for **${search}**!`);
            }
          
          var anime = result[0]

            let embed = new Discord.RichEmbed()
                .setColor(COLOR)
                .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
                .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
                .addField('❯\u2000\Information', `•\u2000\**Japanese Name:** ${anime.titles.romaji}\n\•\u2000\**Age Rating:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
                .addField('❯\u2000\Stats', `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`, true)
                .addField('❯\u2000\Status', `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start Date:** ${anime.startDate}\n\•\u2000\**End Date:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)
            
                .setThumbnail(anime.posterImage.original, 100, 200);
          

            return anime2020.edit({ embed })
        }).catch(err => {
            console.log(err) //cathing error
            return anime2020.edit(`No results found for **${search}**!`);
        });
    }
  
  

    
  
  

  if (message.content.startsWith(`${PREFIX}mock`)) {
    const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');

    if (args.length < 1) return message.channel.send("Please provide some text to Mock")

    let mockEmbed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setDescription(args.map(randomizeCase))
    .setImage("https://cdn.discordapp.com/attachments/424889733043191810/425242569325150208/mock.jpg")

    message.channel.send(mockEmbed)

    message.delete();

  }
  
  
  if (message.content.startsWith(`${PREFIX}joke`)) {
    let giveMeAJoke = require('give-me-a-joke');
    giveMeAJoke.getRandomDadJoke(function(joke){
        message.channel.send(joke)
    })
  }
  
  
  if (message.content.startsWith(`${PREFIX}kill`)) {
    let killed = message.mentions.members.first();
if(!killed) {

let emb = new Discord.RichEmbed()
.setColor(COLOR)
.setDescription(`${message.author} decied to kill themself 💔 REST IN PEACE`)

message.channel.send(emb)

} else {

let emb = new Discord.RichEmbed()
.setColor(COLOR)
.setDescription(`${killed} was killed by ${message.author} 💔 REST IN PEACE`)

message.channel.send(emb)


}

  }
  
  
  
  if (message.content.startsWith(`${PREFIX}weather`)) {
    let botMsg09 = await message.channel.send("Wait Checking...")
    weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
        if(err) message.channel.send(err)

        //If the place entered is invalid
        if(result.length === 0) {
            message.channel.send("**please enter a valid location**")
            return;
        }

        //Variables
        var current = result[0].current //Variable for the current part of the JSON Output
        var location = result[0].location //This is a variable for the location part of the JSON Output

        //Sends weather log in embed
        let embed = new Discord.RichEmbed()
           .setDescription(`**${current.skytext}**`) //How the sky looks like
           .setAuthor(`Weather for ${current.observationpoint}`) //Shows the current location of the weater
           .setThumbnail(current.imageUrl) //Sets thumbnail of the embed
           .setColor(COLOR) //Sets the color of the embed
           .addField("Timezone", `UTC${location.timezone}`, true) //Shows the timezone
           .addField("Degree Type", location.degreetype, true) //Shows the degrees in Celcius
           .addField("Temperature", `${current.temperature}`, true)
           .addField("Feels like", `${current.feelslike} Degrees`, true)
           .addField("Winds", current.winddisplay, true)
           .addField("Humidity", ` ${current.humidity}%`, true)
           .addField("Day", `${current.day}`, true)
           .addField("Date", `${current.date}`, true)
           
           //Display when it's called
           botMsg09.edit(embed)

    });
    
  }
  
  
  
  
  
  if (message.content.startsWith(`${PREFIX}dog`)) {
    let dog1010 = await message.channel.send("Wait...")
    const { body } = await snekfetch.get('https://random.dog/woof.json');
    let embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setImage(`${body.url.split("?")[0]}?size=4096`);
    dog1010.edit(embed)
  }
  
  
  
  if (message.content.startsWith(`${PREFIX}cats`)) {
    let cats1010 = await message.channel.send("Wait...")
    const request = require('request');
    request('http://edgecats.net/random', function (error, response, body) {
            if (!error && response.statusCode == 200) {
              let embed = new Discord.RichEmbed()
              .setColor(COLOR)
              .setImage(`${body.split("?")[0]}?size=4096`)
              cats1010.edit(embed)
            }
        });
  }
  
  
  const deep_quotes = [
    "How can mirrors be real if our eyes aren\'t real?",
    "It's true that we don't know what we've got until we lose it, but it's also true that we don't know what we've been missing until it arrives.",
    "Tomorrow is the first day of the rest of your life",
    "The ballparks have gotten too crowded. That's why nobody goes to see the game anymore.\"",
    "The similarities between me and my father are different.",
    "You guys pair up in groups of three, then line up in a circle",
    "I play football. I'm not trying to be a professor. The tests don't seem to make sense to me, measuring your brain on stuff I haven't been through in school.",
    "I'm going to graduate on time, no matter how long it takes.",
    "If I did that, I'd be sticking my head in a moose",
    "Smoking kills, and if you're killed, you've lost a very important part of your life.",
    "\"Who in their right mind would ever need more than 640k of ram!? - Bill Gates 1981\"",
    "The average woman would rather have beauty than brains, because the average man can see better than he can think.",
    "One of the great things about books is sometimes there are some fantastic pictures",
    "Always remember: you're unique, just like everyone else.",
    "The road to success is always under construction.",
    "When everything's coming your way, you're in the wrong lane.",
    "Everybody wants to go to heaven, but nobody wants to die.",
    "He who laughs last, didn't get it.",
    "Half of the people in the world are below average.",
    "Chuck Norris frequently donates blood to the Red Cross. Just never his own.",
    "Middle age is when your age starts to show around your middle.",
    "I am so clever that sometimes I don't understand a single word of what I am saying.",
    "When it comes to thought, some people stop at nothing.",
    "Happiness is having a large, loving, caring, close-knit family in another city.",
    "Don't tell me the sky is the limit when there are footprints on the moon.",
    "Why do psychics have to ask you for your name?",
    "I get enough exercise pushing my luck.",
    "The more people I meet, the more I like my dog.",
    "There are three kinds of people in this world: those who can count and those who can't.",
    "When life hands you lemons, make lemonade, find the person that life handed vodka to, and have a party.",
    "God created the world, everything else is made in China.",
    "Before you criticize someone, walk a mile in their shoes. That way, you’ll be a mile from them, and you’ll have their shoes.",
    "You never truly understand something unless you can explain it to your grandmother.",
    "Error. No keyboard. Press F1 to continue.",
    "Experience is what you get when you didn’t get what you wanted.",
    "hey occifer i swear to drunk im not as god as you think i am.",
    "Change is good, but dollars are better.",
    "Solution to two of the world’s problem: feed the homeless to the hungry.",
    "When life gives you melons . . . you might be dyslexic.",
    "Those who criticize our generation seem to forget who raised it!",
    "Children in the back seat cause accidents, accidents in the back seat cause children!",
    "How do you know when you are too drunk to drive? When you swerve to miss a tree . . . and then realize it was your air-freshener.",
    "Alcohol, what's that? It's not in my vodkabulary, but let me check in whiskypedia.",
    "I solemnly swear that I am up to no good.",
    "An apple a day keeps anyone anyway, if you throw it hard enough.",
    "When my boss asked me who is the stupid one, me or him? I told him everyone knows he doesn't hire stupid people.",
    "No matter how smart you are you can never convince someone stupid that they are stupid.",
    "A cop pulled me over and told me \"Papers\", so I said \"Scissors, I win!\" and drove off.",
    "If you think your boss is stupid, remember: you wouldn't have a job if he was any smarter.",
    "How can my feet smell if they don't have a nose?",
    "A cop pulled me over and told me \"Papers\", so I said \"Scissors, I win!\" and drove off.",
    "A stupid person laughs three times at a joke; once when everyone else is laughing, a second time when he actually gets the joke, and a third time when he realizes he was laughing without getting the joke at first.",
    "I did not trip and fall. I attacked the floor and I believe I am winning.",
    "You can stop driving me crazy, I can walk from here.",
    "The broccoli says 'I look like a small tree', the mushroom says 'I look like an umbrella', the walnut says 'I look like a brain', and the banana says 'Can we please change the subject?'",
    "I know that I am stupid but when I look around me I feel a lot better.",
    "I never apologize. I’m sorry, but that’s just the way I am..",
    "I put my phone in airplane mode, but it's not flying!",
    "Today I was a hero. I rescued some beer that was trapped in a bottle.",
    "With great power comes an even greater electricity bill.",
    "A computer once beat me at chess, but it was no match for me at kick boxing.",
    "Just because I can't sing doesn't mean that I won't sing.",
    "Stop the earth from spinning, I want to get off!"
];
  
  if (message.content.startsWith(`${PREFIX}darkquotes`)) {
  let index = Math.floor(Math.random() * (deep_quotes.length)) // Math.random() returns a float from 0 - 1.
    message.channel.send(deep_quotes[index])
}
  
  if (message.content.startsWith(`${PREFIX}darkjokes`)) {
    var joke = oneLinerJoke.getRandomJoke();
  message.channel.send({embed: {
  color: 16777215,
  description: joke.body
}});

}
  
  if (message.content.startsWith(`${PREFIX}roll`)) {
    var response = [Math.floor(Math.random() * ((100 - 1) + 1) + 1)];

   message.channel.send("You got... " + response + "!").then().catch(console.error);  // "You got... 96!"
    
  }
  
  if (message.content.startsWith(`${PREFIX}pat`)) {
    const request = require('node-superfetch');
    const {MessageAttachment} = require('discord.js');
    const {body} = fetch('https://nekos.life/api/v2/img/pat').then(res => res.json()).then(result => {
      if (!result.url) return message.channel.send("Something went wrong.");
      const attachment = new MessageAttachment(result.url);
      message.channel.send(":)", attachment)
    })
    }
  
  if (message.content.startsWith(`${PREFIX}send`)) {
    let users1 = message.author.id
    let kirim = message.content;
    users1.send(kirim.replace(`${PREFIX}send ${users1}`, ""))
    
  }
  
  if (message.content.startsWith(`${PREFIX}report`)) {
    message.delete()
    let report = args.join(" ")
    if (!report) return message.channel.send("No contents!")
      .then(message => {
      message.delete(20000);
    })
    let sayrepeat = message.content;
    message.channel.send("Thank you for letting us know about this bug. Hopefully this bug can be fixed quickly! That is all and thank you")
      .then(message => {
            message.delete(20000);
    });
    let embed = new Discord.RichEmbed()
    .setThumbnail(message.author.displayAvatarURL)
    .addField("Ask From", message.author.tag + `(ID: ${message.author.id})`)
    .addField("From Server", message.guild.name + `(ID: ${message.guild.id})`)
    .addField("The question", report)
    .setTimestamp()
    .setColor(COLOR)
    client.channels.get(`727614370502279208`).send(embed)
    message.delete()
  }
  
  if (message.content.startsWith(``)) {
      let logmessage = message.content;
    let embed = new Discord.RichEmbed()
    .setThumbnail(message.author.displayAvatarURL)
    .addField("From", message.author.tag)
    .addField("Message", logmessage)
    .addField("Channel", `TAG: <#${message.channel.id}>\nNAME: ${message.channel.name}\nID: ${message.channel.id}`)
    .addField("Server", message.guild.name)
    .setColor(COLOR)
    .setTimestamp()
    client.channels.get(`726731742609932330`).send(embed);
      }
  
  
  let afk = new db.table("AFKs"),
      authorStatus = await afk.fetch(message.author.id),
      mentioned = message.mentions.members.first();
  
  if (mentioned) {
    let status = await afk.fetch(mentioned.id);
    
    if (status) {
      const embed = new Discord.RichEmbed()
      .setColor(0xffffff)
      .setDescription(`This user (${mentioned.user.tag}) is AFK: **${status}**`)
      message.channel.send(embed);
    }
  }
  
  if (authorStatus) {
    message.member.setNickname(message.author.username)
    const embed = new Discord.RichEmbed()
    .setColor(0xffffff)
    .setDescription(`**${message.author.tag}** is no longer AFK.`)
    message.channel.send(embed);
    afk.delete(message.author.id)
  }
  
  if (message.content.startsWith(`${PREFIX}afk`)) {
    const status = new db.table("AFKs");
let afk = await status.fetch(message.author.id);
    
  if (!afk) {
    const embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setDescription(`**${message.author.tag}** now AFK.`)
    .setFooter(`Reason: ${args.join(" ") ? args.join(" ") : "AFK"}`)
    message.channel.send(embed)
    status.set(message.author.id, args.join(" ") || `AFK`);
  } else {
    const embed2 = new Discord.RichEmbed()
    .setColor(COLOR)
    .setDescription("You are no longer AFK.");
    message.channel.send(embed2)
    status.delete(message.author.id);
  }
    
  
  }
  
  if (message.content.startsWith(`${PREFIX}ping`)) {
    
      let botMsg = await message.channel.send("〽️Pinging...")


  botMsg.edit({ embed: {
    title: "📶 Ping",
    description: [
      "**Server**: `" + (botMsg.createdAt - message.createdAt) + "ms`",
      "**API**: `" + Math.round(client.ping) + "ms`",
    ].join("\n"),
    color: 16777215,
    footer: { text: "Requested by " + message.author.tag, icon_url: message.author.displayAvatarURL },
    timestamp: new Date()
  }}).catch(e=> botMsg.edit(e.message))
  }

  
  
  if (message.content.startsWith(`${PREFIX}∆∆∆∆`)) {
    let countries = args[0] // Your/someone countries prefix.
    
    fetch(`https://corona.lmao.ninja/countries/${countries}`)
    .then(res => res.json())
    .then(data => {
      let country = data.country;
      let confirmed = data.cases.toLocaleString();
      let todayconfirmed = data.todayCases.toLocaleString();
      let deaths = data.deaths.toLocaleString();
      let todaydeaths = data.todayDeaths.toLocaleString();
      let recovered = data.recovered.toLocaleString();
      let critical = data.critical.toLocaleString();
      let active = data.active.toLocaleString();
      // Add .toLocaleString() if you wanna separate 3 numbers with commas.
      
      const embed = new Discord.MessageEmbed()
      .setColor(0x1d1d1d)
      .setTimestamp(new Date())
      .setAuthor("Coronavirus Statistics")
      .addField(`Data for: ${country}`, `Confirmed: (Total: **${confirmed}** | Daily: **${todayconfirmed}**) \nDeaths: (Total: **${deaths}** | Daily: **${todaydeaths}**) \nRecovered: **${recovered}** \nCritical: **${critical}** \nActive: **${data.active}**`) // Sorry a little bit more complex.
      
      message.channel.send(embed);
      // Let's test it out!
    })
  }
  
  
  
  const api = require('novelcovid');
 
// you can choose which URL to use, this will not change the behaviour of the API
api.settings({
    baseUrl: 'https://disease.sh' | 'https://api.caw.sh' | 'https://corona.lmao.ninja'
})
  
  api.countries({country:'indonesia'})
  
  if (message.content.startsWith(`${PREFIX}indo`)) {
    let waitcuy = await message.channel.send("Waiting")
    let corona = await api.countries({ country:'indonesia'})
    function deley() {
    let embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setAuthor(corona.country)
    .setTimestamp()
    .addField("Total Cases", corona.cases, true)
    .addField("Today Cases", corona.todayCases, true)
    .addField("Total Recovery", corona.recovered, true)
    .addField("Today Recovery", corona.todayRecovered, true)
    .addField("Total Death", corona.deaths, true)
    .addField("Today Death", corona.todayDeaths, true)
    .setFooter(
        `Message From : ${message.author.username}#${message.author.discriminator}`,
        message.author.displayAvatarURL
      );
    waitcuy.edit(embed)
  } setInterval(deley, 5000)
  }
 
  
  // this prints a specified country
  const { NovelCovid } = require("novelcovid");
  const covid = require("novelcovid");
  if (message.content.startsWith(`${PREFIX}corona`)) {
    if(!args.leght) {
      if(args.join(" ") === "global"){
let corona = await api.all()
    let embed = new Discord.RichEmbed()
    .setTitle("GLOBAL")
    .setTimestamp()
    .setColor(COLOR)
    .addField("Total Cases", corona.cases, true)
    .addField("Today Cases", corona.todayCases, true)
    .addField("Total Recovery", corona.recovered, true)
    .addField("Today Recovery", corona.todayRecovered, true)
    .addField("Total Death", corona.deaths, true)
    .addField("Today Death", corona.todayDeaths, true)
    .setFooter(
        `Message From : ${message.author.username}#${message.author.discriminator}`,
        message.author.displayAvatarURL
      ); 
    message.channel.send(embed)
      
    } else if(args.join(' ')){
let corona = await api.countries({ country: [args.join(' ')]})
    let embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setAuthor(corona.country)
    .setTimestamp()
    .addField("Total Cases", corona.cases, true)
    .addField("Today Cases", corona.todayCases, true)
    .addField("Total Recovery", corona.recovered, true)
    .addField("Today Recovery", corona.todayRecovered, true)
    .addField("Total Death", corona.deaths, true)
    .addField("Today Death", corona.todayDeaths, true)
    .setFooter(
        `Message From : ${message.author.username}#${message.author.discriminator}`,
        message.author.displayAvatarURL
      );
    message.channel.send(embed)
    } else {
      let corona = await api.continents({continent: [args.join(' ')]})
      let embed = new Discord.RichEmbed()
      .setColor(COLOR)
      .setAuthor(corona.continent)
      .setTimestamp()
      .addField("Total Cases", corona.cases, true)
      .addField("Today Cases", corona.todayCases, true)
      .addField("Total Recovery", corona.recovered, true)
      .addField("Today Recovery", corona.todayRecovered, true)
      .addField("Total Death", corona.deaths, true)
      .addField("Today Death", corona.todayDeaths, true)
      .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9w-nOCBI2RSUeynlGYBEGckSb23sIx5dTfw&usqp=CAU")
       message.channel.send(embed)
    }
    }
  }
  if (message.content.startsWith(`${PREFIX}meme`)) {
    const got = require('got')
    
    got('https://www.reddit.com/r/meme/random/.json').then(response => {
      let content = JSON.parse(response.body),
          image = content[0].data.children[0].data.url
      let embed = new Discord.RichEmbed()
      .setColor(COLOR)
      .setImage(`${image.split("?")[0]}?size=4096`)
      message.channel.send(embed)
    }).catch(console.log)
}
  if (message.content.startsWith(`${PREFIX}memes`)) {
    let botMsg = await message.channel.send("Wait...")
    const got = require('got')
    
    got('https://www.reddit.com/r/meme/random/.json').then(response => {
      let content = JSON.parse(response.body),
          image = content[0].data.children[0].data.url
      let embed = new Discord.RichEmbed()
      .setColor(COLOR)
      .setImage(`${image.split("?")[0]}?size=4096`)
      message.channel.send(embed)
    }).catch(console.log)
  }
  if (message.content.startsWith(`${PREFIX}glitch`)) {
    let embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setDescription("[Status Glitch](https://status.glitch.com)")
    message.channel.send(embed)
  }
  if (message.content.startsWith(`${PREFIX}meow`)) {
    const {MessageAttachment} = require('discord.js');
    const {body} = fetch('https://nekos.life/api/v2/img/meow').then(res => res.json()).then(result => {
      if (!result.url) return message.channel.send("Something went wrong.");
      const attachment = new MessageAttachment(result.url);
      let embed = new Discord.RichEmbed()
      .setColor(COLOR)
      .setImage(attachment) // You can remove the :), it's optional.
      message.channel.send(embed)
    })
    }
})
  

client.login(process.env.BOT_TOKEN)

////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////eval///////////////////////////////////////////////////////////////////////////////////////

const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}


client.on("message", async message => {
  const args = message.content.split(" ").slice(1);
 
  if (message.content.startsWith(PREFIX + "eval")) {
    const { inspect } = require("util")
    if(message.author.id !== `${ID}`) return message.channel.send("You Not Owner")
    let toEval = args.join(" ");
  try {
    if(toEval) {
        let evaluated = inspect(eval(toEval, {depth: 0} ))
        message.channel.send({embed: {
        color: 16777215,
        title: "Evaluation Executed!",
        description: `${evaluated}`,
        author: {
          name: message.author.username,
          icon_url: message.author.avatarURL
        },
        timestamp: new Date(),
      }});
    }
} catch(error) {
      message.channel.send({embed: {
      color: 16777215,
      title: "Evaluation Cancelled",
      description: `${error}`,
      author: {
        name: message.author.username,
        icon_url: message.author.avatarURL
      },
      timestamp: new Date()
    }});
}
  }
});



////////////////////////////////////////////////////////////BOT//////////////////////////////////////////////////////////////




function emoji (id) {
  return bot.emojis.get(id).toString();
}




/////////////////////////////////////////////////////////WARN////////////////////////////////////////////////////////////////


const file = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
bot.on('message', async (msg) => {
  
  if(msg.content.indexOf(config.prefix) !== 0) return;
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
if (!msg.content.startsWith(PREFIX)) return;
if (msg.author.bot) return;

if (msg.content.startsWith(`${PREFIX}warn`)) {
if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.reply('You Not Admin!');
      let member = msg.mentions.members.first();
if (!file[msg.mentions.members.first().id]) {
  file[msg.mentions.members.first().id] = {
    warns: 0
  }
};
file[msg.mentions.members.first().id] = {
  warns: file[msg.mentions.members.first().id].warns + 1
}


fs.writeFile("./warns.json", JSON.stringify(file), (err) => {
  if (err) console.error(err);

  console.log("Added Warn!")
});

let user = msg.mentions.users.first() || msg.author;
  let reason = args.slice(1).join(' ');
  if(!reason) reason = "No Reason";
let embed = new Discord.RichEmbed(reason)
.setColor(COLOR)
.setTitle("WARN MEMBER")
.setDescription(` 
================================

**Name**           : __${user}__

**ID**                  : __${user.id}__

**Warn**  : __${file[user.id].warns}__

**Reason**         : __${reason}__

**Admin**          : __${msg.author.username}__

================================
`)
.setFooter(`Message From : ${msg.author.username}#${msg.author.discriminator}`,
        bot.user.displayAvatarURL);
        msg.channel.send(embed);
;

  
  ///////////////////////////////////////////////////////////////////////////////////
  
  
  if(file[user.id].warns == 1) {
    msg.channel.send( user.tag + " Counted " + file[user.id].warns + " Times of Violation")
  }
  
  
  ////////////////////////////////////////////////////////////////////////////////////
  
  
  if(file[user.id].warns == 2) {
    msg.channel.send( user.tag + " Counted " + file[user.id].warns + " Times of violation")
  }
     
  
  ////////////////////////////////////////////////////////////////////////////////////
     
     
 if(file[user.id].warns == 3) {
   user.send("You have Violated 3 Times on the Server " + msg.guild.name + "\nReson : " + reason + "\nNext Time You Don't Break!")
    msg.channel.send( user.tag + "Counted " + file[user.id].warns + " Times of Violation")
    if (user) {
      const member = msg.guild.member(user);
      if (member) {
        member
          .kick(reason)
          .then(() => {
            msg.reply({embed: {
  color: COLOR,
  description: `"${user.username}" Good Bye :)`
}});
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
    if (!msg.guild) return;
  }
}
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// DATABASE WARN ADA DI warns.json ///////////////////// BISA DI RESET ///////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


bot.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  
  if(message.content == bot.user.toString()) {
    let embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setDescription("Hi Im " + bot.user.username + "\nMy Prefix " + PREFIX + `\nCek All Command ${PREFIX}help`)
    message.channel.send(embed)
  }
                      
                      
  if (message.content.startsWith("∆∆∆∆")) {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    message.channel.send(`Ping You : ${Date.now() - message.createdTimestamp} MS`);
  }

  let blacklisted = ["∆∆∆∆∆∆∆∆"]; //for blacklist message

  let foundInText = false;
  for (var i in blacklisted) {
    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase()))
      foundInText = true;
  }

  if (foundInText) {
    message.delete(20);
  }

});


function randomStatus() {
  var time4 = moment(Date.now()).format("Do - MMMM - YYYY")
  var jamWIB = moment(Date.now()).utcOffset("+0700").format("LT")
  var jamWITA = moment(Date.now()).utcOffset("+0800").format("LT")
  var jamWIT = moment(Date.now()).utcOffset("+0900").format("LT")
  let status = [
    `${PREFIX}help│${bot.users.size} Users`,
    `${PREFIX}help│${bot.guilds.size} Server`,
    `${PREFIX}help│Author : ${AUTHOR}`,
    `${PREFIX}help│Indonesian Date : ${time4}`,
    `${PREFIX}help│Indonesian Time : ${jamWIB}`,
    `${PREFIX}help│Don't Leave the House #Stay At Home!`,
  ];
  let rstatus = Math.floor(Math.random() * status.length);
  bot.user.setActivity(status[rstatus], { type: "WATCHING" });
}
setInterval(randomStatus, 10000);

// Pass the entire Canvas object because you'll need to access its width, as well its context
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 80;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px serif-bold`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};



// Member Join Event
	bot.on('guildMemberAdd', member => {   
	  const members = member.guild.memberCount;
	  const channel = member.guild.channels.find(ch => ch.name === 'bot-spam');
	  if (!channel) return;
	  let Embed = new Discord.RichEmbed()
	  .setFooter(`User Joined | ${member.guild.memberCount} Members`)
	  .setColor(COLOR)    
	  .setAuthor(`${member.displayName} has joined ${member.guild.name}`, member.user.displayAvatarURL)
	  .setTimestamp()
	  channel.send(Embed);
  })

bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'bot-spam');
  if (!channel) return;
  let Embed = new Discord.RichEmbed()
  .setFooter(`user Joined | ${member.guild.memberCount} Members`)
  .setColor(COLOR)
  .setAuthor(`${member.displayName} has leave ${member.guild.name}`, member.user.displayAvatarURL)
  .setTimestamp()
  channel.send(Embed);
})


bot.on("guildMemberAdd", async member => {
  const channelme = member.guild.channels.find(ch => ch.name === '╭🛫★。ͅ-ֵ┃join-goodbye');
  if (!channelme) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQktJqv1dukU76F65KRJwGNBdMXIy-wEcW8XAvIGIkwDGXGnhCl&usqp=CAU');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#ffffff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome ,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

	channelme.send(`Welcome , ${member}!`, attachment);
});

bot.on("guildMemberRemove", async member => {
  const channelme = member.guild.channels.find(ch => ch.name === '╭🛫★。ͅ-ֵ┃join-goodbye');
  if (!channelme) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQktJqv1dukU76F65KRJwGNBdMXIy-wEcW8XAvIGIkwDGXGnhCl&usqp=CAU');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#ffffff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Goodbye ,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome.png');

	channelme.send(`Goobye , ${member}!`, attachment); 
});

bot.on("guildCreate", async guild => {
  // This event triggers when the bot joins a guild.
  bot.channels.get(`726917339748237342`).send(`:inbox_tray: New server joined: ${guild.name}\n(id: ${guild.id}).\nThis server has ${guild.memberCount} members!`);
  bot.user.setActivity(`New Server ${guild.name} servers`);
});

bot.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  bot.channels.get(`726917339748237342`).send(`:outbox_tray: I have been removed from: ${guild.name}\n(id: ${guild.id})`);
});



bot.on('guildMemberAdd', async message => {
  let embed = new Discord.RichEmbed()
  .setColor(COLOR)
  .addField("Dari Server", message.guild.name)
  bot.channels.get(`726731670782214246`).send(embed)
});

bot.on('guildMemberAdd', async member => {
  let embed = new Discord.RichEmbed()
  .setColor(COLOR)
  .setTitle("Ada Yang Join")
  .addField("Name", member.user.username)
  bot.channels.get(`726731670782214246`).send(embed)
  
  console.log('Ada Yang Join Nich ' + member.user.username )
  
  let roles = member.guild.roles.find(x=> x.name === "Member")
if(!roles) return // biar kalo roles nya ga ada ke return
  
  member.addRole(roles)
});

bot.on("warn", () => {
  console.log(console.warn)
})

bot.on("error", () => {
  console.log(console.error)
})

bot.on("disconnect", () => {
       bot.channels.get(`726733010589712395`).send(`Try Reconnect`)
       console.log("An error occurred, trying to reconnect!")
});

bot.on("reconnecting", () => {
  bot.channels.get(`726733010589712395`).send(`Reconnecting`)
  console.log("Reconnecting")
});

bot.on("ready", function() {
  bot.channels.get(`726733010589712395`).send(`Bot Ready <@331684540223586304>`)
  console.log(`${bot.user.tag} READY!`);
  
  let countmember = bot.guilds.get("684799373900513311");
let memberCount = countmember.memberCount;
let channelCount = countmember.channels.get("696839995901870100");
channelCount.setName(`★┃All Member : ` + memberCount)
  
  bot.on('guildMemberAdd', member => {
    let countmember = bot.guilds.get("684799373900513311");
let memberCount = countmember.memberCount;
let channelCount = countmember.channels.get("696839995901870100");
channelCount.setName(`★┃All Member : ` + memberCount)
  });
  
  bot.on('guildMemberRemove', member => {
  let countmember = bot.guilds.get("684799373900513311");
let memberCount = countmember.memberCount;
let channelCount = countmember.channels.get("696839995901870100");
channelCount.setName(`★┃All Member : ` + memberCount)
  });
  
  function myFunc() {
    bot.channels.get(`726733010589712395`).send("Bot On")
  }
setTimeout(myFunc, 5000);
  
  function countserver() {
    const api = require('novelcovid');
    api.settings({
    baseUrl: 'https://disease.sh' | 'https://api.caw.sh' | 'https://corona.lmao.ninja'
})
    let corona = api.countries({country:'indonesia'})
var user = bot.users.size
var guild = bot.guilds.size
var channel = bot.channels.size
var count = bot.voiceConnections.size
var cases = "0"
var recovery = "0"
var death = "0"



  
let myserver = bot.guilds.get("726731670782214242");

    let voiceu1 = myserver.channels.get("727042576271802409");
    let voiceg1 = myserver.channels.get("727042669372768297");
    let voicec1 = myserver.channels.get("727042893977747526");
    let countv1 = myserver.channels.get("737482135706796082");
    
    
    voiceu1.setName(`Users : ${user}`)
    voiceg1.setName(`Server : ${guild}`)
    voicec1.setName(`Channel : ${channel}`)
    countv1.setName(`Voice Count : ${count}`)



}
setInterval(countserver, 10000);

  function kalender() {
    var user = bot.users.size
    var guild = bot.guilds.size
    var channel = bot.channels.size
    var tanggal = moment(Date.now()).utcOffset("+0700").format("Do - MMMM - YYYY");
    var jamWIB = moment(Date.now()).utcOffset("+0700").format("LT");
    var jamWITA = moment(Date.now()).utcOffset("+0800").format("LT");
    var jamWIT = moment(Date.now()).utcOffset("+0900").format("LT")
    var hari = moment(Date.now()).utcOffset("+0700").format('dddd');
    let wildan = bot.guilds.get("684799373900513311");
    let nikki = bot.guilds.get("660395366998343700");
    let server = bot.guilds.get("696793597776756897");
    
    
    let serverbangrido
    let voicewib = wildan.channels.get("701010462388518943");
    let voicewita = wildan.channels.get("701012482705326100");
    let voicewit = wildan.channels.get("701015057466654760");
    let date1 = wildan.channels.get("701054014149886152");
    
    let serverfreedom
    let nikkiwib = nikki.channels.get("701087927152803840");
    let nikkiwita = nikki.channels.get("701087959130177626");
    let nikkiwit = nikki.channels.get("701087990528868352");
    let nikkidate = nikki.channels.get("701088040465989703");
  
    
    
    voicewib.setName(`★┃WIB ` + jamWIB);
    voicewita.setName(`★┃WITA ` + jamWITA);
    voicewit.setName(`★┃WIT ` + jamWIT);
    date1.setName(`★┃ ` + tanggal);
    
    nikkiwib.setName(`╭⏰★。ͅ-ֵ┃WIB ` + jamWIB);
    nikkiwita.setName(`│⏰★。ͅ-ֵ┃WITA ` + jamWITA);
    nikkiwit.setName(`│⏰★。ͅ-ֵ┃WIT ` + jamWIT);
    nikkidate.setName(`╰📆★。ͅ-ֵ┃ ` + tanggal);
    
  }
  setInterval(kalender, 20000);
});

bot.on("message", function(message) {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  var args = message.content.substring(PREFIX.length).split(" ");
  var command = args[0].toLowerCase();
  
    if (command === "bot" || command === "infobot" || command === "status" || command === "stats") {
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
      .setAuthor("Status Hosting Command")
      .setThumbnail(bot.user.displayAvatarURL)
      .setColor(COLOR)
      .setTimestamp()
      .setDescription("**•MODULES**\n```Users      :: " + user + "\nServers    :: " + guild + "\nChannels   :: " + channel + "\nNode       :: " + Node + "\nDiscordJS  :: v" + version + "```\n**•ENGINES**\n```Uptime     :: " + parseDur(client.uptime) + "\nCPU        :: " + CPU + "\nMemory     :: " + usage + "\nModel CPU  :: " + cpuModel + "```")
      .setFooter(`Pesan Dari : ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL);
    message.channel.send(embed).then(console.log(error))
    })
  }
  
  if (command === "invite") {
    message.channel.send("https://discord.com/oauth2/authorize?client_id=694951596286804050&scope=bot&permissions=506473599")
  }

  if (command === "restart" || command === "r") {
    message.react('✅');
    if (message.author.id !== `${ID}`)
      return message.channel.send("You Not Owner");
    let r = new Discord.RichEmbed()
    .setColor(COLOR)
    .setDescription("Done Restart")
    message.channel.send(r).then(message => {
    process.exit(1);
    }).catch(error => {
    message.channel.send(error)})
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
  
    //command
 
  if (command === "batas") {
    msg.channel.send("=========================================")
    msg.delete()
  }
  if (command === "tutorialbot") {
    const embed = new Discord.RichEmbed()
    .setTitle("Klick Link")
    .setDescription("[Video Tutorial Music Bot By Zealcord Nation](https://www.youtube.com/watch?v=ZL7rC0xiV9c)")
    .setColor(COLOR)
    .setTimestamp()
    .setFooter(`Pesan Dari : ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL);
    msg.channel.send(embed);
  }
  
  if (command === "purge" || command === "del" || command === "delete") {
    if (!msg.member.hasPermission("ADMINISTRATOR"))
      return msg.reply("You Not Admin");
    // This command removes all messages from all users in the channel, up to 100.

    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[1], 10);

    // Ooooh nice, combined conditions. <3
    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return msg.reply("Cannot Exceed 2 - 100")

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await msg.channel.fetchMessages({ limit: deleteCount });
    msg.channel
      .bulkDelete(deleteCount)
      .catch(error =>
        msg.reply(`Couldn't Delete Message Because : ${error}`)
      );
  }
  
  
  if (command === "vote") {
    let embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setTitle("Support")
    .setDescription("https://top.gg/bot/694951596286804050/vote\n\n" + bot.user.tag + "\n\n__**Feature " + bot.user.tag + "**__\n•Music\n•Moderator\n•Fun\n•Corona\n\nSupport Me!")
    .setTimestamp()
    .setFooter(`Message From : ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL);
    msg.channel.send(embed);
  }
  
  if (command === "avatarguild" || command === "avaguild") {
    let embed = new Discord.RichEmbed()
      .setAuthor(msg.guild.name)
      .setColor(COLOR)
      .setTimestamp()
      .setImage(`${msg.guild.iconURL}?size=2048`)
      .setFooter(
        `Message From : ${msg.author.username}#${msg.author.discriminator}`,
        msg.author.displayAvatarURL
      );
    msg.channel.send(embed);
  }

  if (command === "serverinfo") {
    let region = {
      "brazil": "Brazil",
      "eu-central": "Central Europe",
      "singapore": "Singapore",
      "london": "London",
      "russia": "Russia",
      "japan": "Japan",
      "hongkong": "Hongkong",
      "sydney": "Sydney",
      "us-central": "U.S. Central",
      "us-east": "U.S. East",
      "us-south": "U.S. South",
      "us-west": "U.S. West",
      "eu-west": "Western Europe",
      "europe": "Europe",
      "india": "Indian"
    }
    let x = Date.now() - msg.guild.createdAt;
    let h = Math.floor(x / 86400000) // 86400000, 5 digits-zero.
    let created = dateformat(msg.guild.createdAt); // Install "dateformat" first.
    var allemoji = msg.guild.emojis.map;
    let location = region[msg.guild.region];
    const exampleEmbed = new Discord.RichEmbed()
      .setColor(COLOR)
      .setThumbnail(msg.guild.iconURL)
      .setAuthor(msg.guild.name)
      .setDescription("**Member Count**\n" + msg.guild.memberCount + "\n\n**Date  Created**\n" + created + "\nsince **" + h + "** day(s)\n\n**Voice**\n" + msg.guild.channels.filter(x => x.type === "voice").size + "\n\n**Category Count**\n" + msg.guild.channels.filter(x => x.type === "category").size + "\n\n**Chat Count**\n" + msg.guild.channels.filter(x => x.type === "text").size + "\n\n**Region**\n" + location + "\n\n**Owner**\n" + msg.guild.owner.user.tag)
    .setTimestamp()
    .setFooter(
        `Pesan Dari : ${msg.author.username}#${msg.author.discriminator}`,
        msg.author.displayAvatarURL
      );
    msg.channel.send(exampleEmbed)
  }

  if (command === "userinfo") {
    var tempat = moment.locale();
    let member = msg.mentions.members.first() || msg.member,
      user = member.user;
    let embed = new Discord.RichEmbed()
      .setTitle("Profile")
      .setColor(COLOR)
      .setThumbnail(msg.author.displayAvatarURL)
      .addField(
        "Username",
        `${msg.author.username}#${msg.author.discriminator}`
      )
      .addField("ID", msg.author.id)
    .addField('Status :', user.presence.status, true)
      .addField(
        "Joined The Server :",
        `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`,
        true
      )
      .addField(
        "Account Created",
        `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`,
        true
      )
    .addField("Roles", member.roles.map(r => `${r}`).join(" │ "), true)
    .setTimestamp()
    .setFooter(
        `Pesan Dari : ${msg.author.username}#${msg.author.discriminator}`,
        msg.author.displayAvatarURL
      );
    msg.channel.send(embed);
  }

  if (command === "say") {
    let saymsg = msg.content;
    msg.channel.send(saymsg.replace(`${PREFIX}say`, ""));
    msg.delete(1);
  }

  if (command === "ban") {
    if (!msg.member.hasPermission("ADMINISTRATOR"))
      return msg.reply("You Not Admin");
    // Easy way to get member object though mentions.
    var member = msg.mentions.members.first();
    // ban
    member
      .ban()
      .then(member => {
        // Successmessage
        msg.channel.send(
          ":wave: " +
            member.displayName +
            " Member Sudah Di Ban Terimakasih Sudah Menggunakan Jasa Banned Saya:) ".then(
              msg => {
                msg.delete(10000);
              }
            )
        );
      })
      .catch(() => {
        // Failmessage
        msg.channel.send("Done Banned").then(msg => {
          msg.delete(10000);
        });
      });
  }

  if (command === "kick") {
    if (!msg.member.hasPermission("ADMINISTRATOR"))
      return msg.reply("You Not Admin");
    // Easy way to get member object though mentions.
    var member = msg.mentions.members.first();
    // Kick
    member
      .kick()
      .then(member => {
        // Successmessage
        msg.channel.send(
          ":wave: " +
            member.displayName +
            " Sudah di kick".then(msg => {
              msg.delete(10000);
            })
        );
      })
      .catch(() => {
        // Failmessage
        msg.channel.send("Done Kick").then(msg => {
          msg.delete(10000);
        });
      });
  }

  if (command === "avatar" || command === "ava") {
    let users = msg.mentions.users.first() || msg.author;
    let embed = new Discord.RichEmbed()
      .setAuthor(users.username)
      .setColor(COLOR)
      .setTimestamp()
      .setDescription("[Link Avatar](" + users.displayAvatarURL + ")")
      .setImage(`${users.avatarURL.split("?")[0]}?size=4096`)
      .setFooter(
        `Message From : ${msg.author.username}#${msg.author.discriminator}`,
        msg.author.displayAvatarURL
      );
    msg.channel.send(embed);
  }

  if (command === "help" || command == "cmd" || command === "h") {
    const helpembed = new Discord.RichEmbed()
      .setColor(COLOR)
      .setTitle("Command List")
      .setDescription(
        "**:headphones: Music**\n``play, skip, stop, pause, volume [1/200], nowplaying, queue, loop, join, leave``\n\n**:hammer: Admin**\n``ban, kick, warn, purge [2/100]``\n\n**:wrench: Untility**\n``ping, serverinfo, stats, avatar, avatarguild, afk, userinfo, roleinfo [name role], weather, corona [global/country name], vote, invite``\n\n**:game_die: Fun**\n``meme, say, roll, darkjokes, darkquotes, kill, mock, 8ball, zodiac [day month]``\n\n**:newspaper: Anime**\n``anisearch [anime name], picsanime, picsnsfw, waifu``\n\n**:frame_photo: Picture**\n``dog, cats, birds ,bunny , furry``\n\n**:computer: OWNER**\n``restart, eval, changeava, changenm``\n\n**:trident: ABOUT**\n`Prefix : " + PREFIX + "\nInstagram : " + INSTAGRAM + "\nFind Bugs? Or Error? : " + PREFIX + "report`")
      .setTimestamp()
      .setFooter(`© 2020 Indonesia Development ${AUTHOR}`);
    msg.channel.send(helpembed);
  }

  if (command === "+#7#+7$+$7$+") {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.send("You Join Your Voice")
    let embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setDescription("```🙋 Done Join Your Voice ```")
    .setTimestamp()
    .setFooter(`Pesan Dari : ${msg.author.username}#${msg.author.discriminator}`, bot.user.displayAvatarURL);
    msg.channel.send(embed);
    msg.member.voiceChannel.join();
  }

  if (command === "+#7#+$7+$$") {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.send("You Not Join Voice")
    let embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setDescription("```🙋 Done Leave Your Voice ```")
    .setTimestamp()
    .setFooter(`Pesan Dari : ${msg.author.username}#${msg.author.discriminator}`, bot.user.displayAvatarURL);
    msg.channel.sendEmbed(embed);
    msg.member.voiceChannel.leave();
  }

  if (command === "-$7#+$7+$_") {
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
            .setTitle("Select Music")
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
          return msg.channel.send("```⚠️ 【 Error Chat Owner 】```\n```" + error + "```");
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === "+#7$-7$+$") {
    if (!msg.member.voiceChannel)
      return msg.channel.send(
        "```You Not Join Voice```"
      );
    if (!serverQueue)
      return msg.channel.send(
        "```There are no songs that I can skip.```"
      );
    serverQueue.connection.dispatcher.end("Perintah skip telah digunakan!");
    let embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setDescription("```⏭️ Next Songs```")
    .setTimestamp()
    msg.channel.sendEmbed(embed);
    return undefined;
  } else if (command === ";$7#+$7+#+$") {
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
    let embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setDescription("```⏹️ Music Stop ```")
    .setTimestamp()
    .setFooter(`Pesan Dari : ${msg.author.username}#${msg.author.discriminator}`, bot.user.displayAvatarURL);
    msg.channel.sendEmbed(embed);
    return undefined;
  } 
  
  else if (command === "-$7#+$7-$$") {
    if (!msg.member.voiceChannel)
      return msg.channel.send(
        "You Not Join Voice"
      );
    if (!serverQueue) return msg.channel.send("There Is No Song Which Can Use Volume");
    if (!args[1]) return msg.channel.send("```Volume : " + serverQueue.volume + "%```")
    if (isNaN(args[1]) || args[1] > 200) return msg.channel.send("Volume only can be set in range **1** - **200**.");
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 200);
    let embed = new Discord.RichEmbed()
      .setColor(COLOR)
      .setDescription("```Volume Set : " + args[1] + "```")
      .setTimestamp()
    .setFooter(`Message From : ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL);
    return msg.channel.sendEmbed(embed);
    
  } else if (command === "-$7$-$7$--$") {
    const serverQueue = queue.get(msg.guild.id);
    if (!serverQueue) return msg.channel.send("There is no song where you can see the song playing");
    const embedNP = new Discord.RichEmbed()
        .setTitle(`**Now Playing** ` + emoji("615732214797303849"))
    .setColor(COLOR)
    .addField(`**Uploader**`, `${serverQueue.songs[0].channel}`, true)
    .addField(`**Request**`, `${serverQueue.songs[0].request}`)
    .addField(`**Duration**`, `**\`${serverQueue.songs[0].durationh}\`** Hours, **\`${serverQueue.songs[0].durationm}\`** Minutes and **\`${serverQueue.songs[0].durations}\`** Seconds`, true)
    .setImage(`https://i.ytimg.com/vi/${serverQueue.songs[0].id}/sddefault.jpg`)
    .setDescription(`[${serverQueue.songs[0].title}](https://www.youtube.com/watch?v=${serverQueue.songs[0].id})`)
    return msg.channel.send(embedNP);
} else if (
    command === ";(#+$8$++$+$" ||
    command === "+$($+$7+#+$+$" ||
    command === ";$8#+$+$" ||
    command === "+$7#+$+7#+$"
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
    return msg.channel.sendEmbed(embedqu);
  } else if (command === "(28$8_+#7$+") {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      let embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setDescription("```⏯️ Music Pause ```")
    .setTimestamp()
    .setFooter(`Message From : ${msg.author.username}#${msg.author.discriminator}`, bot.user.displayAvatarURL);
   return msg.channel.sendEmbed(embed);
    }
    return msg.channel.send("There is no song");
    console.log("Pause Song : " + serverQueue.songs[0].title)
  } 
  else if (command === "#8$+8$+#8$+_8") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let embed = new Discord.RichEmbed()
    .setColor(COLOR)
    .setDescription("```⏯️ Music is playing again```")
    .setTimestamp()
    .setFooter(`Pesan Dari : ${msg.author.username}#${msg.author.discriminator}`, bot.user.displayAvatarURL);
    return msg.channel.sendEmbed(embed);
      console.log("Resume Song : " + serverQueue.songs[0].title)
    }
    return msg.channel.send("There is no song");
  } else if (command === "w8ehdusudhd8we8") {
       if (!serverQueue)
      return msg.channel.send("There are no songs in the list")
    	if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return msg.channel.send(`🔂 **|** Loop ${serverQueue.loop === true ? "enabled" : "disabled"}!`);
	};
	return msg.channel.send("There is nothing playing.");
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
    request: "<@" + msg.author.id + ">",
  };

  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
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
    msg.channel.send(embed);
    console.log("Song Add" + song.title)
    bot.channels.get(`711097970292162580`).send(embed)
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.textChannel.send("No Music, I'm Out " + emoji("709983161807011910"))
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
    
    const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === "Stream is not generating quickly enough.")
        console.log("Song Ended.");
      
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
    .addField(`**Duration**`, `**\`${song.durationh}\`** Hours, **\`${song.durationm}\`** Minutes and **\`${song.durations}\`** Seconds`, true)
    .setImage(`https://i.ytimg.com/vi/${song.id}/sddefault.jpg`)
    .setDescription(`[${song.title}](https://www.youtube.com/watch?v=${song.id})`)

    serverQueue.textChannel.send(playingemb);
  console.log("Playing : " + song.title)
  bot.channels.get(`711097970292162580`).send(playingemb)
}
bot.login(TOKEN);
