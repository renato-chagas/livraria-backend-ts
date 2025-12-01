import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../../config/database.js';

interface AuthorAttributes {
    id: number;
    name: string;
    bio: string;
    phone: string;
    email: string;
}

interface AuthorCreationAttributes extends Optional<AuthorAttributes, 'id' | 'bio'> { }

class Author extends Model<AuthorAttributes, AuthorCreationAttributes> implements AuthorAttributes {
    declare id: number;
    declare name: string;
    declare bio: string;
    declare phone: string;
    declare email: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Author.init(
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
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Author',
        tableName: 'authors',
        timestamps: true,
    }
)

export default Author;