import { Controller, Get, Post, Put, Param, Body, NotFoundException, Request } from '@nestjs/common';

import { AnswersService } from './answers.service';
import { Answer as AnswerEntity } from './answer.entity';
import { AnswerDto } from './dto/answer.dto';

@Controller('answers')
export class AnswersController {
    constructor(private readonly answersService: AnswersService) { }

    @Get()
    async findAll() {
        // get all posts in the db
        return await this.answersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<AnswerEntity> {
        // find the post with this id
        const answer = await this.answersService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!answer) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // if post exist, return the post
        return answer;
    }

    @Post()
    async create(@Body() answer: AnswerDto, @Request() req): Promise<AnswerEntity> {
        // create a new post and return the newly created post
        return await this.answersService.create(answer);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() answer: AnswerDto, @Request() req): Promise<AnswerEntity> {
        // get the number of row affected and the updated post
        const { numberOfAffectedRows, updatedAnswer } = await this.answersService.update(id, answer);

        // if the number of row affected is zero, it means the post doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // return the updated post
        return updatedAnswer;
    }
}
