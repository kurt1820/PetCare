import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePetDto {

    
    @IsNotEmpty({ message: 'El nombre es obligatorio'})
    @IsString({message: 'El nombre debe ser un texto'})
    @MinLength(2, {message: 'El nombre debe tener minimo 2 caracteres'})
    @MaxLength(100, {message: 'El nombre no puede exceder los 100 caracteres'})
    name: string;
    
    @IsIn(['dog', 'cat', 'bird', 'other'],
        {message: 'La especie debe ser: dog, cat, bird, other'}
    )
    species: 'dog' | 'cat' | 'bird' | 'other';

    @IsNotEmpty({ message: 'La edad es obligatoria'})
    age: number; // en meses

    @IsNotEmpty({ message: 'La raza es obligatoria'})
    breed: string;

    @IsNotEmpty({ message: 'El propietario ownerId es obligatorio'})
    ownerId: number;

    @IsNotEmpty({ message: 'Falta indicar si la mascota esta vacunada'})
    isVaccinated: boolean;

    @IsOptional()
    lastVaccinationDate?: Date;


}
