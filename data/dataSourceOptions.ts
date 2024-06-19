import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'mysql',
            host: configService.get<string>('dbHost'),
            port: configService.get<number>('dbPort'),
            username: configService.get<string>('dbUsername'),
            database: configService.get<string>('dbName'),
            password: configService.get<string>('dbPassword'),
            entities: [],
            autoLoadEntities: true,
            synchronize: false,
            migrations: ['dist/db/migrations/*.js'],
        };
    },
};



export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'wp-data',
    synchronize: false,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/data/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;