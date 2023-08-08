import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1622580876422 implements MigrationInterface {
  up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.query(`
      create table td_plantation_type
      (
          id   serial primary key,
          name varchar not null,
          created_at         timestamp default now(),
          updated_at         timestamp default now()
      );
      
      create table tb_rural_producer
      (
          id                 serial primary key,
          created_at         timestamp default now(),
          updated_at         timestamp default now(),
          tax_id              varchar not null unique,
          name               varchar not null,
          farm_name          varchar not null,
          city               varchar not null,
          state              varchar not null,
          total_area_ha      numeric not null,
          arable_area_ha     numeric not null,
          vegetation_area_ha numeric not null
      );
      
      create table ta_rural_producer_plantation_type
      (
          id                 serial primary key,
          created_at         timestamp default now(),
          updated_at         timestamp default now(),
          rural_producer_id  integer not null references tb_rural_producer (id),
          plantation_type_id integer not null references td_plantation_type (id)
      );
      
      
      INSERT INTO td_plantation_type (name) VALUES ('Cana de Açúcar');
      INSERT INTO td_plantation_type (name) VALUES ('Milho');
      INSERT INTO td_plantation_type (name) VALUES ('Soja');
      INSERT INTO td_plantation_type (name) VALUES ('Algodão');
      INSERT INTO td_plantation_type (name) VALUES ('Café');
      INSERT INTO td_plantation_type (name) VALUES ('Outros');
    `);
  }

  down({}: QueryRunner): Promise<any> {
    return Promise.resolve(undefined);
  }
}
