import { DeleteResult } from 'typeorm';

import { Message } from './message.entity';
import DatabaseConnection from '@/server/database/connection';

export class MessageService {
  static async getRepository() {
    const connection = await DatabaseConnection.getDb();
    return connection.getRepository(Message);
  }

  static async findAll(): Promise<Message[]> {
    const repository = await this.getRepository();
    return await repository.find();
  }

  static async findOne(id: number): Promise<Message | null> {
    const repository = await this.getRepository();
    return await repository.findOneBy({ id });
  }

  static async create(message: Message): Promise<Message> {
    const repository = await this.getRepository();
    return await repository.save(message);
  }

  static async delete({
    id,
    userId,
  }: {
    id: number;
    userId: number;
  }): Promise<DeleteResult> {
    const repository = await this.getRepository();
    return await repository.delete({ id, user_id: userId });
  }
}
