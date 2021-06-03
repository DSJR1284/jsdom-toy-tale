const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.getElementById("toy-collection")

  fetch("http://localhost:3000/toys")
    .then(respon => respon.json())
    .then(toys => {
      // Take the toys array and make HTML with them in order to add them to the DOM
      let toysHTML = toys.map(function(toy){
        return `
        <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes}</p>
        <button data-id="${toy.id}" class="like-btn">Like <3</button>
      </div> 
       `
      })
      toyCollection.innerHTML = toysHTML.join('')
    })

    toyFormContainer.addEventListener("submit", (event) =>{
      event.preventDefault()
      console.log(event.target.name)
      // Grab the inputs from form
      const toyName = event.target.name.value
      const toyImg = event.target.image.value

      fetch("http://localhost:3000/toys", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: toyName , 
          image: toyImg, 
          likes: 0
        })
      })
      .then(respon => respon.json())
      .then( newToy => {
        // fetch updated the DB 
        // Update the dom
        // convert the newToy from JSON to HTML in order to add to the DOM
        let newToyHTML = `
        <div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p>${newToy.likes}</p>
        <button data-id="${newToy.id}" class="like-btn">Like <3</button>
        </div>         
        `
        toyCollection.innerHTML += newToyHTML
        console.log(event.target.rest())
      })
    })

    toyCollection.addEventListener("click", (event) => {      
      if(event.target.className === "like-btn"){

        let currentLikes = parseInt(event.target.previousElementSibling.innerText)
        let newLikes = currentLikes + 1
        event.target.previousElementSibling.innerText = newLikes
        
        fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            likes: newLikes
          })
        })
      }
    })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
