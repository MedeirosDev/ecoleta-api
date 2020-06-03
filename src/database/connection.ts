import knex from 'knex';
import * as settings from '../../knexfile';

const connection = knex(settings);

export default connection;