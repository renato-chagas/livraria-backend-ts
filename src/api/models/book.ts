import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database.js';

interface BookAttributes {
    id: number;
    title: string;
    price: number;
    isbn: string | null;
    synopsis: Text | null;
    // Chaves Estrangeiras
    authorId: number;
    publisherId: number;
    categoryId: number;
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id'> { }

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
    declare id: number;
    declare title: string;
    declare price: number;
    declare isbn: string | null;
    declare synopsis: Text | null;

    declare authorId: number;
    declare publisherId: number;
    declare categoryId: number;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        synopsis: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'authors',
                key: 'id'
            }
        },
        publisherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'publishers',
                key: 'id'
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'Book',
        tableName: 'books',
        timestamps: true,
    }
);

export default Book;
