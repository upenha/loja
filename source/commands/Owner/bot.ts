import { Command } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators'
import { Embed } from '../../structures/Embed';
import { MessageActionRow, MessageAttachment, MessageButton, MessageEmbed } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'Eval!',
  preconditions: ['OwnerOnly'],
})

export class EvalCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
    )
	}
	public async chatInputRun(interaction: Command.ChatInputInteraction) {
		await interaction.deferReply()
		await interaction.channel?.send({ embeds: [new MessageEmbed().setImage('https://i.imgur.com/EtFObIf.png').setColor('#2f3136')]})
		await interaction.channel?.send({ 
      embeds: [
        new MessageEmbed()
        .setImage('https://i.imgur.com/p112FgS.png')
        .setTitle('<:star:1054684660371816468> | Beneficíos de comprar seu bot comigo!')
        .setColor('#2f3136')
        .setDescription([ 
          'Para comprar um bot comigo entre em contato em ticket (<#1054275676993228820>)\n',
          '> <:puzzle:1054693691350073394> **Utilizamos as melhores tecnologias para que seu bot seja o mais atualizado possível!**',
          '> <:cloud:1054684651928698890> **Bot hospedado 24/7.**',
          '> <:credential:1054684653417680936> **Credenciais sempre seguras.**' ,
          '> <:ping:1054684657683279922> **Ping baixíssimo**',
          '> <:price:1054684659117723678> **Preço custo-benefício**',
          '> <:money:1054684656286580746> **Você tem até `1 dia` para pedir devolução do dinheiro!**'
        ].join('\n'))
      ]
    })
		await interaction.deleteReply()
	}
}
