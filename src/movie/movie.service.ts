import { Injectable, Get } from '@nestjs/common';
// import { movie } from '../../entities/movie';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createDiffieHellman } from 'crypto';

@Injectable()
export class MovieService {
    constructor(
        // @InjectRepository(movie) private readonly movieRepository: Repository<movie>
      ) {}

      //lowerCamelCase = Variables, metodos
      //UpperCamelCase = Nombres de clases
      //snake_camel_case = Base de datos
      findAll() {
        // return this.movieRepository.find({ relations: ["fkGenre"] });
      }

      getById(id) {
        // return this.movieRepository.createQueryBuilder()
        // .select("id", "movieId")
        // .addSelect("name", "movieNames")
        // .where("id = :ids", { ids: 1 })
        // .execute();
      }

      create(movie) {
        // return this.movieRepository.save({ ...movie, fecha_registro: new Date() });
      }
}

