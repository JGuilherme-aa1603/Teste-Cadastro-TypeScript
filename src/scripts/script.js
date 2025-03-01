var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "Administrador";
    UserRole["USER"] = "Usu\u00E1rio Comum";
})(UserRole || (UserRole = {}));
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
            name: name,
            email: email,
            role: Math.floor(Math.random() * 2) == 0 ? UserRole.ADMIN : UserRole.USER
        };
        window.addData(newUser.name, newUser.email, newUser.role);
        form.reset();
    }
});
var loginContainer = document.querySelector(".loginContainer");
var loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", function () {
    loginContainer.id = "";
});
loginContainer.addEventListener("click", function (event) {
    if (event.target === loginContainer) {
        loginContainer.id = "hidden";
    }
});
