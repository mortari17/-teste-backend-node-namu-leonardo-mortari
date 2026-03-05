import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramModule } from '@modules/programs/program.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeorm_config } from '@config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeorm_config), ProgramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
