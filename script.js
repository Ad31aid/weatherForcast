//GV
apiURL = 'https://api.openweathermap.org'
apiKey = 'd5c914a2718beb5359825a1ab58cb955'
searchHistory = []

//fetch api
async function getWeatherDataThenSetToLocalStorage(city){
        const response = await fetch(
                `${apiURL}/data/2.5/forecast?q=${city}&appid=${apiKey}`
        )
        const data = JSON.stringify(await response.json())
        //get json data
        localStorage.setItem(city, data)
        //storage data, cashing?
        searchHistory.push(city)
        populateTimeBlocks()
}

//test


//gonna be user input //////////////////////////////////
let textArea = document.querySelector('#userInput')
let userInput;
let submitButton = document.querySelector('#submit')
submitButton.addEventListener('click',btnPress)

function btnPress(){
        enterUserInput()   
        let cityName = document.getElementById('cityName')
        cityName.innerHTML = userInput.toUpperCase()
        let searchHistoryContainer = document.querySelector('#searchHistory')
        console.log(searchHistory)
        searchHistory.forEach((element)=>{
                let box = `<li class="list-group-item">${element}</li>`
                searchHistoryContainer.innerHTML = box
        })
}

let listOfCards = []
function populateTimeBlocks(){
        for(let i = 0; i < 40; i = i + 7){
                const testTime = new timeSlotnCityData(userInput, i)
              
                // let containerFor5dayPreview = document.querySelector('#forecastContainer')
                // containerFor5dayPreview.innerHTML += testTime.plate
                listOfCards.push(testTime)         
        }    
        console.log(listOfCards)
        let containerFor5dayPreview = document.querySelector('#forecastContainer')
        console.log(containerFor5dayPreview)
        listOfCards.forEach((element)=> {
                containerFor5dayPreview.innerHTML += element.plate})
}


function enterUserInput(){
        userInput = textArea.value
        console.log(userInput)
        getWeatherDataThenSetToLocalStorage(userInput)
        }       
//link city they enter to api call

const d = new Date()
console.log(d)
//get dateobject

class timeSlotnCityData{
        constructor(city, number){
                this.city = city
                this.number = number
                this.date = JSON.parse(localStorage.getItem(city)).list[number].dt_txt
                this.rawData = JSON.parse(localStorage.getItem(city)).list[number]
                this.data = {
                        temp : JSON.parse(localStorage.getItem(city)).list[number].main.feels_like,
                        humidity : JSON.parse(localStorage.getItem(city)).list[number].main.humidity,
                        weather : JSON.parse(localStorage.getItem(city)).list[number].weather[0].description,
                        weatherIcon : JSON.parse(localStorage.getItem(city)).list[number].weather[0].icon,
                }
                this.plate = `
                <div class="card col-lg-2" style="width: 10rem;">
                        <img src="https://openweathermap.org/img/wn/${this.data.weatherIcon}@2x.png
                        " class="card-img-top" alt="weather">
                        <div class="card-body">
                        <h5 class="card-title">${this.data.date}</h5>
                        <p class="card-text">
                                Tempture: ${this.data.temp}
                                Humidity: ${this.data.humidity}
                                Weather: ${this.data.weather}
                        </p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                </div>`
 
        }
}

