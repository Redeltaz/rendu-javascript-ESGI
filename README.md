# OS project JavaScript

Remote git repository available on GitHub: [Redeltaz/rendu-javascript-ESGI](https://github.com/Redeltaz/rendu-javascript-ESGI).

## Run the project

### Using Docker
1. Install Docker
2. Run `docker compose up --build`
3. Open [https://localhost/](https://localhost/)

### Using npm
1. Install NodeJS version 18 and npm
2. Run `npm install -D` to install dependencies
3. Run `npm run dev`
4. Open [http://localhost:8000/](http://localhost:8000/)

## Production
The project is automatically deployed on an AWS EC2 instance behind the following domain name with a self-signed certificate: [https://javascript.esgi.quozul.com/](https://javascript.esgi.quozul.com/).  
It is also hosted on a dedicated server with a Let's Encrypt certificate behind this domain name: [https://javascript.esgi.quozul.dev/](https://javascript.esgi.quozul.dev/).
