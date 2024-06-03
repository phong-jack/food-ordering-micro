import { FindAllResponse } from 'src/types/common.type';
import { BaseEntity } from '../base/base.entity';
import { BaseRepositoryInterface } from './base.interface.repository';
import { Document, FilterQuery, Model, QueryOptions } from 'mongoose';

export abstract class BaseRepositoryAbstract<T extends BaseEntity>
  implements BaseRepositoryInterface<T>
{
  protected constructor(private readonly model: Model<T>) {
    this.model = model;
  }

  async create(dto: T | any): Promise<T> {
    const createData = await this.model.create(dto);
    return createData;
  }

  async findOneById(id: string): Promise<T> {
    const item = await this.model.findById(id);
    return item.deletedAt ? null : item;
  }

  async findOneByCondition(condition?: object): Promise<T> {
    return await this.model
      .findOne({
        ...condition,
        deletedAt: null,
      })
      .exec();
  }

  // async findAll(
  //   condition: FilterQuery<T>,
  //   options?: QueryOptions<T>,
  // ): Promise<FindAllResponse<T>> {
  //   const count = await this.model.countDocuments({
  //     ...condition,
  //     deletedAt: null,
  //   });
  //   const items = await this.model.find(
  //     { ...condition, deletedAt: null },
  //     options?.projection,
  //     options,
  //   );

  //   return {
  //     count,
  //     items,
  //   };
  // }

  //switch to use this findAll method
  async findAll(condition: object, options?: object): Promise<T[]> {
    return await this.model.find();
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    return await this.model.findOneAndUpdate(
      {
        _id: id,
        deletedAt: null,
      },
      dto,
      { new: true },
    );
  }

  async softDelete(id: string): Promise<boolean> {
    const deteteItem = await this.model.findById(id);
    if (!deteteItem) {
      return false;
    }
    return !!(await this.model
      .findByIdAndUpdate<T>(id, {
        deletedAt: new Date(),
      })
      .exec());
  }

  async permanentlyDelete(id: string): Promise<boolean> {
    const deleteItem = await this.model.findById(id);
    if (!deleteItem) {
      return false;
    }

    return !!(await this.model.findByIdAndDelete(id));
  }
}
