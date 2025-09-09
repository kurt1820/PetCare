import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, BadRequestException, UseFilters } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetLimitExceededFilter } from 'src/filters/pet.filters';

@Controller('pets')
@UseFilters(PetLimitExceededFilter)
export class PetsController {
  
  private readonly logger = new Logger(PetsController.name)

  constructor(private readonly petsService: PetsService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto) {

    const edad = createPetDto.age;
    
    if (!edad || isNaN(edad) || edad <= 0) {
      this.logger.error(`Edad recibida: ${edad}`)
      throw new BadRequestException('La edad debe ser mayor a cero');
    }

    const result = this.petsService.create(createPetDto);
    return result;
  }

  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(+id);
  }

  
  @Get('owner/:id')
  findByOwner(@Param('id') id: string) {
    return this.petsService.findByOwner(+id);
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(+id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }

*/
  

  numeroValidoMayorCero(num: string): number{
    const number = parseInt(num, 10);
    
    if (isNaN(number) || number <= 0) {
      this.logger.error(`ID invalido recibido: ${num}`)
      throw new BadRequestException('ID debe ser un numero positivo');
    }

    return number;

  }



}
