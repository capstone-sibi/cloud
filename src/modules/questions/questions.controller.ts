import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Request } from '@nestjs/common';

import { QuestionsService } from './questions.service';
import { Question as QuestionEntity } from './question.entity';
import { QuestionDto } from './dto/question.dto';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionService: QuestionsService) { }

    @Get()
    async findAll() {
        return await this.questionService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<QuestionEntity> {
        const post = await this.questionService.findOne(id);

        if (!post) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        return post;
    }

    @Post()
    async create(@Body() question: QuestionDto, @Request() req): Promise<QuestionEntity> {
        return await this.questionService.create(question);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() question: QuestionDto, @Request() req): Promise<QuestionEntity> {
        const { numberOfAffectedRows, updatedQuestion } = await this.questionService.update(id, question);

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        return updatedQuestion;
    }
}
