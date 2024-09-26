const db = firebase.firestore();
const storage = firebase.storage();
const treinamentosRef = db.collection("Treinamentos");

const setorSelect = document.getElementById('setor');
const form = document.getElementById('curso-form');

function carregarSetores() {
    const database = firebase.database();
    const setoresRef = database.ref('setores');

    setoresRef.once('value', (snapshot) => {
        const setores = snapshot.val();
        if (setores) {
            setorSelect.innerHTML = '';
            Object.keys(setores).forEach(setorId => {
                const option = document.createElement('option');
                option.value = setorId;
                option.textContent = setores[setorId].nome;
                setorSelect.appendChild(option);
            });
        } else {
            console.error("Nenhum setor encontrado.");
        }
    }).catch((error) => {
        console.error("Erro ao carregar setores: ", error);
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const setorId = setorSelect.value;
    const imagemFile = document.getElementById('imagem').files[0];

    if (imagemFile) {
        const storageRef = storage.ref('imagensCursos/' + new Date().getTime() + '_' + imagemFile.name);
        const uploadTask = storageRef.put(imagemFile);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, 
            (error) => {
                console.error("Erro ao fazer upload da imagem: ", error);
                alert('Erro ao fazer upload da imagem.');
            }, 
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    treinamentosRef.add({
                        Titulo: titulo,
                        Descricao: descricao,
                        SetorId: setorId,
                        ImagemURL: downloadURL
                    }).then(() => {
                        alert('Curso cadastrado com sucesso!');
                        form.reset();
                    }).catch((error) => {
                        console.error("Erro ao cadastrar curso: ", error);
                        alert('Erro ao cadastrar curso, tente novamente.');
                    });
                });
            }
        );
    } else {
        alert('Por favor, selecione uma imagem para o curso.');
    }
});

window.onload = carregarSetores;

auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'index.html';
    }
});
