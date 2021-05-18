import * as path from 'path';

export default () => ({
    typeormConnection: {
        type: process.env.TYPEORM_TYPE,
        host: process.env.TYPEORM_HOST,
        port: process.env.TYPEORM_PORT,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        entities: [path.resolve(__dirname, '../entities/*{.ts,.js}')],
        synchronize: false,
    },
});
