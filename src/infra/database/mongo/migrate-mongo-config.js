require('dotenv').config();

const config = {
  mongodb: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/pci',

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  migrationsDir: process.env.MIGRATION_DIR || './src/infra/database/migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.ts',
  moduleSystem: 'commonjs',
};

module.exports = config;
