import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrfanatos1602612960156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "orfanato",
        columns:[
            {
                name: 'id',
                type: 'integer',
                unsigned: true,
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',

            },
            {
                name: 'name',
                type: 'varchar',
            },
            {
                name: 'latitude',
                type: 'decimal',
                scale: 10,
                precision: 2,
            },
            {
                name: 'longitude',
                type: 'decimal',
                scale: 10,
                precision: 2,
            },
            {
                name: 'about',
                type: 'text',
            },
            {
                name: 'instrucao',
                type: 'text',
            },
            {
                name: 'funcionamento',
                type: 'varchar',
            },
            {
                name: 'finaldesemana',
                type: 'boolean',
                default: false,
            },
        ]

    
    }))
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable('orfanato');
    }

}
