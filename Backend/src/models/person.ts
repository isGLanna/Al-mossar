import { DataTypes, Model } from 'sequelize'
import { Enterprise } from './enterprise'
import sequelize from "../db"

class Person extends Model {
    public email!: string;
    public password!: string;
    public name!: string;
    public surname!: string;
    public id_enterprise?: number;
    public startOfContact?: Date;
    public role?: string
}

Person.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_enterprise: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        startOfContract: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Person',
        tableName: 'person',
        timestamps: false,
    }
)

Person.belongsTo(Enterprise, {foreignKey: 'id_enterprise', as: 'enterprise'})

export default Person