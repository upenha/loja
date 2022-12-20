import { SapphireClient, SapphireClientOptions, LogLevel } from '@sapphire/framework';

export class Client extends SapphireClient {
  constructor(options?: SapphireClientOptions) {
    super({
      ...options,
      logger: {
        level: LogLevel.None
      },
      caseInsensitiveCommands: true,
      intents: ['GUILDS', 'GUILD_MESSAGES'],
      partials: ['CHANNEL']
    })
  }

  public async login(token = process.env.DISCORD_TOKEN) {
    return await super.login(token)
  }
}