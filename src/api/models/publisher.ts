import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database.js';

interface PublisherAttributes {
    id: number;
    name: string;
    address: string;
    phone: string;
}

interface PublisherCreationAttributes extends Optional<PublisherAttributes, 'id'> { }

class Publisher extends Model<PublisherAttributes, PublisherCreationAttributes> implements PublisherAttributes {
    declare id: number;
    declare name: string;
    declare address: string;
    declare phone: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Publisher.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Publisher',
        tableName: 'publishers',
        timestamps: true,
    }
);

export default Publisher;