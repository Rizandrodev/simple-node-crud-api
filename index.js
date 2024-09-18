import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3000;
const filePath = path.join(__dirname, 'users.json');

// Função para ler os usuários do arquivo JSON
const getUsers = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
};

// Função para salvar os usuários no arquivo JSON
const saveUsers = (users) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error writing users file:', error);
    }
};

// Servidor HTTP
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // GET /users - Retorna todos os usuários
    if (req.url === '/users' && req.method === 'GET') {
        try {
            const users = getUsers();
            res.writeHead(200);
            res.end(JSON.stringify(users));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Failed to retrieve users' }));
        }
    }

    // POST /users - Cria um novo usuário
    else if (req.url === '/users' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        }).on('end', () => {
            try {
                const dataUser = JSON.parse(body); // Parse do corpo da requisição
                const users = getUsers();

                // Criando um novo usuário com um ID único
                const user = {
                    id: Math.floor(Math.random() * 1000) + Date.now() % 1000,
                    ...dataUser,
                };
                users.push(user);
                saveUsers(users); // Salvando o novo usuário

                res.writeHead(201);
                res.end(JSON.stringify(user));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON data' }));
            }
        });
    }

    // PUT /users/:id - Atualiza um usuário existente
    else if (req.url.startsWith('/users/') && req.method === 'PUT') {
        const urlParts = req.url.split('/');
        const userId = parseInt(urlParts[2], 10);

        if (isNaN(userId)) {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: 'Invalid user ID' }));
        }

        const users = getUsers();
        const userIndex = users.findIndex((user) => user.id === userId);

        if (userIndex === -1) {
            res.writeHead(404);
            return res.end(JSON.stringify({ error: 'User not found' }));
        }

        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        }).on('end', () => {
            try {
                const dataUser = JSON.parse(body);

                // Atualizando o usuário
                users[userIndex] = { id: userId, ...dataUser };
                saveUsers(users); // Salvando as mudanças

                res.writeHead(200);
                res.end(JSON.stringify({ message: 'User updated', user: users[userIndex] }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON data' }));
            }
        });
    }

    // DELETE /users/:id - Exclui um usuário
    else if (req.url.startsWith('/users/') && req.method === 'DELETE') {
        const urlParts = req.url.split('/');
        const userId = parseInt(urlParts[2], 10);

        if (isNaN(userId)) {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: 'Invalid user ID' }));
        }

        const users = getUsers();
        const userIndex = users.findIndex((user) => user.id === userId);

        if (userIndex === -1) {
            res.writeHead(404);
            return res.end(JSON.stringify({ error: 'User not found' }));
        }

        // Removendo o usuário
        users.splice(userIndex, 1);
        saveUsers(users); // Salvando o arquivo atualizado

        res.writeHead(200);
        res.end(JSON.stringify({ message: 'User deleted' }));
    }

    // Caso a rota ou método não sejam encontrados
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
