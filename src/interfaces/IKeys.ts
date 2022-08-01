import type {
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes
} from 'sequelize';

export interface IKeysModel extends Model<InferAttributes<IKeysModel>, InferCreationAttributes<IKeysModel>> {
    id: CreationOptional<number>;
    key: string;
    answer: string;
}