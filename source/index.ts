require('dotenv/config')
import { Client } from './structures/Client'
const client = new Client()

client.login(process.env.DISCORD_TOKEN)