import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * CreateTaskTable1709807291643
 */
export class CreateUserTable1709807285310 implements MigrationInterface {
    
    /**
     * Create the table
     * @param {QueryRunner} queryRunner
     * @returns {Promise<void>}
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL
            )
        `);
    }
    
    /**
     *  Drop the table
     * @param {QueryRunner} queryRunner
     * @returns {Promise<void>}
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS users`);
    }

}
