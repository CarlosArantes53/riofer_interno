const form = document.getElementById('cadastroForm');
const btnCadastrar = document.getElementById('btnCadastrar');
const btnSalvarEdicao = document.getElementById('btnSalvarEdicao');
const selectUsuario = document.getElementById('selectUsuario');
const senhaInput = document.getElementById('senha');
const nomeInput = document.getElementById('nome');
const cargoInput = document.getElementById('cargo');
const nascimentoInput = document.getElementById('nascimento');
const emailInput = document.getElementById('email');
const tipoUsuarioInput = document.getElementById('tipoUsuario');
const setorUsuarioInput = document.getElementById('setorUsuario');
const btnCadastrarSetor = document.getElementById('btnCadastrarSetor');
const nomeSetorInput = document.getElementById('nomeSetor');

let modoEdicao = false;
let usuarioSelecionadoId = null;

function carregarSetores() {
    const database = firebase.database();
    const setoresRef = database.ref('setores');
    
    setoresRef.once('value', (snapshot) => {
        const setores = snapshot.val();
        if (setores) {
            setorUsuarioInput.innerHTML = '';
            Object.keys(setores).forEach(setorId => {
                const option = document.createElement('option');
                option.value = setorId;
                option.textContent = setores[setorId].nome;
                setorUsuarioInput.appendChild(option);
            });
        }
    });
}

btnCadastrarSetor.addEventListener('click', function() {
    const nomeSetor = nomeSetorInput.value;

    if (nomeSetor) {
        const database = firebase.database();
        const setorId = database.ref().child('setores').push().key;
        const setorData = {
            nome: nomeSetor
        };

        database.ref('setores/' + setorId).set(setorData)
            .then(() => {
                console.log('Setor cadastrado com sucesso.');
                carregarSetores(); 
                nomeSetorInput.value = ''; 
            })
            .catch((error) => {
                console.error('Erro ao cadastrar setor:', error);
                document.getElementById('setor-error-message').textContent = 'Erro ao cadastrar setor.';
            });
    } else {
        document.getElementById('setor-error-message').textContent = 'Preencha o nome do setor.';
    }
});

function carregarUsuarios() {
    const database = firebase.database();
    const usuariosRef = database.ref('usuarios');
    
    usuariosRef.once('value', (snapshot) => {
        const usuarios = snapshot.val();
        if (usuarios) {
            Object.keys(usuarios).forEach(userId => {
                const option = document.createElement('option');
                option.value = userId;
                option.textContent = usuarios[userId].nome;
                selectUsuario.appendChild(option);
            });
        }
    });
}

selectUsuario.addEventListener('change', function () {
    const usuarioId = selectUsuario.value;
    
    if (usuarioId === "") {
        modoEdicao = false;
        btnCadastrar.style.display = 'inline-block';
        btnSalvarEdicao.style.display = 'none';
        senhaInput.disabled = false;
        emailInput.disabled = false;
        form.reset();
    } else {
        modoEdicao = true;
        usuarioSelecionadoId = usuarioId;
        btnCadastrar.style.display = 'none';
        btnSalvarEdicao.style.display = 'inline-block';
        senhaInput.disabled = true;
        emailInput.disabled = true; 
        
        const database = firebase.database();
        const usuarioRef = database.ref('usuarios/' + usuarioId);
        usuarioRef.once('value', (snapshot) => {
            const usuario = snapshot.val();
            if (usuario) {
                nomeInput.value = usuario.nome;
                cargoInput.value = usuario.cargo;
                nascimentoInput.value = usuario.nascimento;
                emailInput.value = usuario.email;
                tipoUsuarioInput.value = usuario.tipoUsuario;
                setorUsuarioInput.value = usuario.setorId;
            }
        });
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = nomeInput.value;
    const cargo = cargoInput.value;
    const nascimento = nascimentoInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;
    const tipoUsuario = tipoUsuarioInput.value;
    const setorId = setorUsuarioInput.value;

    if (!modoEdicao) {
        auth.createUserWithEmailAndPassword(email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                const database = firebase.database();
                const userId = user.uid;
                const userData = {
                    nome: nome,
                    cargo: cargo,
                    nascimento: nascimento,
                    email: email,
                    tipoUsuario: tipoUsuario,
                    setorId: setorId
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

btnSalvarEdicao.addEventListener('click', function () {
    const nome = nomeInput.value;
    const cargo = cargoInput.value;
    const nascimento = nascimentoInput.value;
    const tipoUsuario = tipoUsuarioInput.value;
    const setorId = setorUsuarioInput.value;

    if (modoEdicao && usuarioSelecionadoId) {
        const database = firebase.database();
        const userData = {
            nome: nome,
            cargo: cargo,
            nascimento: nascimento,
            tipoUsuario: tipoUsuario,
            setorId: setorId
        };

        database.ref('usuarios/' + usuarioSelecionadoId).update(userData)
            .then(() => {
                console.log('Dados do usuário atualizados no banco de dados.');
                alert('Usuário atualizado com sucesso!');
                form.reset();
                selectUsuario.value = "";
                senhaInput.disabled = false;
                emailInput.disabled = false;
                btnCadastrar.style.display = 'inline-block';
                btnSalvarEdicao.style.display = 'none';
            })
            .catch((error) => {
                console.error('Erro ao atualizar dados do usuário:', error);
                document.getElementById('error-message').textContent = 'Erro ao atualizar dados do usuário.';
            });
    }
});

function redirectToLogin() {
    window.location.href = '/index.html';
}

window.onload = function() {
    carregarUsuarios();
    carregarSetores();
};
