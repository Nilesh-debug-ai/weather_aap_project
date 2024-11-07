let weather = {
    apikey: "f5450408b13af0a1ec215c4d18eec4f6",
    fetchweather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apikey + "&units=metric")
        .then((response) => {
            if(!response.ok){
                alert("No Weather Found");
            }
            return response.json();
        })
        .then((data) => this.displayweather(data));
    },

    displayweather: function(data){
        console.log(data)
        const {name} = data;
        const {temp, humidity} = data.main;
        const {icon, description} = data.weather[0];
        const {speed} = data.wind;

        document.querySelector(".city").innerText = "Weather in "+ name;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".weather_icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = "Description: " + description;
        document.querySelector(".humidity").innerText = "Humidity: "+ humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: "+ speed+ "km/h";


        var apiUrl = "https://pixabay.com/api/?key=45977150-2d9528ecf593e6b5287475c9b&q="+ name+"&image_type=photo";

        fetch(apiUrl)
        .then(response => {
            if(!response.ok){
                alert("No Response");
            }
            return response.json();
        })
        .then((data)=> {
            console.log(data);

            const imageUrl = data.hits[0].largeImageURL;
            document.body.style.backgroundImage = "url("+imageUrl+ ")" 
         });
    },

    search: function(){
        this.fetchweather(document.querySelector(".search-bar").value)
    },
};
document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchweather("kolkata");


//Getting the current location of the user

const button = document.getElementById('get-location');
const user_box = document.getElementById('user');

function gotlocation(position){
    console.log(position);
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    use_cord(lat,long);

}
function failedToGet(){
    console.log("There was some issue");
}
button.addEventListener('click', async () => {
    button.remove();
    user_box.remove();
    navigator.geolocation.getCurrentPosition(gotlocation,failedToGet)
});
function use_cord(lat,long){
    api = "f5450408b13af0a1ec215c4d18eec4f6",
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid="+api+ "&units=metric")
    .then(response => response.json())
    .then(data => {
        console.log("weather data: ",data);

    const {name} = data;
    const {temp, humidity} = data.main;
    const {icon, description} = data.weather[0];
    const {speed} = data.wind; 

    document.querySelector(".user_city").innerText = "Weather in "+ name;
    document.querySelector(".user_temp").innerText = temp + "°C";
    document.querySelector(".user_weather_icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".user_des").innerText = "Description: " + description;
    document.querySelector(".user_humi").innerText = "Humidity: "+ humidity + "%";
    document.querySelector(".user_wind").innerText = "Wind Speed: "+ speed+ "km/h";
})
.catch(error => {
    console.error("Error fetching weather: ",error);
});
}