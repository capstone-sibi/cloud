import { Dictionary } from './dictionary.entity';
import { DICTIONARY_REPOSITORY } from '../../core/constants';

export const dictionaryProviders = [
    {
        provide: DICTIONARY_REPOSITORY,
        useValue: Dictionary,
    },
];
