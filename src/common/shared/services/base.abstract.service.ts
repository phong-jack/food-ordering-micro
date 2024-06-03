import { FindAllResponse } from 'src/types/common.type';
import { BaseEntity } from '../base/base.entity';
import { BaseServiceInterface } from './base.interface.service';
import { BaseRepositoryInterface } from '../repository/base.interface.repository';

export abstract class BaseServiceAbstract<T extends BaseEntity>
  implements BaseServiceInterface<T>
{
  constructor(private readonly repository: BaseRepositoryInterface<T>) {}

  async create(item: T | any): Promise<T> {
    return await this.repository.create(item);
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    return await this.repository.update(id, item);
  }

  async remove(id: string): Promise<boolean> {
    return await this.repository.permanentlyDelete(id);
  }

  async findAll(filter: object, options?: object): Promise<T[]> {
    return await this.repository.findAll(filter, options);
  }

  async findOne(id: string): Promise<T> {
    return await this.repository.findOneById(id);
  }

  async findOneByCondition(filter: Partial<T>): Promise<T> {
    return await this.repository.findOneByCondition(filter);
  }
}
