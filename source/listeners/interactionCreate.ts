import { Listener } from "@sapphire/framework";
import { CategoryChannelResolvable, Collection, Interaction, MessageActionRow, MessageButton, MessageCollector } from "discord.js";
import { Embed } from "../structures/Embed";

export class InteractionCreateListener extends Listener {
  async run(i: Interaction) {
    if(!i.isButton()) return
    if(i.customId !== 'createTicket') return
    if(i.channel?.type !== 'GUILD_TEXT') return
    let thread = await i.channel.threads.create({
      name: i.user.id,
      type: 'GUILD_PRIVATE_THREAD',
      autoArchiveDuration: 'MAX',
      invitable: false,
    })
    let msg = await thread.send({ content: i.user.toString(), embeds: [new Embed(i.user).setTitle('<:star:1054684660371816468> | Ticket criado!')] })
    let button = new MessageButton({ style: 'LINK', label: 'Clique aqui', url: msg.url})
    let actionRow = new MessageActionRow({ components: [button] })
    await i.reply({ embeds: [new Embed(i.user).setTitle('<:star:1054684660371816468> | Seu ticket foi criado!')], components: [actionRow], ephemeral: true })
  }
}