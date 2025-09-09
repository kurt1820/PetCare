import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { OwnersModule } from './owners/owners.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [PetsModule, OwnersModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
