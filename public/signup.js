document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#signup-form")
    .addEventListener("submit", function (e) {
      let email2 = document.querySelector("#email2");
      let name = document.querySelector("#name");
      let npass = document.querySelector("#npass");
      let cpass = document.querySelector("#cpass");
      if (!email2.value || !name.value || !npass.value || !cpass.value) {
        alert("Required fields cannot be empty!");
        e.preventDefault();
      }
      if (npass.value != cpass.value) {
        alert("Passwords do not match!");
        e.preventDefault();
      }
    });

  const npass = document.querySelector("#npass");
  const cpass = document.querySelector("#cpass");
  const npasseye = document.querySelector("#npasseye");
  const cpasseye = document.querySelector("#cpasseye");
  npass.addEventListener("keyup", function () {
    if (npass.value && npass.getAttribute("type") == "password") {
      npasseye.setAttribute("name", "eye-outline");
    } else if (npass.value && npass.getAttribute("type") == "text") {
      npasseye.setAttribute("name", "eye-off-outline");
    }
  });
  cpass.addEventListener("keyup", function () {
    if (cpass.value && cpass.getAttribute("type") == "password") {
      cpasseye.setAttribute("name", "eye-outline");
    } else if (cpass.value && cpass.getAttribute("type") == "text") {
      cpasseye.setAttribute("name", "eye-off-outline");
    }
  });

  npasseye.addEventListener("click", function () {
    const type = npass.getAttribute("type");
    const newtype = type == "password" ? "text" : "password";
    const newname = type == "text" ? "eye-outline" : "eye-off-outline";
    npass.setAttribute("type", newtype);
    npasseye.setAttribute("name", newname);
  });

  cpasseye.addEventListener("click", function () {
    const type = cpass.getAttribute("type");
    const newtype = type == "password" ? "text" : "password";
    const newname = type == "text" ? "eye-outline" : "eye-off-outline";
    cpass.setAttribute("type", newtype);
    cpasseye.setAttribute("name", newname);
  });
});
