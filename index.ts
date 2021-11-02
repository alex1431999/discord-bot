import * as dotEnv from 'dotenv';
import Bot from './src/bot';

dotEnv.config();

new Bot();