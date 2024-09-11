import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Message } from '@/server/models/message/message.entity';
import { User } from '@/server/models/user/user.entity';

import { IS_PRODUCTION } from '@/config';

class DatabaseConnection {
  static dbPromise?: Promise<DataSource>;

  static getDb(): Promise<DataSource> {
    if (DatabaseConnection.dbPromise) {
      return DatabaseConnection.dbPromise;
    }

    const AppDataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false },
      entities: [Message, User],
      synchronize: !IS_PRODUCTION,
      logging: IS_PRODUCTION,
    });

    const dbPromise = AppDataSource.initialize();

    DatabaseConnection.dbPromise = dbPromise;

    dbPromise.catch((err) => {
      console.log('postgres connect error ', err);
      DatabaseConnection.dbPromise = undefined;
    });

    return dbPromise;
  }
}

export default DatabaseConnection;
