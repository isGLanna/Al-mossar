import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

class Enterprise extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public token?: string;
}

Enterprise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Enterprise',
    tableName: 'enterprise',
    timestamps: false
  },
)

export { Enterprise }