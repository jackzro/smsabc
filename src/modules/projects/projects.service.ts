import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectRepository } from './repositories/projects.repository';
import { lastValueFrom, map } from 'rxjs';
import * as crypto from 'crypto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  create(createProjectDto) {
    const project = new Project();
    project.IsiBerita = createProjectDto.isiBerita;
    project.TglKirim = createProjectDto.tglKirim;
    project.senderId = createProjectDto.senderId;
    project.user = createProjectDto.id;
    project.save();
    return 'This action adds a new project';
  }

  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  async update(id, updateProjectDto) {
    try {
      await this.projectRepository.update(id, {
        TglKirim: updateProjectDto.tglKirim,
        senderId: updateProjectDto.senderId,
        IsiBerita: updateProjectDto.isiBerita,
      });
      return `Update project is successfully `;
    } catch (error) {
      throw error;
    }
  }

  async remove(id) {
    try {
      await this.projectRepository.delete(id);
      return 'Project is Deleted';
    } catch (error) {
      throw error;
    }
  }

  async generateToken(): Promise<string> {
    const appId = this.configService.get('APP_ID');
    const timeStamp = (new Date().getTime() / 1000).toString();
    const appSecret = this.configService.get('APP_SECRET');
    function randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    const nonce = randomIntFromInterval(1000, 9999).toString();
    const hash = [timeStamp, nonce, appId, appSecret].sort();
    const resstr = hash.join('');
    const sign = crypto.createHash('sha1').update(resstr).digest('hex');
    const res = await lastValueFrom(
      this.httpService
        .post(`${this.configService.get('URL_YULORE')}/token`, {
          appId,
          timeStamp,
          nonce,
          sign,
        })
        .pipe(
          map((response) => {
            return response.data;
          }),
        ),
    );
    return res.data.token;
  }

  async monthlyReport(month, bizNum) {
    const token = await this.generateToken();
    const res = await lastValueFrom(
      this.httpService
        .get(`${this.configService.get('URL_YULORE')}/report_month_v2`, {
          params: {
            month,
            bizNum,
            msgType: '0',
          },
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        })
        .pipe(
          map((response) => {
            return response.data;
          }),
        ),
    );
    return res;
  }
}
