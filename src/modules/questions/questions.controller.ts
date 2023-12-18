import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Request } from '@nestjs/common';
import { ResponseMessage } from '../../decorators/response.decorator';
import { QuestionsService } from './questions.service';
import { Question as QuestionEntity } from './question.entity';
import { QuestionDto } from './dto/question.dto';
import { AnswersService } from '../answers/answers.service';
import { Answer } from '../answers/answer.entity';

@Controller('questions')
export class QuestionsController {
    constructor(
        private questionService: QuestionsService,
        private answersService: AnswersService
    ) { }

    @Get()
    @ResponseMessage('Successfully retrieved all questions')
    async findAll() {
        return await this.questionService.findAll();
    }

    @Get(':id')
    @ResponseMessage('Successfully retrieved question by id')
    async findOne(@Param('id') id: number): Promise<QuestionEntity> {
        const post = await this.questionService.findOne(id);

        if (!post) {
            throw new NotFoundException('This Question doesn\'t exist');
        }

        return post;
    }

    @Get(':id/answers')
    @ResponseMessage('Successfully retrieved answers by question id')
    async findAllByQuestionId(@Param('id') questionId: number): Promise<Answer[]> {
        const question = await this.answersService.findAllByQuestionId(questionId);

        if (!question) {
            throw new NotFoundException('This Question doesn\'t exist');
        }
        
        return question;
    }

    @Post()
    @ResponseMessage('Successfully created question')
    async create(@Body() question: QuestionDto, @Request() req): Promise<QuestionEntity> {
        return await this.questionService.create(question);
    }

    @Put(':id')
    @ResponseMessage('Successfully updated question')
    async update(@Param('id') id: number, @Body() question: QuestionDto, @Request() req): Promise<QuestionEntity> {
        const { numberOfAffectedRows, updatedQuestion } = await this.questionService.update(id, question);

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Question doesn\'t exist');
        }

        return updatedQuestion;
    }
}
