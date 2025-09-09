import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { OwnersService } from 'src/owners/owners.service';
import { PetLimitExceededException } from 'src/exceptions/pet.exceptions';

@Injectable()
export class PetsService {


  private pets: Pet[] = [
    {
      id: 1,
      name: 'Firulais',
      species: 'dog',
      age: 24,
      breed: 'Labrador',
      ownerId: 3,
      isVaccinated: true,
      lastVaccinationDate: new Date('2025-05-10'),
      createdAt: new Date('2025-01-15'),
    },
    {
      id: 2,
      name: 'Michi',
      species: 'cat',
      age: 12,
      breed: 'Siames',
      ownerId: 2,
      isVaccinated: false,
      createdAt: new Date('2025-02-20'),
    },
    {
      id: 3,
      name: 'Piolín',
      species: 'bird',
      age: 6,
      breed: 'Canario',
      ownerId: 3,
      isVaccinated: false,
      createdAt: new Date('2025-03-05'),
    },
    {
      id: 4,
      name: 'Rocky',
      species: 'dog',
      age: 36,
      breed: 'Bulldog',
      ownerId: 4,
      isVaccinated: true,
      lastVaccinationDate: new Date('2025-06-01'),
      createdAt: new Date('2025-01-25'),
    },
    {
      id: 5,
      name: 'Nube',
      species: 'other',
      age: 18,
      breed: 'Conejo',
      ownerId: 5,
      isVaccinated: true,
      lastVaccinationDate: new Date('2025-04-15'),
      createdAt: new Date('2025-02-10'),
    },
    {
      id: 6,
      name: 'Rambo',
      species: 'dog',
      age: 15,
      breed: 'Bulldog',
      ownerId: 3,
      isVaccinated: false,
      createdAt: new Date('2025-02-10'),
    },
    {
      id: 7,
      name: 'Haley',
      species: 'cat',
      age: 2,
      breed: 'gato',
      ownerId: 3,
      isVaccinated: true,
      lastVaccinationDate: new Date('2021-01-15'),
      createdAt: new Date('2025-02-10'),
    },
    {
      id: 8,
      name: 'Cari',
      species: 'cat',
      age: 6,
      breed: 'gato',
      ownerId: 3,
      isVaccinated: true,
      lastVaccinationDate: new Date('2021-09-15'),
      createdAt: new Date('2025-02-10'),
    },
  ];
  
  
    constructor(
      private readonly ownersService: OwnersService
    ){
  
    }
  

  findAll(): Pet[] {
        return this.pets.sort((a, b) => a.id - b.id); ;
  }

  findOne(id: number): Pet | undefined {
    const pet = this.pets.find(p => p.id === id);
   
    return pet;
  }

  findByOwner(idOwner: number): Pet[] {
    const petsByOwner = this.pets.filter(p => p.ownerId === idOwner);
    if (!petsByOwner) {
          throw new NotFoundException(`Owner con Id ${idOwner} no encontrado`);
        }

    return petsByOwner.sort((a, b) => a.id - b.id); ;
  }

  private nextId = 9


  create(createPetDto: CreatePetDto): Pet {

    const owner = this.ownersService.findOne(createPetDto.ownerId);
    if (!owner) {
      throw new NotFoundException(`El Owner con Id ${createPetDto.ownerId} no encontrado`);
    }
    
    if (owner.registeredPets >= 5) {
      throw new PetLimitExceededException(owner.name);
    }

    
    const newPet: Pet = {
      id: this.nextId++,
      ...createPetDto,
      createdAt: new Date()
    }
    this.pets.push(newPet);
    
    this.ownersService.updatePetCount(createPetDto.ownerId, 1);

    return newPet;
  }






/*
  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
*/

}
