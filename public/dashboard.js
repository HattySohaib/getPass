function openForm() {
  document.getElementById("trans").style.visibility = "visible";
}

function closeForm() {
  document.getElementById("trans").style.visibility = "hidden";
}

function showLink() {
  let btn = document.getElementById("logOut");
  btn.style.visibility = "visible";
  let div = document.getElementById("closer");
  div.style.display = "block";
  document.getElementById("closer").addEventListener("click", () => {
    btn.style.visibility = "hidden";
    div.style.display = "none";
  });
}

function showAll() {
  let btn = document.getElementById("options");
  btn.style.visibility = "visible";
  let div = document.getElementById("closer");
  div.style.display = "block";
  document.getElementById("closer").addEventListener("click", () => {
    btn.style.visibility = "hidden";
    div.style.display = "none";
  });
}

function enableEdit() {
  document.getElementById("name").toggleAttribute("disabled");
  document.getElementById("room").toggleAttribute("disabled");
  document.getElementById("phone").toggleAttribute("disabled");
  document.getElementById("hostel").toggleAttribute("disabled");
  let btn = document.getElementById("signup-btn");
  btn.classList.toggle("hidden");
}
