import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database.js';

export enum UserRole {
    ADMIN = 'admin',
    CUSTOMER = 'customer'
}

class User extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare role: UserRole;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM(...Object.values(UserRole)),
        defaultValue: UserRole.CUSTOMER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'users',
});

export default User;
