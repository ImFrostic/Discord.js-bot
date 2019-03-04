const { Client, RichEmbed } = require('discord.js');
const info = require("./info.js");
const util = require("./util.js");

const client = new Client();

let Commands = require("./commands.js")(client, info, RichEmbed);

client.on("message", (message) => {

	let author = message.author;
	let authorid = author.id;
	let content = message.content;

	if (author.bot){
		return;
	}

	if (content.startsWith(info["Prefix"])){
		let replywith = Commands(message);

		if (replywith == "InvalidPermissions"){
			let embed = new RichEmbed()
				.setTitle("Invalid Permissions")
				.setColor(info.Colors["really red"])
				.setDescription("You do not have the needed permissions to use this command.")
				.setFooter(`Sent by <@${message.author.id}>`);

			message.channel.send(embed);
			return;
		}

		if (replywith){
			replywith["Description"] = replywith["Description"] || "";
			replywith["Color"] = replywith["Color"] || info.MainColor;
			replywith["Title"] = replywith["Title"] || "";

			let embed = new RichEmbed()
				.setTitle(replywith["Title"])
				.setColor(replywith["Color"])
				.setDescription(replywith["Description"])
				.setFooter(`<@${message.author.id}> at ${util.date(message.createdAt)}`);

			if (replywith["Fields"]){
				replywith["Fields"].forEach(function(item){
					embed.addField(item.Name || "Empty!", item.Description || "Empty!");
				})
			}

			message.channel.send(embed);
		}
	}
	
});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log(`Prefix: ${info["Prefix"]}`);
});

client.login(info.Token);