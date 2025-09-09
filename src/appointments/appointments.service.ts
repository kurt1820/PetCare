import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { OwnersService } from 'src/owners/owners.service';
import { PetsService } from 'src/pets/pets.service';
import { AppointmentConflictException, VaccinationRequiredException } from 'src/exceptions/appointment.exceptions';


@Injectable()
export class AppointmentsService {
  
  private appointments: Appointment[] = [
    {
      id: 1,
      petId: 1,
      veterinarian: 'Dr. López',
      appointmentDate: new Date('2025-09-15T10:00:00Z'),
      service: 'consultation',
      notes: 'Chequeo general',
      status: 'scheduled',
      createdAt: new Date('2025-08-01'),
    },
    {
      id: 2,
      petId: 2,
      veterinarian: 'Dra. Fernández',
      appointmentDate: new Date('2025-09-20T14:00:00Z'),
      service: 'vaccination',
      status: 'scheduled',
      createdAt: new Date('2025-08-05'),
    },
    {
      id: 3,
      petId: 3,
      veterinarian: 'Dr. Morales',
      appointmentDate: new Date('2025-08-10T09:30:00Z'),
      service: 'grooming',
      notes: 'Recorte de plumas',
      status: 'completed',
      createdAt: new Date('2025-07-20'),
    },
    {
      id: 4,
      petId: 4,
      veterinarian: 'Dra. Salazar',
      appointmentDate: new Date('2025-09-25T16:00:00Z'),
      service: 'surgery',
      notes: 'Esterilización',
      status: 'scheduled',
      createdAt: new Date('2025-08-15'),
    },
    {
      id: 5,
      petId: 5,
      veterinarian: 'Dr. Vega',
      appointmentDate: new Date('2025-08-01T11:00:00Z'),
      service: 'consultation',
      status: 'cancelled',
      createdAt: new Date('2025-07-10'),
    },
  ];


  constructor(
    private readonly ownersService: OwnersService,
    private readonly petsService: PetsService
  ){

  }


  findAll(): Appointment[] {
    return this.appointments.sort((a, b) => a.id - b.id); ;
  }

  findOne(id: number): Appointment | undefined {
    const appointment = this.appointments.find(p => p.id === id);
   
    return appointment;
  }

  
/*
  findAll(): Pet[] {
        return this.pets;
  }

  findOne(id: number): Pet | undefined {
    const pet = this.pets.find(p => p.id === id);
   
    return pet;
  }
  create(createAppointmentDto: CreateAppointmentDto) {
    return 'This action adds a new appointment';
  }


  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
*/



  validaFechaFutura(date: Date): boolean {
    const fechaIngresada = new Date(date);
    const hoy = new Date();
    return fechaIngresada.getTime() > hoy.getTime(); // debe ser futura
  }




  private nextId = 6;


  async scheduleAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>{

    const pet = this.petsService.findOne(createAppointmentDto.petId);
    if (!pet) {
        throw new NotFoundException(`Mascota con Id ${createAppointmentDto.petId} no encontrado`);
    }

    const owner = this.ownersService.findOne(pet.ownerId)
    if (!owner) {
        throw new NotFoundException(`Owner no encontrado de la mascota ${pet.name}`);
    }

    const dia = createAppointmentDto.appointmentDate.getDay();
    if (dia === 0) { // 0 = domingo, 1 = lunes, ... 6 = sábado
      throw new BadRequestException('Appointment no pueden registrarse en domingo');
    }

    const hora = createAppointmentDto.appointmentDate.getHours();
    if (hora < 8 || hora >= 18) {
      throw new BadRequestException('Appointment solo se pueden registrar entre 08:00 y 18:00');
    }

    const conflictoFechaVeterinario = this.appointments.find(
      p => p.veterinarian.toLowerCase() === createAppointmentDto.veterinarian.toLowerCase() &&
      p.appointmentDate.getTime() === createAppointmentDto.appointmentDate.getTime()
    );

    if (createAppointmentDto.service !== 'consultation' && pet.age < 3) {
      throw new BadRequestException('Para mascotas menores a 3 meses solo se permiten Consultas');
    }

    if (!this.validaFechaFutura(createAppointmentDto.appointmentDate)) {
      throw new BadRequestException('La fecha de cita debe ser futura');
    }




    //Exception personalizados
    if (!pet.isVaccinated && createAppointmentDto.service === 'surgery' ) {
      throw new VaccinationRequiredException(pet.name);
    }

    const conflictoFecha = this.appointments.find(
      f => f.appointmentDate.getTime() === createAppointmentDto.appointmentDate.getTime()
    )
    if (conflictoFecha) {
      throw new AppointmentConflictException(createAppointmentDto.appointmentDate);
    }


    if (conflictoFechaVeterinario) {
      throw new BadRequestException(`Conflicto de fecha y hora con el veterinario ${createAppointmentDto.veterinarian}`);
    }


    const newAppointment: Appointment = {
      id: this.nextId++,
      ...createAppointmentDto,
      status: 'scheduled',
      createdAt: new Date()
    }
    this.appointments.push(newAppointment);
        
    return newAppointment;
  }


}
