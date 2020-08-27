import http from 'http';
import environment from './settings/environment';
import app from './api/app';

http.createServer(app).listen(environment.port, () => {
    console.log(`🚀 Server ready at ${environment.host}:${environment.port}`);
});