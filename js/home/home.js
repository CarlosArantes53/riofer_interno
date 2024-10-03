const db = firebase.firestore();
const blogRef = db.collection("Blog");

function exibirBlogs() {
    blogRef.orderBy("DataPublicacao", "desc").get().then((querySnapshot) => {
        const eventosContainer = document.getElementById("eventos-container");
        const publicacoesContainer = document.getElementById("publicacoes-container");
        eventosContainer.innerHTML = "";
        publicacoesContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const blog = doc.data();
            const blogElement = document.createElement("div");
            blogElement.classList.add("blog-container");
            const imagemURL = blog.ImagemURL; 

            let blogContent = `
                <div class="blog-content">
                    ${imagemURL ? `<img src="${imagemURL}" alt="${blog.Titulo}" class="blog-imagem">` : ''}
                    <div class="blog-texto">
                        <h3>${blog.Titulo}</h3>
                        <p>${blog.Descricao}</p>
                        ${blog.Categoria === "Evento" ? `<p>Data: ${blog.DataInicioEvento.toDate().toLocaleDateString()} - ${blog.DataFimEvento.toDate().toLocaleDateString()}</p>` : ''}
                    </div>
                </div>
            `;
            
            blogElement.innerHTML = blogContent;

            if (blog.Categoria === "Evento") {
                eventosContainer.appendChild(blogElement);
            } else {
                publicacoesContainer.appendChild(blogElement);
            }
        });
    }).catch((error) => {
        console.error("Erro ao exibir blogs: ", error);
    });
}


function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}

function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        document.getElementById('loading-page').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 9000);
    exibirBlogs();
});

auth.onAuthStateChanged(user => {
    if (user) {
        const userId = user.uid;
        database.ref('usuarios/' + userId).once('value')
            .then(snapshot => {
                const userData = snapshot.val();
                if (userData && userData.nome) {
                    document.getElementById('user-info').textContent = `Olá, ${userData.nome}!`;
                } else {
                    document.getElementById('user-info').textContent = `Olá!`;
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados do usuário:', error);
            });
    } else {
        redirectToLogin();
    }
});


const botoesCarrossel = document.querySelectorAll(".botao");
const imagens = document.querySelectorAll(".imagem")
const informacoes = document.querySelectorAll(".informacoes")

    //passo 2
botoesCarrossel.forEach((botao, indice) => {
    botao.addEventListener("click", () => {
    //passo 3
        desativarBotaoSelecionado();
    //passo 4
        MarcarBotaoSelecionado(botao);
    //- passo 5 - ensonder a imagem anteriorente selecionada
        esconderImagemAtiva();
        //- passo 6 - fazer aparecer a imagem correspondente ao botao clicado
       mostrarImagemDefundo(indice);
       //passo 7 - enconder as informaçoes da imagem anteriormente selecionada
       esconderinformacoesativas();

       //passo 8
       mostrarInformacoes(indice);
    });
});

function MarcarBotaoSelecionado(botao) {
    botao.classList.add("selecionado");
}

function mostrarInformacoes(indice) {
    informacoes[indice].classList.add("ativa");
}

function esconderinformacoesativas() {
    const informacoesAtiva = document.querySelector(".informacoes.ativa");
    informacoesAtiva.classList.remove("ativa");
}

function mostrarImagemDefundo(indice) {
    imagens[indice].classList.add("ativa");
}

function esconderImagemAtiva() {
    const imagemAtiva = document.querySelector(".ativa");
    imagemAtiva.classList.remove("ativa");
}

function desativarBotaoSelecionado() {
    const botaoSelecionado = document.querySelector(".selecionado");
    botaoSelecionado.classList.remove("selecionado");
}


  // Seleciona todas as imagens e botões
  const imagem = document.querySelectorAll('.imagem');
  const botoes = document.querySelectorAll('.botao');

  // Índice da imagem atual
  let indexAtual = 0;

  // Função para trocar a imagem
  function trocarImagem() {
    // Remove a classe 'ativa' e 'selecionado' da imagem e botão atuais
    imagens[indexAtual].classList.remove('ativa');
    botoes[indexAtual].classList.remove('selecionado');

    // Incrementa o índice da imagem atual, com loop
    indexAtual = (indexAtual + 1) % imagens.length;

    // Adiciona a classe 'ativa' e 'selecionado' à nova imagem e botão
    imagens[indexAtual].classList.add('ativa');
    botoes[indexAtual].classList.add('selecionado');
  }

  // Define o intervalo para trocar a imagem a cada 3 segundos (3000 ms)
  setInterval(trocarImagem, 3000);

  // Adiciona um event listener para cada botão, permitindo troca manual
  botoes.forEach((botao, index) => {
    botao.addEventListener('click', () => {
      // Remove a classe 'ativa' e 'selecionado' da imagem e botão atuais
      imagens[indexAtual].classList.remove('ativa');
      botoes[indexAtual].classList.remove('selecionado');

      // Atualiza o índice para o botão clicado
      indexAtual = index;

      // Adiciona a classe 'ativa' e 'selecionado' para a nova imagem e botão
      imagens[indexAtual].classList.add('ativa');
      botoes[indexAtual].classList.add('selecionado');
    });
  });
