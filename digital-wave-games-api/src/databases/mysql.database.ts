import knex from 'knex';
import * as attachPaginate from 'knex-paginate';
import { DB } from '../utils/secrets';

const connection = knex({

    client: 'mysql',
    connection: {
        port: parseInt(DB.PORT),
        host: DB.HOST,
        user: DB.USER,
        password: DB.PASSWORD,
        database: DB.DATABASE,
        requestTimeout: Infinity
    },
    useNullAsDefault: true,

});

attachPaginate.attachPaginate();

export default connection;
