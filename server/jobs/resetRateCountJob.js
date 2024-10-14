const cron = require('node-cron');
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const client = new MongoClient(process.env.MONGO_URI);

// Database and Collection
const dbName = 'jexovip';  // Replace with your database name
const collectionName = 'userdailyinfos'; // The collection with the rateCount field

async function resetRateCount() {
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        
        // Update all documents' rateCount field to 0
        await collection.updateMany(
            {}, // No filter to update all documents
            { $set: { rateCount: 0 } }
        );
    } catch (error) {
        console.error('Error updating documents:', error);
    } finally {
        await client.close();
    }
}

// Schedule the task to run daily at 12:00 AM
cron.schedule('0 0 * * *', () => {
    console.log('Running cron job to reset rateCount to 0');
    resetRateCount();
});
