import { Controller, Get, Post, Put, Param, Body, NotFoundException, Request } from '@nestjs/common';

import { SetsService } from './sets.service';
import { Set as SetEntity } from './set.entity';
import { SetDto } from './dto/set.dto';

@Controller('sets')
export class SetsController {
    constructor(private readonly setService: SetsService) { }

    @Get()
    async findAll() {
        // get all posts in the db
        return await this.setService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<SetEntity> {
        // find the post with this id
        const set = await this.setService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!set) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // if post exist, return the post
        return set;
    }

    @Post()
    async create(@Body() set: SetDto, @Request() req): Promise<SetEntity> {
        // create a new post and return the newly created post
        return await this.setService.create(set);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() set: SetDto, @Request() req): Promise<SetEntity> {
        // get the number of row affected and the updated post
        const { numberOfAffectedRows, updatedSet } = await this.setService.update(id, set);

        // if the number of row affected is zero, it means the post doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // return the updated post
        return updatedSet;
    }
}
