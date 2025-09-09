import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateOwnerDto {

    @IsNotEmpty({ message: 'El nombre es obligatorio'})
    @MinLength(2, {message: 'El nombre debe tener minimo 2 caracteres'})
    @MaxLength(100, {message: 'El nombre no puede exceder los 100 caracteres'})
    name: string;

    @IsNotEmpty({ message: 'El email es obligatorio'})
    @IsEmail({}, { message: 'El formato email no es correcto'})
    email: string;

    @IsNotEmpty({ message: 'El numero telefono es obligatorio'})
    phone: string;

    @IsNotEmpty({ message: 'La direccion es obligatoria'})
    @MinLength(2, {message: 'La direccion debe tener minimo 2 caracteres'})
    @MaxLength(100, {message: 'La direccion no puede exceder los 100 caracteres'})
    address: string;
    
}
