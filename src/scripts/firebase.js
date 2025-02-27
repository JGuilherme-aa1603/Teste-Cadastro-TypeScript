import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, set, remove, onValue } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyC3pR2blAhoSI5XgGNWPX7mqnkU1sOo5Ac",

    authDomain: "cadastro-typescript.firebaseapp.com",

    projectId: "cadastro-typescript",

    storageBucket: "cadastro-typescript.firebasestorage.app",

    messagingSenderId: "470810423897",

    appId: "1:470810423897:web:316779250240b093e4f748",

    measurementId: "G-7VRTWMDXL0"

};

const app = initializeApp(firebaseConfig);
window.db = getDatabase(app);
const usersRef = ref(db, 'users');

window.addData = function(name, email, role) {
    set(ref(db, 'users/' + Date.now()), {
        name: name,
        email: email,
        role: role
    }).catch((error) => {
        alert('Erro ao adicionar dados: ' + error);
    })
}

window.removeData = function(key) {
    remove(ref(db, 'users/' + key)).catch((error) => {
        alert('Erro ao remover dados: ' + error);
    });
}

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
                    <button class="user-button" onclick="removeData('${key}')">Remover</button>
                </div>
            `;
        }
    });
}

listener();

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

onAuthStateChanged(auth, (user) => {
    if (user) {
      alert('Usuário logado:', user);
    } else {
      alert('Nenhum usuário logado');
    }
});
