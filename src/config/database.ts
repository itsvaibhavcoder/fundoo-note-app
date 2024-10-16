import mongoose from 'mongoose';
import Logger from './logger';

class Database {
  private DATABASE: string;
  private logger;

  constructor() {
    this.DATABASE =
      process.env.NODE_ENV === 'test'
        ? process.env.DATABASE_TEST
        : process.env.DATABASE_URI;

    this.logger = Logger.logger;
  }

  public initializeDatabase = async (): Promise<void> => {
    try {
      await mongoose.connect(this.DATABASE, {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      this.logger.info('Connected to the database.');
    } catch (error) {
      this.logger.error('Could not connect to the database.', error);
    }
  };
}
console.log(Database);
export default Database;
