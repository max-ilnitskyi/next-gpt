import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

import { MessageTypes } from './message.types';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'integer',
  })
  user_id!: number;

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

  @CreateDateColumn()
  created_at!: string;
}
