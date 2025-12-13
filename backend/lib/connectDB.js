import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // 避免重复连接
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        const conn = await mongoose.connect(process.env.MONGO, {
            // 增加超时时间
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            // 连接池配置
            maxPoolSize: 10,
            minPoolSize: 2,
            // 启用重试机制
            retryWrites: true,
            writeConcern: {
                w: 'majority',
                wtimeout: 10000
            }
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        // 连接失败时重试
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;