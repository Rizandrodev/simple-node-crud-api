import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho do arquivo JSON
const filePath = path.join(__dirname, 'data.json');

// Função para ler os usuários do arquivo JSON
export const getUsers = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data); // Converte o conteúdo para um array de usuários
    } catch (error) {
        console.error('Error reading users file:', error);
        return []; // Retorna array vazio em caso de erro
    }
};

// Função para salvar os usuários no arquivo JSON
export const saveUsers = (users) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2)); // Salvando o array de usuários
    } catch (error) {
        console.error('Error writing users file:', error);
    }
};
