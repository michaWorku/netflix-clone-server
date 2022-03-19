import log from '../logger'

process.on('uncaughtException', (err: Error) => {
    log.error('UNCAUGHT EXCEPTION! 🧨 SHUTTING DOWN!');
    log.error(`${err}`);
    process.exit(1);
  });

import mongoose from 'mongoose'
import config from 'config'

const connectDB = async () => {
  const DB_URI = config.get('LOCAL_DB_URI') as string

    try{
        const conn = await mongoose.connect(DB_URI)

        log.info(`MongoDB connected: ${conn.connection.host}`)
    }catch(err){
        log.error(err)
        process.exit(1)
    }
}

process.on('unhandledRejection', (err: Error) => {
    log.error(`Name: ${err.name}`);
    log.error(`Message: ${err.message}`);
    log.error('UNHANDLED REJECTION! 🧨 SHUTTING DOWN!');
    process.exit(1)
});

export default connectDB