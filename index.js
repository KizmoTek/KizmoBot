/* Copyright (c) 2018 by KizmoTek <kizmotek@gmail.com>
 * All rights reserved.
 *
 * License: 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   - Redistributions of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */


const Discord = require("discord.js"); //Loads the discord library

const client = new Discord.Client(); //The name to refer to the bot in code

const config = require("./config.json"); //Requires the config file

client.commands = new Discord.Collection();

client.on("ready", () => {
  console.log(`KizmoBot is running, you better go catch it.`);

  client.user.setActivity("on " + client.guilds.size + " servers!");
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args);

});

var adminRoles = ["owner", "Owner", "leader", "Leader", "creator", "Creator", "admin", "Admin", "administrator", "Administrator", "mod", "Mod", "mods", "Mods", "moderator", "Moderator", "BotCommand", "botCommand", "botcommand", "bc", "BC"]

var notModerator = "You do not have permission to run this command, type /help in the server to see what roles you need to use the bots commands."

client.on('error', console.error);



setInterval(function(){
  var activites = ["on " + client.guilds.size + " servers!", `/help or /support`]
  let activity = activites[Math.floor(Math.random() * activites.length)]
  client.user.setActivity(activity, {type: "PLAYING"});
}, 20000);

//Custom code for KizmoTek server
client.on('raw', event => {
  const eventName = event.t;

  //KizmoTek Logo Reaction
  if(eventName === 'MESSAGE_REACTION_ADD') {
    if(event.d.message_id === '580065558138060851') {
      var reactionChannel = client.channels.get(event.d.channel_id);
      if(reactionChannel.messages.has(event.d.message_id)) {
        return;
      } else {
        reactionChannel.fetchMessage(event.d.message_id)
        .then(msg => {
          var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id)
          var user = client.users.get(event.d.user_id)
          client.emit('messageReactionAdd', msgReaction, user)
        })
        .catch(err => console.log(err))
      }
    }
  } else if(eventName === 'MESSAGE_REACTION_REMOVE') {
    if(event.d.message_id === '580065558138060851') {
      var reactionChannel = client.channels.get(event.d.channel_id);

      if(reactionChannel.messages.has(event.d.message_id)) {
        return;
      } else {
        reactionChannel.fetchMessage(event.d.message_id)
        .then(msg => {
          var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id)
          var user = client.users.get(event.d.user_id)
          client.emit('messageReactionRemove', msgReaction, user)
        })
        .catch(err => console.log(err))
      }
    }

    //Solo Blox Logo Reaction
    if(eventName === 'MESSAGE_REACTION_ADD') {
      if(event.d.message_id === '624709417060925444') {
        var reactionChannel = client.channels.get(event.d.channel_id);
        if(reactionChannel.messages.has(event.d.message_id)) {
          return;
        } else {
          reactionChannel.fetchMessage(event.d.message_id)
          .then(msg => {
            var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id)
            var user = client.users.get(event.d.user_id)
            client.emit('messageReactionAdd', msgReaction, user)
          })
          .catch(err => console.log(err))
        }
      }
    } else if(eventName === 'MESSAGE_REACTION_REMOVE') {
      if(event.d.message_id === '624709417060925444') {
        var reactionChannel = client.channels.get(event.d.channel_id);
  
        if(reactionChannel.messages.has(event.d.message_id)) {
          return;
        } else {
          reactionChannel.fetchMessage(event.d.message_id)
          .then(msg => {
            var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id)
            var user = client.users.get(event.d.user_id)
            client.emit('messageReactionRemove', msgReaction, user)
          })
          .catch(err => console.log(err))
        }
      }
    }
  }
})

client.on('messageReactionAdd', (messageReaction, user) => {
    var roleName
    if (messageReaction.emoji.name == "Kizmo") {
      roleName = "Updates"
    }

    if (messageReaction.emoji.name == "SoloBlox") {
      roleName = "Pool Updates"
    }
    
    
    if(roleName) {
      var role = messageReaction.message.guild.roles.find(role => role.name.toLocaleLowerCase() === roleName.toLowerCase());
      var member = messageReaction.message.guild.members.find(member => member.id === user.id);
      if(member) {
        member.addRole(role.id)
        return messageReaction.message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${member.id}> Got added to the ` + role.name + ` role.`);
      }
    }
})

client.on('messageReactionRemove', (messageReaction, user) => {
    var roleName
    if (messageReaction.emoji.name == "Kizmo") {
      roleName = "Updates"
    }

    if (messageReaction.emoji.name == "SoloBlox") {
      roleName = "Pool Updates"
    }
    
    
    if(roleName) {
      var role = messageReaction.message.guild.roles.find(role => role.name.toLocaleLowerCase() === roleName.toLowerCase());
      var member = messageReaction.message.guild.members.find(member => member.id === user.id);
      if(member) {
        member.removeRole(role.id)
        console.log("removed")
        return messageReaction.message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${member.id}> Got removed from the ` + role.name + ` role.`);
      }
    }
})

client.on('message', async message => {
  if(message.author.bot) return;  
  if(!message.guild) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "kick") {
    if(!message.member.roles.some(r=>adminRoles.includes(r.name)) ){
      message.author.send(notModerator)
      .catch(error => console.log(`Unable to message ${message.author} because of: ${error}`))
      message.delete(1);
    }
      else {
      
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        
        if(!member){
          message.delete(1);
            return message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${message.author.id}>, Please mention a valid member of this server.`);
          }
          
          if(!member.kickable) {
            message.delete(1);
              return message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${message.author.id}>, Unable to kick user.`);
          }
          
          let reason = args.slice(1).join(' ');
        
          if(!reason){
            message.delete(1);
              return message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${message.author.id}>, Please provide a reason.`);
          }
          message.delete(1);
          member.send(`You have been kicked from the server by <@${message.author.id}> because: ${reason}`)
          .catch(error => console.log(`Unable to message <@${member.user.id}> because of: ${error}`))

          setTimeout(() => {
            member.kick(reason)
            .catch(error => message.guild.channels.find(channel => channel.name === "bot-logs").send(`Sorry ${message.author} I couldn't kick because of : ${error}`));
          }, 100); 
          message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${member.user.id}> has been kicked by <@${message.author.id}> because: ${reason}`);
      }
    }

    if(command === "ban") {
      if(!message.member.roles.some(r=>adminRoles.includes(r.name)) ) {
        message.author.send("You are not a moderator, please do not attempt to run commands.")
        .catch(error => console.log(`Unable to message ${message.author} because of: ${error}`))
        message.delete(1);
      }
        else {
          let member = message.mentions.members.first();
      
          if(!member) {
            message.delete(1);
            return message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${message.author.id}>, Please mention a valid member of this server.`);
          }
        
          if(!member.bannable) {
            message.delete(1);
            return message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${message.author.id}>, Unable to ban user.`);
          }
      
          let reason = args.slice(1).join(' ');
          
          if(!reason){
            message.delete(1);
            return message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${message.author.id}>, Please provide a reason.`);
          }
          message.delete(1);
          member.send(`You have been banned from the server by <@${message.author.id}> because: ${reason}`)
          .catch(error => console.log(`Unable to message <@${member.user.id}> because of: ${error}`))
          
          setTimeout(() => {
            member.ban(reason)
            .catch(error => message.guild.channels.find(channel => channel.name === "bot-logs").send(`Sorry ${message.author} I couldn't ban because of : ${error}`));
          }, 100);
          
          message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${member.user.id}> has been banned by <@${message.author.id}> because: ${reason}`);
        }
    }

    if(command === "support") {
        message.author.send("If you need help setting up the bot or have issues, please join the official KizmoBot discord server: https://discord.gg/h2vzfKn")
        .catch(error => console.log(`Unable to message ${message.author} because of: ${error}`))
        message.delete(1);
    }

    if(command === "help") {
      if(!message.member.roles.some(r=>adminRoles.includes(r.name)) ) {
        message.author.send("You do not have any commands to use. If this is incorrect, please add a role to yourself that has one of these names: Owner, Leader, Creator, Admin, Administrator, Mod, Mods, Moderator, BotCommand or BC.\nIf you need help setting up the bot, join the official KizmoBot discord server: https://discord.gg/h2vzfKn")
        .catch(error => console.log(`Unable to message ${message.author} because of: ${error}`))
        message.delete(1);
      }
      else { /* \n/clear @user *amount of replies to remove* (This will delete up to 100 replies from the person you specify.) */
        message.author.send("Here are the list of commands so far integrated into the bot, you must have a role with one of these names to use them: \n/ban @user *reason* \n/kick @user *reason* \n/warn @user reason \n/help \n\n If the bot runs into any issues/bugs or you need help setting it up, please join the official KizmoBot discord server: https://discord.gg/h2vzfKn")
        .catch(error => console.log(`Unable to message ${message.author} because of: ${error}`))
        message.delete(1);
      }
    }
    
    if(command === "warn") {
      if(!message.member.roles.some(r=>adminRoles.includes(r.name)) ) {
        message.author.send(notModerator)
        .catch(error => console.log(`Unable to message ${message.author}> because of: ${error}`))
        message.delete(1);
      }
        else {
          let member = message.mentions.members.first();
          if(!member) {
            message.delete(1);
            return message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${message.author.id}>, Please mention a valid member of this server.`);
          }
      
          let reason = args.slice(1).join(' ');
          
          if(!reason){
            message.delete(1);
            return message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${message.author.id}>, Please provide a reason.`);
          }
          message.delete(1);
          member.send(`${message.author} has given you a warning because: ${reason}`)
          .then(message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${message.author.id}> warned <@${member.user.id}> because: ${reason}`))
          .catch(error => message.guild.channels.find(channel => channel.name === "bot-logs").send(`Sorry ${message.author} I couldn't warn the user because of : ${error}`));
        }
      }

      // if(command === "clear" || command === "prune") {
      //   if(!message.member.roles.some(r=>adminRoles.includes(r.name)) ) {
      //     message.author.send("You are not a moderator, please do not attempt to run commands.")
      //     .catch(error => console.log(`Unable to message ${message.author} because of: ${error}`))
      //     message.delete(1);
      //   }
      //   else{
      //     let member = message.mentions.members.first();
      //     const deleteCount = parseInt(args[1], 10);
      //     var currentCount = 0;
      //     message.delete(1);
      //     if(!deleteCount || deleteCount < 2 || deleteCount > 100){
      //       return message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${message.author.id}>, Please provide a number between 2 and 100 for the number of messages to delete.`);
      //     }
          
      //     //const fetched = await message.channel.fetchMessages({limit: 100});
      //     //let msg_array = fetched.array();

      //     //msg_array = msg_array.filter(m => {if(currentCount < deleteCount){if(m.author.id === member.id){currentCount += 1; return true}}return false})
      //     //msg_array.map(m => m.delete().catch(error => message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${message.author.id}>, I couldn't prune messages because of: ${error}`)))
      //     await message.channel.fetchMessages({ limit: deleteCount }).then(messages => { // Fetches the messages
      //       message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
      //       .catch(error => console.log(`Unable to delete messages from ${message.author} because of: ${error}`))
      //   )});
        
      //   }
      // }

      if(command === "feedback") { //Custom code for KizmoTek server
            let feedback = args.slice(0).join(' ');
            let originalAuthor = message.author.id

            if(!feedback){
              message.delete(1);
              return message.author.send('Please provide valid feedback.')
            }
            message.delete(1);
            message.guild.channels.find(channel => channel.name === "feedback").send(`<@${message.author.id}> has provided feedback, react with ${"❌"} if you disagree or ${"✅"} if you agree with the feedback.\n\n${feedback}`)
            .then( function(message) {
              message.react("❌")
              message.react("✅")
              message.guild.channels.find(channel => channel.name === "bot-logs").send(`<@${originalAuthor}> gave feedback: ${feedback}`)
            })
            .catch(error => message.guild.channels.find(channel => channel.name === "bot-logs").send(`Sorry ${message.author} I couldn't warn the user because of : ${error}`));
          }

  });

client.login(config.token);