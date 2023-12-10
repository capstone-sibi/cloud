import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Request } from '@nestjs/common';

import { QuestionsService } from './questions.service';
import { Question as QuestionEntity } from './question.entity';
import { QuestionDto } from './dto/question.dto';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionService: QuestionsService) { }

    @Get()
    async findAll() {
        // get all posts in the db
        return await this.questionService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<QuestionEntity> {
        // find the post with this id
        const post = await this.questionService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!post) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // if post exist, return the post
        return post;
    }

    @Post()
    async create(@Body() question: QuestionDto, @Request() req): Promise<QuestionEntity> {
        // create a new post and return the newly created post
        return await this.questionService.create(question);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() question: QuestionDto, @Request() req): Promise<QuestionEntity> {
        // get the number of row affected and the updated post
        const { numberOfAffectedRows, updatedQuestion } = await this.questionService.update(id, question);

        // if the number of row affected is zero, it means the post doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // return the updated post
        return updatedQuestion;
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the post with this id
        const deleted = await this.questionService.delete(id);

        // if the number of row affected is zero, then the post doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}
