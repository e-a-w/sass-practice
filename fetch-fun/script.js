/************** */
/** GET PLACEHOLDER **/
/************* */

const fetchPlaceholder = () => {
  fetch("https://randomfox.ca/floof/")
    .then((res) => res.json())
    .then((res) => {
      let avatar = document.createElement("img");
      let card = document.querySelector(".profile-card");

      avatar.className = "avatar";
      avatar.setAttribute("src", res.image);
      avatar.setAttribute("alt", "avatar");

      card.removeChild(card.firstElementChild);
      card.insertBefore(avatar, card.firstElementChild);
    })
    .catch((err) => console.err(err));
};

window.addEventListener("load", fetchPlaceholder);

/************** */
/** RANDOM USER **/
/************* */
let randomButton = document.querySelector("#random");

class User {
  constructor(name, gender, location, nat, registered, picture) {
    this.name = name;
    (this.gender = gender),
      (this.location = location),
      (this.nat = nat),
      (this.registered = registered),
      (this.picture = picture);
  }
}

const getRandomUser = () => {
  fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      let results = res.results[0];
      let randomUser = new User(
        results.name.first,
        results.gender,
        results.location.country,
        results.nat,
        results.registered.age,
        results.picture.large
      );
      // console.log(user);
      displayUser(randomUser);
    })
    .catch((err) => console.err(err));
};

const displayUser = (user) => {
  let infoDivs = document.querySelectorAll(".user-info div");
  document.querySelector(".avatar").setAttribute("src", user.picture);
  for (let i = 0; i < infoDivs.length; i++) {
    switch (infoDivs[i].id) {
      case "name":
        infoDivs[i].textContent = user.name;
        break;
      case "gender":
        infoDivs[i].textContent = user.gender;
        break;
      case "location":
        infoDivs[i].textContent = user.location;
        break;
      case "nat":
        infoDivs[i].textContent = user.nat;
        break;
      case "registered":
        infoDivs[i].firstElementChild.textContent = user.registered;
        break;
    }
  }
};

randomButton.addEventListener("click", getRandomUser);
