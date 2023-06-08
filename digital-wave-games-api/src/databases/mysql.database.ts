import knex from 'knex';
import * as attachPaginate from 'knex-paginate';
import { MYSQL } from '../utils/secrets';

const connection = knex({

    client: 'mysql',
    connection: {
        port: parseInt(MYSQL.PORT),
        host: MYSQL.HOST,
        user: MYSQL.USER,
        password: MYSQL.PASSWORD,
        database: MYSQL.DATABASE,
        requestTimeout: Infinity
    },
    useNullAsDefault: true,

});

attachPaginate.attachPaginate();

export default connection;
