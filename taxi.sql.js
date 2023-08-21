import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

// Opening the SQLite database connection and perform migrations
const db = await sqlite.open({
    filename: './taxi_queue.db',
    driver: sqlite3.Database
});

await db.migrate();

// adding a passenger to the queue
export async function joinQueue() {
    // Increment passenger_queue_count by 1
    await db.run('UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count + 1');
}

// removing a passenger from the queue
export async function leaveQueue() {
    // Decrement passenger_queue_count by 1 for the first passenger found
    await db.run('UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count - 1 WHERE passenger_queue_count > 0 LIMIT 1');
}

// adding a taxi to the queue
export async function joinTaxiQueue() {
    // Increment taxi_queue_count by 1
    await db.run('UPDATE taxi_queue SET taxi_queue_count = taxi_queue_count + 1');
}

// getting the total length of the passenger queue
export async function queueLength() {
    const row = await db.get('SELECT SUM(passenger_queue_count) as total FROM taxi_queue');
    return row.total || 0;
}

// getting the length of the taxi queue
export async function taxiQueueLength() {
    const row = await db.get('SELECT taxi_queue_count FROM taxi_queue');
    return row.taxi_queue_count || 0;
}

// simulating a taxi departing from the queue
export async function taxiDepart() {
    const taxiRow = await db.get('SELECT taxi_queue_count FROM taxi_queue');
    if (taxiRow.taxi_queue_count > 0) {
        const peopleToRemove = 12; // 
        
        // Decrementing taxi_queue_count by 1
        await db.run(`UPDATE taxi_queue SET taxi_queue_count = taxi_queue_count - 1`);
        
        // Removing passengers from the queue based on the number of taxis and available passengers
        await db.run(`UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count - ?`, peopleToRemove);
        
        // CHeCHIking if  no, of  people removde is negative
        if (peopleToRemove < 0) {
            peopleToRemove = 0; // Will be 0, if negative
        }
    }
}
