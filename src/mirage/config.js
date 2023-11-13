import { createServer } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.namespace = '/api';

      // will trigger a response after 1s delay
      this.post('/form-submission', (request) => {
        return console.log(request), { timing: 1000 };
      });
    },
  });

  return server;
}
