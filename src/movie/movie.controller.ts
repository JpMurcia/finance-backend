import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateDto } from './dto/create.dto'
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}
    
    @Get('all')
    @UseGuards(AuthGuard('bearer'))
    getAll() { 
        return this.movieService.findAll();
    }

    @Get('get/:id/:id2')
    @UseGuards(AuthGuard('bearer'))
    getById(@Param('id') id, @Param('id2') id2, @Request() req) {
        console.log(req.user);
        console.log(id);
        return this.movieService.getById(id);
    }

    @Post('create')
    @UseGuards(AuthGuard('bearer'), RolesGuard)
    @Roles('admin')
    create(@Body() body: CreateDto) {
        console.log(body);
        return this.movieService.create(body);
    }
}
