import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PetsModule } from 'src/pets/pets.module';
import { OwnersModule } from 'src/owners/owners.module';

@Module({
  imports: [PetsModule, OwnersModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService]
})
export class AppointmentsModule {}
