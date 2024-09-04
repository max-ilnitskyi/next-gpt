import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { MessageTypes } from './message.types';
import { DatabaseTables } from '@/server/database/databaseTypes';

import { BaseEntity } from '@/server/database/base.entity';
import { User } from '@/server/models/user/user.entity';

@Entity(DatabaseTables.MESSAGES)
export class Message extends BaseEntity {
  @Column({
    type: 'integer',
  })
  user_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({
    type: 'text',
  })
  content!: string;

  @Column({
    type: 'decimal',
  })
  valence!: number;

  @Column({
    type: 'decimal',
  })
  arousal!: number;

  @Column({
    type: 'enum',
    enum: MessageTypes,
    default: MessageTypes.USER_MESSAGE,
  })
  type!: MessageTypes;
}
