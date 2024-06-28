import Server from './server/Server.js';
import 'dotenv/config';

Server.run(process.env.PORT || 8080);
