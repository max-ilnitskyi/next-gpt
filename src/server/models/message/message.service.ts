import { DeleteResult } from 'typeorm';
import includes from 'lodash/includes';
import isFinite from 'lodash/isFinite';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import compact from 'lodash/compact';
import assign from 'lodash/assign';
import min from 'lodash/min';

import { IndexQueryOptions } from '@/server/server.types';
import { MessageTypes } from './message.types';

import { Message } from './message.entity';

import DatabaseConnection from '@/server/database/connection';

const MessageOrderBySort: Record<string, Record<string, 'ASC' | 'DESC'>> = {
  CREATED_AT_DESC: { created_at: 'DESC' },
  CREATED_AT_ASC: { created_at: 'ASC' },
};

const messageDefaultOrder = MessageOrderBySort.CREATED_AT_DESC;

export class MessageService {
  static async getRepository() {
    const connection = await DatabaseConnection.getDb();
    return connection.getRepository(Message);
  }

  static async find(options: IndexQueryOptions): Promise<Message[]> {
    const repository = await this.getRepository();

    // TODO separate
    const where: Record<string, unknown> = {};

    if (options.filters?.userId && isFinite(options.filters.userId)) {
      where.user_id = options.filters.userId;
    }

    if (options.filters?.type && includes(MessageTypes, options.filters.type)) {
      where.type = options.filters.type;
    }

    // TODO separate
    const order: Record<string, 'ASC' | 'DESC'> = assign(
      {},
      ...compact(
        map(options.sort, (sortOption) => MessageOrderBySort[sortOption]),
      ),
    );

    return await repository.find({
      where: isEmpty(where) ? undefined : where,
      skip:
        options.page && options.limit ? (options.page - 1) * options.limit : 0,
      take: min([options.limit || 1000, 1000]),
      order: isEmpty(order) ? messageDefaultOrder : order,
    });
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
