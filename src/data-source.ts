import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/user.entity"
import { Task } from "./entity/Task"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "bug",
    password: "",
    database: "sassy",
    synchronize: true,
    logging: true,
    migrationsTableName: "migrations",
    entities: [User, Task],
    migrations:  ["src/migration/**/*.ts"],
    subscribers: [],
})
