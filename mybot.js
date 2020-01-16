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
        // // receivedMessage.guild.emojis.forEach(customEmoji => {
        // //     console.log(`${customEmoji.name} ${customEmoji.id}`)
        // //     receivedMessage.react(customEmoji);
        // // });
        // let customEmoji = receivedMessage.guild.emojis.get("667109410035728412");
        // receivedMessage.react(customEmoji);

        if (receivedMessage.content.startsWith("!")) {
            processCommand(receivedMessage);
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
        receivedMessage.channel.send("It looks like you need some help " + arguments);
    }
}

client.login("NjY3MDc4NTkyOTE5NzY1MDMy.XiC-vQ.3qPBb_KKIIc-NkabeKIPvE33lYI");
