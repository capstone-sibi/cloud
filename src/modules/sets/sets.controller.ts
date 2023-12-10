import { Controller, Get, Post, Put, Param, Body, NotFoundException, Request } from '@nestjs/common';

import { SetsService } from './sets.service';
import { Set as SetEntity } from './set.entity';
import { SetDto } from './dto/set.dto';

@Controller('sets')
export class SetsController {
    constructor(private readonly setService: SetsService) { }

    @Get()
    async findAll() {
        return await this.setService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<SetEntity> {
        const set = await this.setService.findOne(id);

        if (!set) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        return set;
    }

    @Post()
    async create(@Body() set: SetDto, @Request() req): Promise<SetEntity> {
        return await this.setService.create(set);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() set: SetDto, @Request() req): Promise<SetEntity> {
        const { numberOfAffectedRows, updatedSet } = await this.setService.update(id, set);

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        return updatedSet;
    }
}
