import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { NamesService } from './names.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/names')
@ApiTags("01-names")
export class NamesController {

    constructor (private namesService: NamesService) {

    }

    // POST
    @Post()
    @ApiBody({
        description: "El objeto que contiene el nombre a insetar",
        examples: {
            Ejemplo_1: {
                value: {
                    name: "name1"
                }
            },
            Ejemplo_2: {
                value: {
                    name: "name2"
                }
            }
        }
    })
    @ApiOperation({
        description: 'Inserta un nuevo nombre en un \"array\" nuevo o existente. Se devuelve \"true\" si se realiza de manera correcta.'
    })
    createName(@Body() data: {name: string}) {
        return this.namesService.createName(data.name);
    }

    // GET
    @Get()
    @ApiQuery({
        name: 'start',
        type: 'string',
        required: false,
        description: 'Indica la cadena de texto a filtrar en el inicio de un nombre.'
    })
    @ApiOperation({
        description: 'Devuelve los nombres existentes en el \"array\" actual.'
    })
    getNames(@Query('start') start: string) {
        return this.namesService.getNames(start);
    }

    // PUT
    @Put(':name/:newName')
    @ApiParam({
        name: 'name',
        type: 'string',
        description: 'Nombre a actualizar'
    })
    @ApiParam({
        name: 'newName',
        type: 'string',
        description: 'Nuevo nombre actualizado'
    })
    @ApiOperation({
        description: 'Susituye el nombre \"name\" por un nuevo nombre \"newName\" en el \"array\" actual.'
    })
    updateName(@Param('name') name: string, @Param('newName') newName: string) {
        return this.namesService.updateName(name, newName);
    }

    // DELETE ALL
    @Delete('clear')
    @ApiOperation({
        description: 'Elimina todos los elementos \"name\" del array actual.'
    })
    clearNames() {
        return this.namesService.clearNames();
    }

    // DELETE NAME
    @Delete('/:name')
    @ApiParam({
        name: 'name',
        type: 'string',
        description: 'Nombre a eliminar'
    })
    @ApiOperation({
        description: 'Elimina el nombre especificado en \"name\" del \"array\" actual.'
    })
    deleteName(@Param('name') name: string) {
        return this.namesService.deleteName(name);
    }
}
