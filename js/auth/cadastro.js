// Referências aos elementos do DOM
const form = document.getElementById('cadastroForm');
const btnCadastrar = document.getElementById('btnCadastrar');
const btnSalvarEdicao = document.getElementById('btnSalvarEdicao');
const selectUsuario = document.getElementById('selectUsuario');
const senhaInput = document.getElementById('senha');
const nomeInput = document.getElementById('nome');
const cargoInput = document.getElementById('cargo');
const nascimentoInput = document.getElementById('nascimento');
const emailInput = document.getElementById('email');

let modoEdicao = false; // Controle para modo de edição
let usuarioSelecionadoId = null; // ID do usuário que está sendo editado

// Carregar usuários ao inicializar
function carregarUsuarios() {
    const database = firebase.database();
    const usuariosRef = database.ref('usuarios');
    
    usuariosRef.once('value', (snapshot) => {
        const usuarios = snapshot.val();
        if (usuarios) {
            // Preencher o dropdown com os usuários
            Object.keys(usuarios).forEach(userId => {
                const option = document.createElement('option');
                option.value = userId;
                option.textContent = usuarios[userId].nome;
                selectUsuario.appendChild(option);
            });
        }
    });
}

// Alternar entre modo de cadastro e edição
selectUsuario.addEventListener('change', function () {
    const usuarioId = selectUsuario.value;
    
    if (usuarioId === "") {
        // Modo de cadastro
        modoEdicao = false;
        btnCadastrar.style.display = 'inline-block';
        btnSalvarEdicao.style.display = 'none';
        senhaInput.disabled = false;
        form.reset();
    } else {
        // Modo de edição
        modoEdicao = true;
        usuarioSelecionadoId = usuarioId;
        btnCadastrar.style.display = 'none';
        btnSalvarEdicao.style.display = 'inline-block';
        senhaInput.disabled = true; // Senha desativada no modo de edição

        // Preencher o formulário com os dados do usuário
        const database = firebase.database();
        const usuarioRef = database.ref('usuarios/' + usuarioId);
        usuarioRef.once('value', (snapshot) => {
            const usuario = snapshot.val();
            if (usuario) {
                nomeInput.value = usuario.nome;
                cargoInput.value = usuario.cargo;
                nascimentoInput.value = usuario.nascimento;
                emailInput.value = usuario.email;
            }
        });
    }
});

// Função para cadastrar novo usuário
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = nomeInput.value;
    const cargo = cargoInput.value;
    const nascimento = nascimentoInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;

    if (!modoEdicao) {
        // Modo de cadastro
        auth.createUserWithEmailAndPassword(email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                const database = firebase.database();
                const userId = user.uid;
                const userData = {
                    nome: nome,
                    cargo: cargo,
                    nascimento: nascimento,
                    email: email
                };

                database.ref('usuarios/' + userId).set(userData)
                    .then(() => {
                        console.log('Dados do usuário salvos no banco de dados.');
                        redirectToLogin();
                    })
                    .catch((error) => {
                        console.error('Erro ao salvar dados do usuário:', error);
                        document.getElementById('error-message').textContent = 'Erro ao salvar dados do usuário.';
                    });
            })
            .catch((error) => {
                console.error('Erro ao criar usuário:', error);
                document.getElementById('error-message').textContent = error.message;
            });
    }
});

// Função para salvar edição de usuário
btnSalvarEdicao.addEventListener('click', function () {
    const nome = nomeInput.value;
    const cargo = cargoInput.value;
    const nascimento = nascimentoInput.value;
    const email = emailInput.value;

    if (modoEdicao && usuarioSelecionadoId) {
        const database = firebase.database();
        const userData = {
            nome: nome,
            cargo: cargo,
            nascimento: nascimento,
            email: email
        };

        // Atualizar dados do usuário no Firebase
        database.ref('usuarios/' + usuarioSelecionadoId).update(userData)
            .then(() => {
                console.log('Dados do usuário atualizados no banco de dados.');
                alert('Usuário atualizado com sucesso!');
                form.reset();
                selectUsuario.value = ""; // Volta para o modo de cadastro
                senhaInput.disabled = false; // Reativa o campo de senha
                btnCadastrar.style.display = 'inline-block';
                btnSalvarEdicao.style.display = 'none';
            })
            .catch((error) => {
                console.error('Erro ao atualizar dados do usuário:', error);
                document.getElementById('error-message').textContent = 'Erro ao atualizar dados do usuário.';
            });
    }
});

// Função para redirecionar após cadastro
function redirectToLogin() {
    window.location.href = '/index.html';
}

// Inicializar lista de usuários ao carregar a página
window.onload = carregarUsuarios;
