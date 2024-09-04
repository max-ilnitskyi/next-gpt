import { Entity } from 'typeorm';

import { DatabaseTables } from '@/server/database/databaseTypes';

import { BaseEntity } from '@/server/database/base.entity';

@Entity(DatabaseTables.USERS)
export class User extends BaseEntity {}
