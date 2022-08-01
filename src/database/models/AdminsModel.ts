import { connection } from '../Database';
import { DataTypes } from 'sequelize';
import { IAdminsModel } from '../../interfaces/IAdmins';

export const Admins = connection.define<IAdminsModel>('admins', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
});