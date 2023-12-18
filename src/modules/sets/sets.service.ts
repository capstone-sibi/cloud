import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';

import { Set } from './set.entity';
import { SetDto } from './dto/set.dto';
import { SET_REPOSITORY } from '../../core/constants';
import { Question } from '../questions/question.entity';

@Injectable()
export class SetsService {
    constructor(@Inject(SET_REPOSITORY) private readonly setRepository: typeof Set) { }

    async create(set: SetDto): Promise<Set> {
        return await this.setRepository.create<Set>({ ...set });
    }

    async findAll(): Promise<Set[]> {
        return await this.setRepository.findAll<Set>();
    }

    async findOne(id): Promise<Set> {
        const set =  await this.setRepository.findOne({
            where: { id },
            include: [{ model: Question }]
        });
        if (!set) {
            throw new NotFoundException(`Set with id ${id} not found!`);
        }

        return set;
    }

    async findAvailableSet(): Promise<number> {
        const result = await this.setRepository.findAll({
            attributes: ['id'], // Select only the set id
            include: [{
                model: Question,
                attributes: ['id'], // Select only the question id
            }],
            group: ['Set.id'], // Group by the set id
            having: this.setRepository.sequelize.literal('COUNT(Question.id) < 5'), // Having less than 5 questions
            order: [['createdAt', 'DESC']], // Order by creation time, latest first
            limit: 1 // Limit to only one set
        });

        if (result.length > 0 && result[0].id <= 10) {
            return result[0].id; // Return the id of the set
        } else {
            throw new ConflictException(`Maximum number of set is 10!`);
        }
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedSet]] = await this.setRepository.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedSet };
    }
}
