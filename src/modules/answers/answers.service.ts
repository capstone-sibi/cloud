import { Injectable, Inject } from '@nestjs/common';

import { Answer } from './answer.entity';
import { AnswerDto } from './dto/answer.dto';

import { ANSWER_REPOSITORY } from '../../core/constants';

@Injectable()
export class AnswersService {
    constructor(@Inject(ANSWER_REPOSITORY) private readonly answerRepository: typeof Answer) { }

    async create(answer: AnswerDto): Promise<Answer> {
        return await this.answerRepository.create<Answer>({ ...answer });
    }

    async findAll(): Promise<Answer[]> {
        return await this.answerRepository.findAll<Answer>();
    }

    async findOne(id): Promise<Answer> {
        return await this.answerRepository.findOne({
            where: { id }
        });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedAnswer]] = await this.answerRepository.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedAnswer };
    }
}
