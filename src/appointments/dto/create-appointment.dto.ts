import { IsDateString, IsIn, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateAppointmentDto {
    
    @IsNotEmpty({ message: 'Falta indicar el petId'})
    petId: number;

    @IsNotEmpty({ message: 'El nombre veterinario es obligatorio'})
    @MinLength(2, {message: 'El nombre veterinario debe tener minimo 2 caracteres'})
    @MaxLength(100, {message: 'El nombre veterinario no puede exceder los 100 caracteres'})
    veterinarian: string;

    
    //@IsDateString({}, { message: 'La fecha de Appointment debe ser una fecha válida' })
    @IsNotEmpty({ message: 'Falta indicar el appointmentDate'})
    appointmentDate: Date;

    @IsNotEmpty({ message: 'El tipo de servicio es obligatorio'})
    @IsIn(['consultation', 'vaccination', 'surgery', 'grooming'],
        {message: 'El servicio debe ser: consultation, vaccination, surgery, grooming'}
    )
    service: 'consultation' | 'vaccination' | 'surgery' | 'grooming';

    @IsOptional()
    notes?: string;
    
}
