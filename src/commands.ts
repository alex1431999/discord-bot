import { REST } from '@discordjs/rest';
import { Routes } from "discord-api-types/v9";
import { Interaction } from 'discord.js';
import Hunting from './hunting/hunting';

type Command = {
  name: string,
  description: string,
  options?: {
    name: string,
    description: string,
    type: number,
  }[],
  response?: string,
  action: (interaction?: Interaction) => void | string,
}

export default class Commands {
  private rest: REST;

  private authToken = process.env.AUTH_TOKEN;
  private clientId = process.env.CLIENT_ID;
  private guildId = process.env.GUILD_ID;

  private hunting = new Hunting();

  public commands: Command[] = [
    {
      name: 'hunt-add',
      description: 'Add a new hunt',
      action: () => this.hunting.addHunt(),
      response: 'Can confirm I added a hunt 🚀',
    },
    {
      name: 'waste-add',
      description: 'Add your waste to the hunt',
      options: [
          {
          name: 'amount',
          description: 'The amount you have wasted',
          type: 4 // integer,
        }
      ],
      action: interaction => {
        const user = interaction.user;
        const amount = (interaction as any).options.getInteger('amount');

        this.hunting.huntActive.addWaste({ user, amount });

        return `LAWL dude imagine wasting ${amount}k 🤣`;
      }
    },
    {
      name: 'loot-add',
      description: 'Add loot to your current hunt',
      options: [
        {
          name: 'amount',
          description: 'The amount of loot that you want to add',
          type: 4 // integer,
        },
      ],
      action: interaction => {
        const amount = (interaction as any).options.getInteger('amount');

        this.hunting.huntActive.lootValue += amount;

        return `Only ${amount}k of loot, can confirm Evan would have made double that 🤣`;
      },
    },
    {
      name: 'loot-distribute',
      description: 'Distribute the loot of the current hunt',
      action: () => this.hunting.distributeLoot(),
    }
  ]

  constructor() {
    this.rest = new REST({ version: '9' }).setToken(this.authToken);
  }

  private get commandsData() {
    return this.commands.map(({ name, description, options }) => ({ name, description, options }))
  }

  public register() {
    return this.rest.put(Routes.applicationGuildCommands(this.clientId, this.guildId), { body: this.commandsData });
  }
}