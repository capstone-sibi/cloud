import { Answer } from './answer.entity';
import { ANSWER_REPOSITORY } from '../../core/constants';

export const answersProviders = [
    {
        provide: ANSWER_REPOSITORY,
        useValue: Answer,
    },
];
