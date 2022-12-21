import { Listener } from "@sapphire/framework";
import { CategoryChannelResolvable, Collection, Interaction, MessageActionRow, MessageButton, MessageCollector } from "discord.js";
import { Embed } from "../structures/Embed";

export class InteractionCreateListener extends Listener {
  async run(i: Interaction) {
    if(!i.isButton()) return
    if(i.customId !== 'createTicket') return
    let category = await this.container.client.channels.cache.get('1053092593401085984') as CategoryChannelResolvable
    let channelExist = i.guild?.channels.cache.some(m => m.name === `📂﹕ticket-${i.user.id}`)
    if(channelExist) return i.reply({ embeds: [new Embed(i.user).setTitle('<:inbox:1054684654910832730> | Ticket já existente!').setDescription(`No nosso sistema consta um ticket com seu nome!`)], ephemeral: true})
    let channel = await i.guild?.channels.create(`📂﹕ticket-${i.user.id}`, {
      parent: category,
      permissionOverwrites: [
        {
          id: i.guild.roles.everyone.id,
          deny: ['VIEW_CHANNEL']
        },
        {
          id: i.user.id,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        },
      ]
    })!
    let msg = await channel.send({ content: i.user.toString(), embeds: [new Embed(i.user).setTitle('<:star:1054684660371816468> | Ticket criado!').setDescription('Esse ticket expirará em 2 minutos se você não enviar nenhuma mensagem')]})
    let button = new MessageButton({ style: 'LINK', label: 'Clique aqui', url: msg.url})
    let actionRow = new MessageActionRow({ components: [button] })
    setTimeout(() => {
      if(channel.messages.cache.size > 1) return
      channel.delete()
    }, 2 * 60 * 1000);
    await i.reply({ embeds: [new Embed(i.user).setTitle('<:star:1054684660371816468> | Seu ticket foi criado!')], components: [actionRow], ephemeral: true })
  }
}