const db = firebase.firestore();
const storage = firebase.storage();
const treinamentosRef = db.collection("Treinamentos");

document.getElementById('curso-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const categoria = document.getElementById('categoria').value;
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
                        Categoria: categoria,
                        ImagemURL: downloadURL
                    }).then(() => {
                        alert('Curso cadastrado com sucesso!');
                        document.getElementById('curso-form').reset();
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

auth.onAuthStateChanged((user) => {
    if (user) {
    } else {
        window.location.href = 'index.html';
    }
});