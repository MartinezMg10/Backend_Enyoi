import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class TaskService {


  private readonly logger = new Logger('TaskService');

  constructor(

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    private readonly dataSource: DataSource,

  ) {}


  async create(createTaskDto: CreateTaskDto, user:User) {
    
    try {
      const { ...productDetails } = createTaskDto;

      const task = this.taskRepository.create({
        ...productDetails,
        user,
      });
      
      await this.taskRepository.save( task );

      return { ...task };
      
    } catch (error) {
      this.handleDBExceptions(error);
    }


  }

  async findAll() {

    const tasks = await this.taskRepository.find()

    return tasks.map(task=> ({
      ...task
    }))
  }

  async findAllByUser(user: User) {
    const tasks = await this.taskRepository.find({ where: { user: { id: user.id} } });
  
    return tasks.map(task => ({ ...task }));
  }
  

  async findOne(term: string) {
    let task:Task;

    if(isUUID(term)){
      task = await this.taskRepository.findOneBy({id: term})
    }

    if (!task) {
      throw new BadRequestException(`Task with term ${term} not found`);
    }
    return task;

  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const {  ...toUpdate } = updateTaskDto;

    const task = await this.taskRepository.preload({ id, ...toUpdate });

    if ( !task ) throw new NotFoundException(`Task with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      await queryRunner.manager.save( task );
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return task
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
      const task = await this.findOne(id);
      await this.taskRepository.remove(task);
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)

    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
