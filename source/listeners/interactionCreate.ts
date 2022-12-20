import { Listener } from "@sapphire/framework";
import { CategoryChannelResolvable, Interaction, MessageActionRow, MessageButton, MessageCollector } from "discord.js";
import { Embed } from "../structures/Embed";

export class InteractionCreateListener extends Listener {
  async run(i: Interaction) {
    if(!i.isButton()) return
    let category = await this.container.client.channels.cache.get('1053092593401085984') as CategoryChannelResolvable
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
    let msg = await channel.send({ content: i.user.toString(), embeds: [new Embed(i.user).setTitle('`✅` | Ticket criado!').setDescription('Esse ticket expirará em 2 minutos se você não enviar nenhuma mensagem')]})
    let button = new MessageButton({ style: 'LINK', label: 'Clique aqui', url: msg.url})
    let actionRow = new MessageActionRow({ components: [button] })
    setTimeout(() => {
      if(channel.messages.cache.size > 1) return
      channel.delete()
    }, 2 * 60 * 1000);
    await i.reply({ embeds: [new Embed().setTitle('`✅` | Seu ticket foi criado!')], components: [actionRow], ephemeral: true })
  }
}