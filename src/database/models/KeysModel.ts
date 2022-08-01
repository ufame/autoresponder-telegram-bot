import { connection } from '../Database';
import { DataTypes } from 'sequelize';
import { IKeysModel } from '../../interfaces/IKeys';

export const Keys = connection.define<IKeysModel>('keys', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});