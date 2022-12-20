import { Precondition } from '@sapphire/framework';
import type { CommandInteraction, User } from 'discord.js';

export class OwnerOnlyPrecondition extends Precondition {
	public async chatInputRun(interaction: CommandInteraction) {
		return this.checkUser(interaction.user.id);
	}

	public checkUser(userId: string) {
		const user = this.container.client.application?.owner as User;
		if (user.id === userId) {
			return this.ok();
		} else return this.error({ message: 'Apenas o Upenha pode executar esse comando!' });
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		OwnerOnly: never;
	}
}