import { Client, Intents } from "discord.js";
import Commands from "./commands";

export default class Bot {
  private client: Client;

  private commands: Commands;

  private authToken = process.env.AUTH_TOKEN;

  constructor() {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    this.commands = new Commands();

    this.client.on('interactionCreate', interaction => {
      this.commands.commands.forEach(command => {
        if (command.name === (interaction as any).commandName) {
          const response = command.action(interaction) || command.response;

          (interaction as any).reply(response);
        }
      })
    })

    this.login();
  }

  private async login() {
    const result = await this.client.login(this.authToken);

    console.log('logged in...');
  
    return result;
  }
}