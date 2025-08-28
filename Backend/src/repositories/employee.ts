import { DataTypes, Model } from 'sequelize'
import { Enterprise } from './enterprise'
import { Permission } from './permission/permissions'
import sequelize from '.'


export class Employee extends Model {
    public id !: number;
    public email!: string;
    public password!: string;
    public name!: string;
    public surname!: string;
    public id_enterprise?: number;
    public start_of_contract?: Date;
    public end_of_contract?: Date;
    public role?: string;
    public telefone?: string;
    public endereco?: string;
    public permissions?: Permission[];
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
        start_of_contract: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        end_of_contract: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        endereco: {
          type: DataTypes.STRING,
          allowNull: true,
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