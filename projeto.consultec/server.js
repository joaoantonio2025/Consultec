import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

console.log('🚀 Iniciando API Consultec...');

let usuarios = [];

app.get('/', (req, res) => {
    console.log('✅ Health check - API funcionando');
    res.json({ 
        message: '🎉 API Consultec rodando com sucesso!',
        status: 'online',
        timestamp: new Date().toISOString()
    });
});

app.post('/usuarios', (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        
        console.log('📝 Recebendo cadastro:', email);
        
        if (usuarios.find(u => u.email === email)) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
       
        const novoUsuario = {
            id: Date.now(),
            nome,
            email,
            senha,
            tipo: 'paciente'
        };
        
        usuarios.push(novoUsuario);
        console.log('✅ Usuário cadastrado:', email);
        
        res.status(201).json({
            message: 'Usuário criado com sucesso!',
            usuario: {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email
            }
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

app.post('/login', (req, res) => {
    try {
        const { email, senha } = req.body;
        
        console.log('🔐 Tentativa de login:', email);
        
        const usuario = usuarios.find(u => u.email === email && u.senha === senha);
        
        if (usuario) {
            console.log('✅ Login realizado:', email);
            res.json({
                message: 'Login realizado!',
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('=========================================');
    console.log('🚀 API CONSULTEC RODANDO!');
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log('=========================================');
});