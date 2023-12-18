import { Injectable, Inject, NotFoundException } from '@nestjs/common';

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

    async findAllByQuestionId(questionId): Promise<Answer[]> {
        const answers =  await this.answerRepository.findAll({
            where: { questionId },
            order: [['id', 'ASC']]
        });

        if (!answers || answers.length <= 0) {
            throw new NotFoundException(`Answers with question id ${questionId} not found!`);
        }

        return answers;
    }
    
    async findOne(answerId): Promise<Answer> {
        const answer =  await this.answerRepository.findOne({
            where: { id: answerId}
        });

        if (!answer) {
            throw new NotFoundException(`Answer with id ${answerId} not found!`);
        }

        return answer;
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedAnswer]] = await this.answerRepository.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedAnswer };
    }
}
