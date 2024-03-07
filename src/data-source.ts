import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "bug",
    password: "",
    database: "sassy",
    synchronize: true,
    logging: false,
    migrationsTableName: "migrations",
    entities: ["src/entity/**/*.ts"],
    migrations:  ["src/migration/**/*.ts"],
    subscribers: [],
})
