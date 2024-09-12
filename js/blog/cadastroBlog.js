const db = firebase.firestore();
const storage = firebase.storage();
const blogRef = db.collection("Blog");

document.getElementById('Blog-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const categoria = document.getElementById('categoria').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    const imagemFile = document.getElementById('imagem').files[0];

    const dataPublicacao = new Date();

    const showError = (message) => {
        alert(message);
    };

    if (!titulo || !descricao || !categoria) {
        showError('Os campos Título, Descrição e Categoria são obrigatórios.');
        return;
    }

    if (categoria === 'Evento') {
        if (!dataInicio || !dataFim) {
            showError('Para Eventos, os campos Data de Início e Data de Fim são obrigatórios.');
            return;
        }
    }

    const blogData = {
        Titulo: titulo,
        Descricao: descricao,
        Categoria: categoria,
        DataPublicacao: firebase.firestore.Timestamp.fromDate(dataPublicacao)
    };

    if (categoria === 'Evento') {
        blogData.DataInicioEvento = firebase.firestore.Timestamp.fromDate(new Date(dataInicio));
        blogData.DataFimEvento = firebase.firestore.Timestamp.fromDate(new Date(dataFim));
    }

    if (imagemFile) {
        const storageRef = storage.ref('imagensBlogs/' + new Date().getTime() + '_' + imagemFile.name);

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
                    blogData.ImagemURL = downloadURL;
                    salvarBlog(blogData);
                });
            }
        );
    } else {
        salvarBlog(blogData);
    }
});

const salvarBlog = (blogData) => {
    blogRef.add(blogData)
        .then(() => {
            alert('Blog cadastrado com sucesso!');
            document.getElementById('Blog-form').reset();
        })
        .catch((error) => {
            console.error("Erro ao cadastrar Blog: ", error);
            alert('Erro ao cadastrar Blog, tente novamente.');
        });
};

auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'index.html';
    }
});
