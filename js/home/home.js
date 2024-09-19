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
function showUserInfo(userId) {
    const database = firebase.database();
    database.ref('usuarios/' + userId).once('value')
        .then((snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                document.getElementById('user-info').textContent = 'Olá, ' + userData.nome + '!';
            }
        })
        .catch((error) => {
            console.error('Erro ao obter dados do usuário:', error);
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
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        document.getElementById('loading-page').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 3000); 
});
auth.onAuthStateChanged((user) => {
    if (user) {
        exibirBlogs();
    } else {
        window.location.href = 'index.html'; 
    }
});