import { Injectable, Inject } from '@nestjs/common';

import { Set } from './set.entity';
import { SetDto } from './dto/set.dto';
import { SET_REPOSITORY } from '../../core/constants';

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
        return await this.setRepository.findOne({
            where: { id },
        });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedSet]] = await this.setRepository.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedSet };
    }
}
