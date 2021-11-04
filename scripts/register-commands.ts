import './setup';
import Commands from "../src/commands";

const commands = new Commands();

commands.register()
  .then(() => console.log('Commands have been registered.'))
  .catch(console.error);