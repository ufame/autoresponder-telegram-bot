import type {
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes
} from 'sequelize';

export interface IAdminsModel extends Model<InferAttributes<IAdminsModel>, InferCreationAttributes<IAdminsModel>> {
    id: CreationOptional<number>;
    username: string;
}