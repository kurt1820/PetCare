import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {


  private owners: Owner[] = [
    {
      id: 1,
      name: 'Carlos Pérez',
      email: 'carlos@example.com',
      phone: '999111222',
      address: 'Av. Siempre Viva 123',
      registeredPets: 1,
      createdAt: new Date('2025-01-01'),
    },
    {
      id: 2,
      name: 'Ana Gómez',
      email: 'ana@example.com',
      phone: '988222333',
      address: 'Calle Luna 456',
      registeredPets: 1,
      createdAt: new Date('2025-01-05'),
    },
    {
      id: 3,
      name: 'Luis Ramírez',
      email: 'luis@example.com',
      phone: '977333444',
      address: 'Jr. Estrella 789',
      registeredPets: 5,
      createdAt: new Date('2025-02-01'),
    },
    {
      id: 4,
      name: 'María Torres',
      email: 'maria@example.com',
      phone: '966444555',
      address: 'Psje. Sol 321',
      registeredPets: 1,
      createdAt: new Date('2025-02-10'),
    },
    {
      id: 5,
      name: 'Pedro Sánchez',
      email: 'pedro@example.com',
      phone: '955555666',
      address: 'Av. Central 654',
      registeredPets: 1,
      createdAt: new Date('2025-03-01'),
    },
  ];


  findAll(): Owner[] {
    return this.owners.sort((a, b) => a.id - b.id); ;
  }

  findOne(id: number): Owner | undefined {
    return this.owners.find(p => p.id === id);
  }


  private nextId = 6

  create(createOwnerDto: CreateOwnerDto): Owner {
    const newOwner: Owner = {
      id: this.nextId++,
      ...createOwnerDto,
      registeredPets: 0, //al registrar un Owner por default es 0
      createdAt: new Date()
    }

    this.owners.push(newOwner);
    return newOwner;
  }



  updatePetCount(ownerId: number, delta: number):void {
        const owner = this.findOne(ownerId);
        if (owner) {
            owner.registeredPets = Math.max(0, owner.registeredPets + delta);
        }
  }



/*
  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
*/


}
