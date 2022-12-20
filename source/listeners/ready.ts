import { Listener } from "@sapphire/framework";

export class ReadyListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: true,
      event: 'ready',
    })
  }
  async run() {
    await this.container.client.application?.fetch()
    console.log('Online')
    this.container.client.user?.setPresence({
      activities: [
        { name: 'compras! 💸', type: 'WATCHING' }
      ]
    })
  }
}