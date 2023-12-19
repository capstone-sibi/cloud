import { Controller, Get, Post, Put, Param, Body, NotFoundException, Request } from '@nestjs/common';
import { ResponseMessage } from '../../decorators/response.decorator';
import { DictionaryService } from './dictionary.service';
import { Dictionary as DictionaryEntity } from './dictionary.entity';
import { DictionaryDTO } from './dto/dictionary.dto';

@Controller('dictionary')
export class DictionaryController {
    constructor(private dictionaryService: DictionaryService) { }

    @Get()
    @ResponseMessage('Successfully retrieved all dictionary')
    async findAll() {
        return await this.dictionaryService.findAll();
    }

    @Post()
    @ResponseMessage('Successfully add dictionary')
    async create(@Body() dictionary: DictionaryDTO, @Request() req): Promise<DictionaryEntity> {
        return await this.dictionaryService.create(dictionary);
    }
}
