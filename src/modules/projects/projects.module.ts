import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from './repositories/projects.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ProjectsController],
  imports: [HttpModule, TypeOrmModule.forFeature([ProjectRepository])],
  providers: [ProjectsService],
})
export class ProjectsModule {}
