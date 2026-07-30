const { sequelize, User, Student, Vendor, Account, Item, Transaction } = require('./models/models');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log('Synced DB');

    const adminPass = await bcrypt.hash('Password123!', 10);
    const admin = await User.create({ email: 'admin@example.com', password: adminPass, role: 'admin' });

    // vendors
    const vendorPass = await bcrypt.hash('VendorPass1!', 10);
    const vendor1User = await User.create({ email: 'vendor1@example.com', password: vendorPass, role: 'vendor' });
    const vendor2User = await User.create({ email: 'vendor2@example.com', password: vendorPass, role: 'vendor' });
    const vendor1 = await Vendor.create({ userId: vendor1User.id, name: 'Canteen A' });
    const vendor2 = await Vendor.create({ userId: vendor2User.id, name: 'Canteen B' });

    // students
    const studentPass = await bcrypt.hash('StudentPass1!', 10);
    const students = [];
    for (let i = 1; i <= 10; i++) {
      const email = `student${i}@example.com`;
      const user = await User.create({ email, password: studentPass, role: 'student' });
      const student = await Student.create({ userId: user.id, studentId: `S2026-${1000 + i}`, qrCode: uuidv4() });
      await Account.create({ studentId: student.id, balance: (Math.random() * 50 + 5).toFixed(2) });
      students.push(student);
    }

    // items
    const item1 = await Item.create({ name: 'Bread', price: 0.5 });
    const item2 = await Item.create({ name: 'Soda', price: 0.75 });
    const item3 = await Item.create({ name: 'Cookies', price: 1.25 });

    // sample transactions
    await Transaction.create({ studentId: students[0].id, vendorId: vendor1.id, itemId: item1.id, amount: 0.5, status: 'success' });
    await Transaction.create({ studentId: students[1].id, vendorId: vendor2.id, itemId: item2.id, amount: 0.75, status: 'success' });

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
}

seed();
