import { Sequelize } from 'sequelize';
// @ts-ignore
import SQLite from 'sqlite3';

export const connection = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sq3',
    dialectOptions: {
        mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE
    },
    define: {
        timestamps: false
    }
})