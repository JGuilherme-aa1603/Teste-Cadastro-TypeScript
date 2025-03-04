enum userRole { //Enumeração
    ADMIN = "Administrador",
    USER = "Usuário Comum"
}

interface user { //Interface
    name: string;
    email: string;
    role: userRole;
}

//Tipagem
const form = document.getElementById("userForm") as HTMLFormElement;
const userList = document.getElementById("userList") as HTMLDivElement;

//Adicionar dados de cada card
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    
    const name : string = nameInput.value.trim();
    const email : string = emailInput.value.trim();

    if (name && email) { 
        const newUser: user = { //Objeto
            name,
            email,
            role: Math.floor(Math.random() * 2) == 0 ? userRole.ADMIN : userRole.USER
        };
        window.addData(newUser.name, newUser.email, newUser.role);
        form.reset();
    }
});

//Mostrar e esconder o formulário
const loginContainer = document.querySelector(".loginContainer") as HTMLDivElement;
const loginButton = document.getElementById("loginButton") as HTMLButtonElement;

loginButton.addEventListener("click", () => {
    loginContainer.id = "";
});

loginContainer.addEventListener("click", (event) => {
    if (event.target === loginContainer) {
        loginContainer.id = "hidden";
    }
});
