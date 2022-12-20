import { Command } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators'

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
				.addStringOption((option) => {
					return option
						.setName('code')
						.setRequired(true)
						.setDescription('eval');
				})
    )
	}
	public async chatInputRun(interaction: Command.ChatInputInteraction) {
		await interaction.deferReply({ ephemeral: true })
		const value = interaction.options.getString('code')!;
		const result = await JSON.stringify(await eval(value), null, 2)
		interaction.editReply({ content: `${interaction.user.toString()} \`\`\`json\n${result}\`\`\`` });
	}
	
}
