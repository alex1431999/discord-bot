import { REST } from '@discordjs/rest';
import { Routes } from "discord-api-types/v9";

export default class Commands {
  private rest: REST;

  private authToken = process.env.AUTH_TOKEN;
  private clientId = process.env.CLIENT_ID;
  private guildId = process.env.GUILD_ID;

  public commands = [
    {
      name: 'test',
      description: 'test command',
      action: () => console.log('test command')
    }
  ]

  constructor() {
    this.rest = new REST({ version: '9' }).setToken(this.authToken);
  }

  private get commandsData() {
    return this.commands.map(({ name, description }) => ({ name, description }))
  }

  public register() {
    return this.rest.put(Routes.applicationGuildCommands(this.clientId, this.guildId), { body: this.commandsData });
  }
}