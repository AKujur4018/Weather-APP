//all DOM varialbes
const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");

const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

let target = "delhi";

//function to fetch data from api and call update funciton
const fetchData = async (target)=> {
    try{
        const url = `https://api.weatherapi.com/v1/current.json?key=521c9c9e111f4461ab870738222707&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();

    //destructure of API - take location and temp(By this we can directly use api names)
    const {
        current: { temp_c,  condition: { text, icon}  },
        location: { name , localtime},
    } = data;

    updateField(temp_c, name, icon, text, localtime);
    }
    catch {
        alert("Location not found");
    }
};

//function to update HTML
function updateField(temperature, city, emoji, text, time) {
    temperatureField.innerText = temperature;
    cityField.innerText = city;

    //split function break string in array based on string
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];

    const exactDay = getDayName(new Date(exactDate).getDay());

    emojiField.src = emoji;
    weatherField.innerText = text;
    dateField.innerText = `${exactTime} - ${exactDay} ${exactDate}`;
}

//function to day(num) to day(string)
function getDayName(num) {
    switch (num) {
        case 0 :
            return "Sunday";

        case 1 :
            return "Monday";
        
        case 2 :
            return "Tuesday";
        
        case 3 :
            return "Wednesday";
       
        case 4 :
            return "Thursday";
        
        case 5 :
            return "Friday";
        
        case 6 :
            return "Saturday";

        default:
            return "Not Defined";
    }
}

//function which change target value based on input and call fetchData
const search = (e)=> {
    e.preventDefault();

    target = searchField.value ;

    fetchData(target);
};

//event occur when form get submitted
form.addEventListener("submit", search);

//For Default value
fetchData(target);