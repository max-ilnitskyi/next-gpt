import { User } from './user.entity';
import DatabaseConnection from '@/api/database/connection';

export class UserService {
  static async getRepository() {
    const connection = await DatabaseConnection.getDb();
    return connection.getRepository(User);
  }

  static async findAll(): Promise<User[]> {
    const repository = await this.getRepository();
    return await repository.find();
  }

  static async findOne(id: number): Promise<User | null> {
    const repository = await this.getRepository();
    return await repository.findOneBy({ id });
  }

  static async create(user: User): Promise<User> {
    const repository = await this.getRepository();
    return repository.save(user);
  }
}
