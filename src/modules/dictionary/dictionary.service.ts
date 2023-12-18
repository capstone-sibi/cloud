import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import { Dictionary } from './dictionary.entity';
import { DictionaryDTO } from './dto/dictionary.dto';

import { DICTIONARY_REPOSITORY } from '../../core/constants';

@Injectable()
export class DictionaryService {
    constructor(@Inject(DICTIONARY_REPOSITORY) private readonly dictionaryRepository: typeof Dictionary) { }

    async create(dictionary: DictionaryDTO): Promise<Dictionary> {
        return await this.dictionaryRepository.create<Dictionary>({ ...dictionary });
    }

    async findAll(): Promise<Dictionary[]> {
        return await this.dictionaryRepository.findAll<Dictionary>();
    }
}
