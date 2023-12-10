import { Set } from './set.entity';
import { SET_REPOSITORY } from '../../core/constants';

export const setsProviders = [
    {
        provide: SET_REPOSITORY,
        useValue: Set,
    },
];
