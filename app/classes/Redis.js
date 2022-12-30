import { createClient } from 'redis';

export default class Redis {
  client;

  constructor(config) {
    this.client = createClient(config);
  }

  get(...args) {
    return this.client.connect()
      .then(() => this.client.get(...args))
      .then((data) => {
        this.client.disconnect();
        return data;
      });
  }

  set(...args) {
    return this.client.connect()
      .then(() => this.client.set(...args))
      .then(() => this.client.disconnect());
  }
}
