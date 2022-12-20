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
		await interaction.channel?.send({ embeds: [new MessageEmbed().setImage('https://i.imgur.com/sPbFfbX.png').setColor('#2f3136')]})
		await interaction.channel?.send({ embeds: [new Embed().setImage('https://i.imgur.com/p112FgS.png').setTitle('<:chat:1054684650041253949> | Deseja criar um ticket?').setDescription('Para criar um ticket clique no botão abaixo!')], components: [new MessageActionRow().addComponents(new MessageButton({ style: 'SUCCESS', label: 'Abrir ticket', customId: 'createTicket'}))]})
		await interaction.deleteReply()
	}
}
