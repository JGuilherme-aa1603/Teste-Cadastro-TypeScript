import { ref, set, remove, onValue } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js';
import { app, db } from './firebase-config.js';


const usersRef = ref(db, 'users');

//Adicionar Usuário ao banco de dados
window.addData = function(name, email, role) {
    set(ref(db, 'users/' + Date.now()), {
        name: name,
        email: email,
        role: role
    }).catch((error) => {
        alert('Erro ao adicionar dados: ' + error);
    })
}



//Remover Usuário do banco de dados
window.removeData = function(key) {
    remove(ref(db, 'users/' + key)).catch((error) => {
        alert('Erro ao remover dados: ' + error);
    });
}




//Escutar mudanças e atualizar a lista de usuários
function listener() {
    onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        for (let key in data) {
            const user = data[key];
            userList.innerHTML += `
                <div class="card">
                    <strong>${user.name}</strong>
                    <br>${user.email}<br>
                    <br><small>${user.role}</small></br>
                    <button onclick="removeData('${key}')">Remover</button>
                </div>
            `;
        }
    });
}

listener();



//Login
const auth = getAuth(app);
const submit = document.getElementById('loginSubmitButton');
const loginContainer = document.querySelector('.loginContainer');

submit.addEventListener('click', (event) => {
    const email = document.getElementById('loginUser').value;
    const password = document.getElementById('loginPassword').value;

    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Usuário logado:', user);
            loginContainer.id = 'hidden';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Erro ao logar: ' + errorMessage);
            console.error('Erro ao logar:', errorCode, errorMessage);
        });
});




//Verificar se o usuário está logado
onAuthStateChanged(auth, (user) => {
    if (user) {
      alert('Usuário logado:', user);
    } else {
      alert('Nenhum usuário logado');
    }
});



//LogOut
const logOutButton = document.querySelector('#logOutButton')
logOutButton.addEventListener('click', (event) => {
    event.preventDefault();

    signOut(auth).catch( (error) => {
        alert('Erro ao deslogar: ' + error)
    })
})
