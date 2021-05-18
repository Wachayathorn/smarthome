import { ConfigService } from '@nestjs/config';
import { Connection, createConnection } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'TYPEORM_CONNECTION',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService): Promise<Connection> =>
            await createConnection(configService.get('typeormConnection')),
    },
];
