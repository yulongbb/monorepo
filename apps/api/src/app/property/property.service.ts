import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository, Like } from 'typeorm';
import { Property } from './property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: TreeRepository<Property>
  ) {}

  async create(property: any): Promise<Property> {
    const p = await this.propertyRepository.findOneBy({ name: property.name });
    console.log(p);
    if (p) {
      property.id = p?.id;
    }
    console.log(property);

    return this.propertyRepository.save(property);
  }

  findOne(id: any): Promise<Property> {
    return this.propertyRepository.findOneBy({ id: id });
  }

  findByName(name: any, id: any): Promise<Property[]> {
    return this.propertyRepository.find({
      where: { name: Like(`%${name}%`), schemas: [{ id: id }] },
    });
  }

  findAll(id: any): Promise<Property[]> {
    return this.propertyRepository.find({ where: { schemas: [{ id: id }] } });
  }
}
