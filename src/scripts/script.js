var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "Administrador";
    UserRole["USER"] = "Usu\u00E1rio Comum";
})(UserRole || (UserRole = {}));
var users = [];
var form = document.getElementById("userForm");
var userList = document.getElementById("userList");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    if (name && email) {
        var newUser = {
            id: users.length + 1,
            name: name,
            email: email,
            role: Math.floor(Math.random() * 2) == 0 ? UserRole.ADMIN : UserRole.USER
        };
        users.push(newUser);
        addUserCard(newUser);
        form.reset();
    }
});
function addUserCard(user) {
    var card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = "\n        <strong>".concat(user.name, "</strong>\n        <br>").concat(user.email, "<br>\n        <br><small>").concat(user.role, "</small></br>\n        <small>id: ").concat(user.id, "</small>\n    ");
    userList.appendChild(card);
}
