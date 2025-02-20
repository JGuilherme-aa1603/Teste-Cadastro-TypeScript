enum UserRole {
    ADMIN = "Administrador",
    USER = "Usuário Comum"
}

interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}

let users: User[] = [];

const form : HTMLFormElement = document.getElementById("userForm");
const userList : HTMLDivElement = document.getElementById("userList");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput : HTMLInputElement = document.getElementById("name");
    const emailInput : HTMLInputElement = document.getElementById("email");
    
    const name : string = nameInput.value.trim();
    const email : string = emailInput.value.trim();

    if (name && email) {
        const newUser: User = {
            id: users.length + 1,
            name,
            email,
            role: Math.floor(Math.random() * 2) == 0 ? UserRole.ADMIN : UserRole.USER
        }
        users.push(newUser);

        addUserCard(newUser);
        form.reset();
    }
});

function addUserCard(user: User): void {
    const card : HTMLDivElement = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <strong>${user.name}</strong>
        <br>${user.email}<br>
        <br><small>${user.role}</small></br>
        <small>id: ${user.id}</small>
    `;

    userList.appendChild(card);
}
