let activeMenuItem = null

//Get all the info
fetch('http://localhost:3000/ramens')
.then(res => res.json())
.then(imgArray => renderImgs(imgArray))

//Render each image
function renderImgs(imgArray){
    imgArray.forEach(ramenImage => createImage(ramenImage));
    updateDisplay(imgArray[0]) /*shows first menu item on page load */
};


//create <img> tag for each ramen
function createImage(ramenImage){
    const menu = document.getElementById('ramen-menu');
    const ramenImg = document.createElement('img');
    ramenImg.src = ramenImage.image;
    menu.appendChild(ramenImg);
    
    ramenImg.addEventListener('click', (e) =>{
        updateDisplay(ramenImage)
    })
};
// console.log(document.getElementsByClassName('name')[0])


//Update displayed info when user clicks on ramen image
function updateDisplay(menuItem) {
    const mainImage = document.getElementsByClassName('detail-image')[0]
    const ramenName = document.getElementsByClassName('name')[0]
    const restaurantName = document.getElementsByClassName('restaurant')[0]
    const itemRating = document.getElementById('rating-display')
    const itemComment = document.getElementById('comment-display')

    mainImage.src = menuItem.image
    ramenName.textContent = menuItem.name
    restaurantName.textContent = menuItem.restaurant

    // console.log(typeof(menuItem.rating))
    // console.log(itemRating)
    // console.log(typeof(menuItem.comment))

    itemRating.textContent = menuItem.rating
    itemComment.textContent = menuItem.comment

    activeMenuItem = menuItem

}



//Create new menu item
const createButton = document.getElementsByTagName('input')[4]
createButton.addEventListener('click', (e) => {
    createRamen()  
    e.preventDefault()
})

//Edit ramen
const editButton = document.getElementsByTagName('input')[6]
editButton.addEventListener('click', (e) => {
    e.preventDefault()
    editRamen()  
})


function createRamen(){
    const form = document.getElementById('new-ramen')
    const newName = document.getElementById('new-name')
    const newRestaurant = document.getElementById('new-restaurant')
    const newImage = document.getElementById('new-image')
    const newRating = document.getElementById('new-rating')   
    const newComment = document.getElementById('new-comment')

    const newRamenObj ={
      name: newName.value,
      restaurant: newRestaurant.value,
      image: newImage.value,
      rating: newRating.value,
      comment: newComment.value,
    }

    createImage(newRamenObj)
    form.reset()
    
    
postNewRamen(`http://localhost:3000/ramens`, newRamenObj)

    
//    fetch(`http://localhost:3000/ramens`, {
//             method:"POST",
//             header: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify(newRamenObj)
//         })
//     }
}



//Edit rating and comment
function editRamen (){
    const form = document.getElementById('edit-ramen')
    const editRating = form.querySelector('#new-rating')
    const editComment = form.querySelector('#new-comment')

    activeMenuItem.rating = editRating.value,
    activeMenuItem.comment = editComment.value,
    console.log(editRating)
        
    patchRamen(`http://localhost:3000/ramens/${activeMenuItem.id}`, activeMenuItem)
    .then(res => res.json())
    .then(updatedMenuItem => updateDisplay(updatedMenuItem))
    form.reset() 
}



const patchRamen = (url, body) => {
    const configurationObj = {
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        }
        return fetch(url,configurationObj) 
    }



const postNewRamen = (url, body) => {
    const configurationObj = {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        }
        return fetch(url,configurationObj) 
    }
    
    /*
    
    -On load:
    -All ramen images should appear in the ramen-menu div - complete
    
    - User should be able to :
    --Click on image - complete
    --- Add event listener to image - complete
    --See all the details about the ramen clicked - use #ramen-detail div - complete
    --Use the new-ramen form to add a new item to the #ramen-menu div - complete
    --Does not have to persist - complete


    -Stetch goals
        -- Page should display first menu item on load - complete
        -- Allow rating and comment to be updated. Does not have to persist
            --- EXTRA: Make it persist
        -- Delete a ramen from the menu

    */

