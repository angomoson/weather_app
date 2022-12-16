const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const cloud = document.getElementById("cloud");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const errorPara = document.getElementById("error");

const showData = () => {
  let selectOption = document.getElementById("select").value;
  const getData = async (city) => {
    const URL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city.toLowerCase()}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;

    await fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        cityName.innerHTML = data.city.name;
        temperature.innerHTML = data.list[0].temp.day;
        cloud.innerHTML = data.list[0].weather[0].description;
        humidity.innerHTML = data.list[0].humidity;
        wind.innerHTML = data.list[0].speed;
        errorPara.innerHTML = "";
      })
      .catch((err) => {
        console.log("Fetch Error :-S", err);
      });
  };

  getData(selectOption);
};
showData();

let count = 0;

const showDataSearch = () => {
  const searchValue = document.getElementById("search-bar").value;
  const getData = async (city) => {
    const URL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city.toLowerCase()}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;

    if (searchValue) {
      await fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          cityName.innerHTML = data.city.name;
          temperature.innerHTML = data.list[0].temp.day;
          cloud.innerHTML = data.list[0].weather[0].description;
          humidity.innerHTML = data.list[0].humidity;
          wind.innerHTML = data.list[0].speed;
          errorPara.innerHTML = "";
        })
        .catch((err) => {
          errorPara.innerHTML = "city not found.";
          count += 1;
        });
    } else {
      count === 0
        ? (errorPara.innerHTML = "")
        : (errorPara.innerHTML = "Please enter a City name.");
    }
    count += 1;
  };

  getData(searchValue);
};
// showDataSearch();
