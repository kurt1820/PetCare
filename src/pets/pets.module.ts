import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { OwnersModule } from 'src/owners/owners.module';

@Module({
  imports: [OwnersModule],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService]
})
export class PetsModule {}
