import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { Answer } from '../../modules/answers/answer.entity';
import { Question } from '../../modules/questions/question.entity';
import { Set } from '../../modules/sets/set.entity';
import { Dictionary } from '../../modules/dictionary/dictionary.entity';

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            let config;
            switch (process.env.NODE_ENV) {
                case DEVELOPMENT:
                    config = databaseConfig.development;
                    break;
                case TEST:
                    config = databaseConfig.test;
                    break;
                case PRODUCTION:
                    config = databaseConfig.production;
                    break;
                default:
                    config = databaseConfig.development;
            }
            const sequelize = new Sequelize(config);
            sequelize.addModels([Answer, Question, Set, Dictionary]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
