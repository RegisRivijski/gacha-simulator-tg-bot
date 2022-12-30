import { createClient } from 'redis';

export default class Redis {
  client;

  constructor(config) {
    this.client = createClient(config);
  }

  async get(...args) {
    await this.client.connect();
    await this.client.get(...args);
    await this.client.disconnect();
  }

  async set(...args) {
    await this.client.connect();
    await this.client.set(...args);
    await this.client.disconnect();
  }
}
