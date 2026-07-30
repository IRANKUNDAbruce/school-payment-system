const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'vendor', 'student'), allowNull: false }
});

const Student = sequelize.define('Student', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  studentId: { type: DataTypes.STRING, allowNull: false, unique: true },
  qrCode: { type: DataTypes.STRING }
});

const Vendor = sequelize.define('Vendor', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false }
});

const Account = sequelize.define('Account', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  studentId: { type: DataTypes.UUID, allowNull: false },
  balance: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 }
});

const Item = sequelize.define('Item', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false }
});

const Transaction = sequelize.define('Transaction', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  studentId: { type: DataTypes.UUID, allowNull: false },
  vendorId: { type: DataTypes.UUID, allowNull: false },
  itemId: { type: DataTypes.UUID },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  status: { type: DataTypes.ENUM('pending','success','failed'), defaultValue: 'success' }
});

const MoMoTransaction = sequelize.define('MoMoTransaction', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  studentId: { type: DataTypes.UUID, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  provider: { type: DataTypes.ENUM('mtn','airtel'), allowNull: false },
  status: { type: DataTypes.ENUM('pending','success','failed'), defaultValue: 'pending' }
});

// Associations
User.hasOne(Student, { foreignKey: 'userId' });
Student.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Vendor, { foreignKey: 'userId' });
Vendor.belongsTo(User, { foreignKey: 'userId' });

Student.hasOne(Account, { foreignKey: 'studentId' });
Account.belongsTo(Student, { foreignKey: 'studentId' });

Student.hasMany(Transaction, { foreignKey: 'studentId' });
Vendor.hasMany(Transaction, { foreignKey: 'vendorId' });
Item.hasMany(Transaction, { foreignKey: 'itemId' });

Student.hasMany(MoMoTransaction, { foreignKey: 'studentId' });

module.exports = {
  sequelize,
  User,
  Student,
  Vendor,
  Account,
  Item,
  Transaction,
  MoMoTransaction
};
