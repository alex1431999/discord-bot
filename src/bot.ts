import { Client, Intents } from "discord.js";

export default class Bot {
  private client: Client;

  private authToken = process.env.AUTH_TOKEN;

  constructor() {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });

    this.client.on('message', message => {
      console.log(message.content);
      message.channel.send('test');
    });

    this.login();
  }

  private async login() {
    const result = await this.client.login(this.authToken);

    console.log('logged in...');
  
    return result;
  }
}