import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const url =
  process.env.DATABASE_URL ||
  "postgres://postgres:@localhost:5432/hfmyapp";
export const sequelize = new Sequelize(url);

export const User = sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
        underscored: true,
        timestamps: false,
        fleezeTableName: true,
    }
  );

export const Card = sequelize.define("waitingpassengercard",{
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
        }
    },

    depatureTime: {
        type: DataTypes.STRING,
        alloNull: false,
    },
    
    depaturePlace: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    capacity: {
        type: DataTypes.STRING,
        allowNull: false
    },
})