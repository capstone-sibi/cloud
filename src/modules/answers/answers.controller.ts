import { Controller, Get, Post, Put, Param, Body, NotFoundException, Request } from '@nestjs/common';

import { AnswersService } from './answers.service';
import { Answer as AnswerEntity } from './answer.entity';
import { AnswerDto } from './dto/answer.dto';

@Controller('answers')
export class AnswersController {
    constructor(private readonly answersService: AnswersService) { }

    @Get()
    async findAll() {
        return await this.answersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<AnswerEntity> {
        const answer = await this.answersService.findOne(id);

        if (!answer) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        return answer;
    }

    @Post()
    async create(@Body() answer: AnswerDto, @Request() req): Promise<AnswerEntity> {
        return await this.answersService.create(answer);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() answer: AnswerDto, @Request() req): Promise<AnswerEntity> {
        const { numberOfAffectedRows, updatedAnswer } = await this.answersService.update(id, answer);

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        return updatedAnswer;
    }
}
