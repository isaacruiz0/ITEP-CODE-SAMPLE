// Elements from the HTML file that I need to manipulate
const fetchButton = document.querySelector('.generateName')
const babyName = document.querySelector('.babyName')
const nameContainer = document.querySelector('.nameContainer')
const main = document.querySelector('main')
const nameWrapper = document.querySelector('.nameWrapper')
const arrayNames = document.querySelector('.arrayNames')

// This is the api we will be sending a fetch request to in order to generate a random name
apiUrl = "https://randomuser.me/api"

// This will be the notification element that appears when a user saves a name
const notification = document.createElement("p")
notification.classList.add("notification")
notification.innerHTML = "Saved!"
notification.style.opacity = 0

// This symbol will be used to let the user know they can save names
const saveBabyNameSymbol = document.createElement("i")
saveBabyNameSymbol.classList.add("fa-regular")
saveBabyNameSymbol.classList.add("fa-bookmark")

// I declared the nameResponse variable outside of the getRandomName's function scope so that I could use this variable in other functions
let nameResponse

// This function will be used to fade in and fade out elements, I created this function so that I do not repeat myself with the animate method
const fadeAnimation = (element, duration, start, end) =>{
    // With the use of the animate method I can set the duration of change for certain properties
    element.animate({
        opacity: [start, end],
    }, duration)
    // This prevents flickering from occuring when using the animate method
    element.style.opacity = end
}

const getRandomName = async() =>{
    
    // This will wait for the fetch request to return the api's response
    let response = await fetch(apiUrl)
    // This converts the response into json which will allow us to extract data properly
    let data = await response.json()
    // This accessing the correct array index and object key for returning the random name
    nameResponse = await data.results[0].name.first
    // This is setting the babyName's value to the nameResponse value 
    babyName.innerHTML = nameResponse

    // This uses the animate method to make a transition from 0 opacity to 1 opacity with a duration of 250ms for each name generated
    fadeAnimation(babyName, 250, 0, 1)
    // This appends the save symbol to the naem container so that the user knows they can save the name
    nameContainer.append(saveBabyNameSymbol)
   // This uses the animate method to make a transition from 0 opacity to 1 opacity with a duration of 400ms for the save symbol
   fadeAnimation(saveBabyNameSymbol, 400, 0, 1)
}


const saveNotification = () =>{
    // When the user saves a name it will append it the notification to nameWrapper
    nameWrapper.append(notification)
    fadeAnimation(notification, 500, 0, 1)
    setTimeout(()=>fadeAnimation(notification, 500, 1, 0), 1000)
    // This makes the saveBabyNameSymbol background color solid and then makes it transparent after .5s
    saveBabyNameSymbol.classList.add("fa-solid")
    setTimeout(()=>saveBabyNameSymbol.classList.remove("fa-solid"), 500)

    // This creates an element with the value of the nameResponse variable and then appends to the DOM
    let savedBabyName = document.createElement("h3")
    savedBabyName.innerHTML = nameResponse
    arrayNames.append(savedBabyName)
}

// Every time the fetchButton is clicked it will run the getRandomName function
fetchButton.addEventListener("click", getRandomName)

// When the user clicks on the name they will be notified that it was saved
nameContainer.addEventListener("click", saveNotification)


