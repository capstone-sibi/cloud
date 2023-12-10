import { Injectable, Inject } from '@nestjs/common';

import { Question } from './question.entity';
import { QuestionDto } from './dto/question.dto';
import { QUESTION_REPOSITORY } from '../../core/constants';

@Injectable()
export class QuestionsService {
    constructor(@Inject(QUESTION_REPOSITORY) private readonly questionRepository: typeof Question) { }

    async create(question: QuestionDto): Promise<Question> {
        return await this.questionRepository.create<Question>({ ...question });
    }

    async findAll(): Promise<Question[]> {
        return await this.questionRepository.findAll<Question>({
            include: [{ model: Question }],
        });
    }

    async findOne(id): Promise<Question> {
        return await this.questionRepository.findOne({
            where: { id },
            include: [{ model: Question, attributes: { exclude: ['password'] } }],
        });
    }

    async delete(id) {
        return await this.questionRepository.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedQuestion]] = await this.questionRepository.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedQuestion };
    }
}
