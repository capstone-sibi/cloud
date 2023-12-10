import { Controller, Get, Post, Put, Param, Body, NotFoundException, Request } from '@nestjs/common';
import { ResponseMessage } from '../../decorators/response.decorator';
import { AnswersService } from './answers.service';
import { Answer as AnswerEntity } from './answer.entity';
import { AnswerDto } from './dto/answer.dto';

@Controller('answers')
export class AnswersController {
    constructor(private answersService: AnswersService) { }

    @Get()
    @ResponseMessage('Successfully retrieved all answers')
    async findAll() {
        return await this.answersService.findAll();
    }

    @Get(':id')
    @ResponseMessage('Successfully retrieved answer by id')
    async findOne(@Param('id') id: number): Promise<AnswerEntity> {
        const answer = await this.answersService.findOne(id);

        if (!answer) {
            throw new NotFoundException('This Answer doesn\'t exist');
        }

        return answer;
    }

    @Post()
    @ResponseMessage('Successfully created answer')
    async create(@Body() answer: AnswerDto, @Request() req): Promise<AnswerEntity> {
        return await this.answersService.create(answer);
    }

    @Put(':id')
    @ResponseMessage('Successfully updated answer')
    async update(@Param('id') id: number, @Body() answer: AnswerDto, @Request() req): Promise<AnswerEntity> {
        const { numberOfAffectedRows, updatedAnswer } = await this.answersService.update(id, answer);

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Answer doesn\'t exist');
        }

        return updatedAnswer;
    }
}
