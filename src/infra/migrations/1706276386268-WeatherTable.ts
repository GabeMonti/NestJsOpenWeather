import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class WeatherTable1706276386268 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'weather',
              columns: [
                {
                  name: 'id',
                  type: 'int4',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'city',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'country',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'lat',
                  type: 'decimal',
                  precision: 5,
                  scale: 2,
                  default: 0,
                  isNullable: true,
                },
                {
                  name: 'lon',
                  type: 'decimal',
                  precision: 5,
                  scale: 2,
                  default: 0,
                  isNullable: true,
                },
                {
                  name: 'weather_main',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'weather_description',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'weather_temp',
                  type: 'decimal',
                  precision: 5,
                  scale: 2,
                  default: 0,
                  isNullable: true,
                },
                {
                  name: 'weather_feels_like',
                  type: 'decimal',
                  precision: 5,
                  scale: 2,
                  default: 0,
                  isNullable: true,
                },
                {
                  name: 'weather_temp_min',
                  type: 'decimal',
                  precision: 5,
                  scale: 2,
                  default: 0,
                  isNullable: true,
                },
                {
                  name: 'weather_temp_max',
                  type: 'decimal',
                  precision: 5,
                  scale: 2,
                  default: 0,
                  isNullable: true,
                },
                {
                  name: 'weather_pressure',
                  type: 'int4',
                  isNullable: true,
                },
                {
                  name: 'weather_humidity',
                  type: 'int4',
                  isNullable: true,
                },
                {
                  name: "created_date",
                  type: "timestamp",
                  default: "now()",
                },
                {
                  name: "updated_date",
                  type: "timestamp",
                  default: "now()",
                },
              ],
            }),
            false,
          );
    }

    

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE article`);
    }

}
