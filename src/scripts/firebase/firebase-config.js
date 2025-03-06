import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js';

//Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC3pR2blAhoSI5XgGNWPX7mqnkU1sOo5Ac",

    authDomain: "cadastro-typescript.firebaseapp.com",

    projectId: "cadastro-typescript",

    storageBucket: "cadastro-typescript.firebasestorage.app",

    messagingSenderId: "470810423897",

    appId: "1:470810423897:web:316779250240b093e4f748",

    measurementId: "G-7VRTWMDXL0"

};

//Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };