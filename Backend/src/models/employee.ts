import { DataTypes, Model } from 'sequelize'
import { Enterprise } from './enterprise'
import sequelize from '.'


export class Employee extends Model {
    public id !: number;
    public email!: string;
    public password!: string;
    public name!: string;
    public surname!: string;
    public id_enterprise?: number;
    public start_of_contract?: Date;
    public role?: string
}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
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
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Employee',
        tableName: 'employee',
        timestamps: false,
    }
)

Employee.belongsTo(Enterprise, {foreignKey: 'id_enterprise', as: 'enterprise'})
Enterprise.hasMany(Employee, { foreignKey: 'id_enterprise', as: 'employees' });