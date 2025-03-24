import { MongoClient } from 'mongodb';

class DbClinet{
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'be_clean'

    const url = `mongodb://mongo:DSlvYLjZuEwFhnkPbvnikonRZksuxivC@centerbeam.proxy.rlwy.net:12997`;

    this.client = new MongoClient(url);

    this.client.connect();
    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      this.user = this.client.db(this.database).collection('user');
      console.log("Connected to the database successfully");
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error;
    }
  }

  isAlive() {
    return this.client && this.client.topology && this.client.topology.isConnected();
  }
}

const dbClient = new DbClinet();
export default dbClient;
