import { DataTypes, Model, Optional } from 'sequelize'
import { Enterprise } from './enterprise'
import sequelize from "."

interface PersonAttributes {
    email: string;
    password: string;
    name: string;
    surname: string;
    id_enterprise?: number;
    startOfContract?: Date;
    role?: string
}

interface PersonCreationAttributes extends Optional<PersonAttributes, 'id_enterprise' | 'startOfContract' | 'role'> {}

class Person extends Model<PersonAttributes, PersonCreationAttributes> implements PersonAttributes {
    public email!: string;
    public password!: string;
    public name!: string;
    public surname!: string;
    public id_enterprise?: number;
    public startOfContract?: Date;
    public role?: string;
}

Person.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
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
            references: {
                model: Enterprise,
                key: 'id',
            },
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
Enterprise.hasMany(Person, { foreignKey: 'id_enterprise', as: 'employees' });

export default Person