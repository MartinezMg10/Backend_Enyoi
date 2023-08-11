import { IsIn, IsString, MinLength } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @MinLength(1)
    title:string;

    @IsString()
    @MinLength(1)
    description:string;

    @IsIn(['Pendiente','En Desarrollo','Completada'])
    state:string

    @IsIn(['Alta','Media','Baja'])
    prioridad:string

    @IsString()
    fecha:string
}
