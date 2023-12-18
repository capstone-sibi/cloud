import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import { Question } from './question.entity';
import { QuestionDto } from './dto/question.dto';
import { QUESTION_REPOSITORY } from '../../core/constants';
import { SetDto } from '../sets/dto/set.dto';
import { SetsService } from '../sets/sets.service';
import { Answer } from '../answers/answer.entity';

@Injectable()
export class QuestionsService {
    constructor(
        @Inject(QUESTION_REPOSITORY) private readonly questionRepository: typeof Question
    ) { }

    async create(question: QuestionDto): Promise<Question> {
        return await this.questionRepository.create<Question>({ ...question });
    }

    async findAll(): Promise<Question[]> {
        return await this.questionRepository.findAll<Question>({
            include: [{ model: Answer }],
        });
    }

    async findOne(id): Promise<Question> {
        const question =  await this.questionRepository.findOne({
            where: { id },
            include: [{ model: Answer }],
        });

        if (!question) {
            throw new NotFoundException(`Question with id ${id} not found!`);
        }

        return question;
    }

    async findAllBySetId(setId): Promise<Question[]> {
        const questions = await this.questionRepository.findAll({
            where: { setId },
            include: [{ model: Answer }],
            order: [['id', 'ASC']]
        });

        if (!questions || questions.length <= 0) {
            throw new NotFoundException(`Questions with set id ${setId} not found!`);
        }

        return questions;
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedQuestion]] = await this.questionRepository.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedQuestion };
    }
}
