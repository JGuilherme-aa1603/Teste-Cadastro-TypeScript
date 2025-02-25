enum UserRole {
    ADMIN = "Administrador",
    USER = "Usuário Comum"
}

interface User {
    name: string;
    email: string;
    role: UserRole;
}

let users: User[] = [];

const form = document.getElementById("userForm") as HTMLFormElement;
const userList = document.getElementById("userList") as HTMLDivElement;

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    
    const name : string = nameInput.value.trim();
    const email : string = emailInput.value.trim();

    if (name && email) {
        const newUser: User = {
            name,
            email,
            role: Math.floor(Math.random() * 2) == 0 ? UserRole.ADMIN : UserRole.USER
        }
        window.addData(newUser.name, newUser.email, newUser.role);
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
    `;

    userList.appendChild(card);
}
