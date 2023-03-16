// document.addEventListener("DOMContentLoaded", function () {
//   document
//     .querySelector("#login-form")
//     .addEventListener("submit", function (event) {
//       let email = document.querySelector("#email");
//       let password = document.querySelector("#password");
//       if (!email.value || !password.value) {
//         alert("All fields are required!");
//         event.preventDefault();
//       }
//     });

//   const password = document.querySelector("#password");
//   const eye = document.querySelector("#eye");
//   password.addEventListener("keyup", function () {
//     if (password.value && password.getAttribute("type") == "password") {
//       eye.setAttribute("name", "eye-outline");
//     } else if (password.value && password.getAttribute("type") == "text") {
//       eye.setAttribute("name", "eye-off-outline");
//     }
//   });

//   eye.addEventListener("click", function () {
//     const type = password.getAttribute("type");
//     const newtype = type == "password" ? "text" : "password";
//     const newname = type == "text" ? "eye-outline" : "eye-off-outline";
//     password.setAttribute("type", newtype);
//     eye.setAttribute("name", newname);
//   });
// });
