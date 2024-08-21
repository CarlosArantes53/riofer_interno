auth.onAuthStateChanged(user => {
    if (!user) {
        redirectToLogin();
    }
});

document.getElementById('logout').addEventListener('click', function() {
    auth.signOut().then(() => {
        redirectToLogin();
    });
});