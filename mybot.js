const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log("Connect as "  + client.user.tag)

    client.user.setActivity("Youtube", {type: "WATCHING"});

    client.guilds.forEach((guild) => {
        console.log(guild.name)
        guild.channels.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
        });
        //general channel id: 667077851442315295
    });
    let generalChannel = client.channels.get("667077851442315295");
    const attachment = new Discord.Attachment("bronxStairs.png");
    generalChannel.send(attachment);
});



client.on('message', (receivedMessage) => {
        if (receivedMessage.author.return == client.user) {
            return;
        }
        // receivedMessage.channel.send("Message received: " + receivedMessage.author.toString() + ": " + receivedMessage.content);

        // receivedMessage.react("👍");
        // receivedMessage.guild.emojis.forEach(customEmoji => {
        //     console.log(`${customEmoji.name} ${customEmoji.id}`)
        //     receivedMessage.react(customEmoji);
        // });
        // let customEmoji = receivedMessage.guild.emojis.get("667109410035728412");
        // receivedMessage.react(customEmoji);

        if (receivedMessage.content.startsWith("!")) {
            processCommand(receivedMessage);
        } if (receivedMessage.content.startsWith("$")) {
            helloCommand(receivedMessage);
        }
});

client.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;
  
    // If the message content starts with "!kick"
    if (message.content.startsWith('!kick')) {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Kick the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           */
          member.kick('Optional reason that will display in the audit logs').then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user.tag}`);
          }).catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to kick the member');
            // Log the error
            console.error(err);
          });
        } else {
          // The mentioned user isn't in this guild
          message.reply('That user isn\'t in this guild!');
        }
      // Otherwise, if no user was mentioned
      } else {
        message.reply('You didn\'t mention the user to kick!');
      }
    }
  });

  client.on('message', message => {
    if (message.content.startsWith("fuck")) {
        //in second your message will be delete for profanity usage
        message.delete(1000).then(d_msg => {d_msg.delete(1000)})
        .catch(err => {
            message.reply('I was unable to delete the message');
            console.log(err);
        })
        message.reply("fuck").then(d_msg => {d_msg.delete(1000)})
        .catch(err => {
            message.reply('I was unable to delete the message');
            console.log(err);
        })
    }
  });


function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1);
    let splitCommand =  fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let arguments = splitCommand.splice(1);

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage);
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage);
    } else {
        receivedMessage.channel.send("Unknown command. Try `!help` or `!multiply`");
    }
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough arugments. Try `!multiplty 2 10`");
        return;
    }
    let product = 1;
    arguments.forEach((value) => {
        product = product * parseFloat(value);
    });
    receivedMessage.channel.send("The product of " + arguments + " is " + product.toString());
}


function helpCommand(arguments, receivedMessage) {
    if (arguments.length == 0) {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`");
    } else {
        receivedMessage.channel.send("It looks like you need some help.... type `Help! [topic]`" + arguments);
    }
}

function helloCommand(receivedMessage) {
    let reply = receivedMessage.content.substr(1);
    let hello = reply.split(" ");
    let fine = hello[0];
    let bad = hello.splice[1];
    let goody = hello.splice[1];
    if (bad == "hello") {
        replyCommand(bad, receivedMessage);
    } else if (bad == "fine"){
        replyCommand(bad, receivedMessage);
    } else {
        receivedMessage.channel.send("hello? reply like this `$hello` or `$fine`");
    } if (goody == "goodbye") {
        replyCommand2(goody, receivedMessage);
    } else if (goody == "bad") {
        replyCommand2(goody, receivedMessage);
    } else {
        receivedMessage.channel.send("Goodbye? reply if you feel good or not '$goodbye' or '$bad'");
    }
}

function replyCommand(bad, receivedMessage) {
    if (bad.length == 0) {
        receivedMessage.channel.send("Welcome to Sammy's server? `$hello [topic]`");
    } else {
        receivedMessage.channel.send("Awesome!! see ya `fine`" + bad);
    } 
}

function replyCommand2(goody, receivedMessage) {
    if (goody.length == 0) {
        receivedMessage.channel.send("Welcome to Sammy's server, are you feeling fine? `$goodbye [topic]`");
    } else {
        receivedMessage.channel.send("oh that's bad!!!! see ya `$bad`" + goody);
    } 
}



client.login("NjY3MDc4NTkyOTE5NzY1MDMy.XkRjxw.T99Lz-vU1XeIoy-9LgTLR3tTw8U");
//sometimes the token should be changed due to session time and limits




/*
dev code for mybot.js
-- it's still in development stage


*/