const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = botSettings.prefix;
const bot = new Discord.Client({disableEveryone: true});
// const YTDL = require("ytdl-core");

bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});

//function play(connection, message) {
  //  console.log('Play');
  //  var server = servers[message.guild.id];
//
//    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
  //  server.dispatcher.on('error', console.error);
//
  //  server.queue.shift();
//
  //  server.dispatcher.on("end", function() {
    //    if (server.queue[0]) play(connection, message);
      //  else connection.disconnect();
    //});
//}

// var servers = {};


bot.on("ready", () => {
    console.log(`Bot is ready! ${bot.user.username}`);
});

bot.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);


  //  if(command === `${prefix}play`) {
  //      if (!args[0]) {
  //        return message.reply("Länk saknas")
  //      }
  //      if (!message.member.voiceChannel) {
  //        return message.reply("Du måste vara i en röstkanal!")
  //      }
//
  //      if (!servers[message.author.id]) {
  //        servers[message.author.id] = {
  //          queue: []
  //        };
  //      }
//
  //      var server = servers[message.author.id];
//
  //      console.log('Pushing link: ', args[0]);
  //      server.queue.push(args[0]);
//
  //      if (!message.author.voiceConnection) {
  //        console.log('Attempting to establish voice connnection.');
  //        message.channel.voiceChannel.join().then(function(connection) {
  //          play(connection, message);
  //        });
//
  //        /*.catch(function(e) {
  //          console.log('Error: ', e);
  //        }); */
  //      }
  //  }
//
  //  if(command === `${prefix}skip`) {
  //      var server = servers[message.author.id]
//
  //      if (server.dispatcher) server.dispatcher.end()
  //  }
//
  //  if(command === `${prefix}stop`) {
  //      var server = servers(message.author.id);
//
  //      if (message.author.voiceConnection) message.author.voiceConnection.disconnect();
  //  }

});

bot.login(botSettings.token);
