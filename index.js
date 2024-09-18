import http from 'http';

const PORT = 3000;
const users = [];

const server = http.createServer((req, res) => {
    if (req.url === '/users') {
        if (req.method === 'GET') {
            res.end(JSON.stringify(users));
        }
        if (req.method === 'POST') {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            }).on('end', () => {
                const datauser = JSON.parse(body);
                const user = {
                    id: Math.floor(Math.random() * 1000) + Date.now() % 1000,
                    ...datauser,
                };
                users.push(user);
                
                console.log(users); // Exibe o array de usuários
                res.end(JSON.stringify(users));
            });
        }
    }

    if (req.url.startsWith('/users/')) {
        if (req.method === 'PUT') {
            const urlParts = req.url.split('/');
            const userId = urlParts[2]; // Pegando o ID do usuário da URL
            
            console.log(`Updating user with ID: ${userId}`);
            res.end(`Updating user with ID: ${userId}`);
        }
    }
});

server.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));
