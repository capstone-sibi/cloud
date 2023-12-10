import { Controller, Get, Post, Put, Param, Body, NotFoundException, Request } from '@nestjs/common';
import { ResponseMessage } from '../../decorators/response.decorator';
import { SetsService } from './sets.service';
import { Set as SetEntity } from './set.entity';
import { SetDto } from './dto/set.dto';
import { QuestionsService } from '../questions/questions.service';
import { Question } from '../questions/question.entity';

@Controller('sets')
export class SetsController {
    constructor(
        private readonly setService: SetsService,
        private readonly questionsService: QuestionsService
    ) { }

    @Get()
    @ResponseMessage('Successfully retrieved all sets')
    async findAll() {
        return await this.setService.findAll();
    }

    @Get(':id')
    @ResponseMessage('Successfully retrieved set by id')
    async findOne(@Param('id') id: number): Promise<SetEntity> {
        const set = await this.setService.findOne(id);

        if (!set) {
            throw new NotFoundException('This Set of Questin doesn\'t exist');
        }

        return set;
    }

    @Get(':id/questions')
    @ResponseMessage('Successfully retrieved questions by set id')
    async findAllQuestionsBySetId(@Param('id') setId: number): Promise<Question[]> {
        const set = await this.questionsService.findAllBySetId(setId);

        if (!set) {
            throw new NotFoundException('This Set of Questin doesn\'t exist');
        }

        return set;
    }

    @Post()
    @ResponseMessage('Successfully created set')
    async create(@Body() set: SetDto, @Request() req): Promise<SetEntity> {
        return await this.setService.create(set);
    }

    @Put(':id')
    @ResponseMessage('Successfully updated set')
    async update(@Param('id') id: number, @Body() set: SetDto, @Request() req): Promise<SetEntity> {
        const { numberOfAffectedRows, updatedSet } = await this.setService.update(id, set);

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Set of Question doesn\'t exist');
        }

        return updatedSet;
    }
}
