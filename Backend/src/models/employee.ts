import { DataTypes, Model } from 'sequelize'
import { Enterprise } from './enterprise'
import sequelize from '.'


class Employee extends Model {
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
        role: {
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
        modelName: 'employee',
        tableName: 'employee',
        timestamps: false,
    }
)

Employee.belongsTo(Enterprise, {foreignKey: 'id_enterprise', as: 'enterprise'})
Enterprise.hasMany(Employee, { foreignKey: 'id_enterprise', as: 'employees' });

export default Employee