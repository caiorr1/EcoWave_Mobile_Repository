const sequelize = require('./models/db');

const dropTables = async () => {
  try {
    await sequelize.drop();
    console.log('All tables dropped!');
  } catch (error) {
    console.error('Error dropping tables:', error);
  } finally {
    await sequelize.close();
  }
};

dropTables();
