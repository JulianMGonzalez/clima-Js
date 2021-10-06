window.addEventListener('load', () => {
    let latitude
    let longitude

    const $searchForm = document.getElementById('search-form')
    const $searchName = document.getElementById('search-name')
    const $searchTemperatureValue = document.getElementById('search-temperature-value')

    let $temperatureValue = document.getElementById('temperature-value')
    let $temperatureDescription = document.getElementById('temperature-description')
    let $temperatureMax = document.getElementById('temperature-max')

    let $ubication = document.getElementById('ubication')
    let $iconWeather = document.getElementById('icon-animated')

    let $windSpeed = document.getElementById('wind-speed')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            latitude = position.coords.latitude
            longitude = position.coords.longitude

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=d1dac33d81e9ba928f2d9dfed8a510e7`

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    let temp = Math.round(data.main.temp)
                    $temperatureValue.textContent = `${temp} °C`
                    $temperatureMax.textContent = data.main.temp_max
                    $temperatureDescription.textContent = data.weather[0].description
                    $ubication.textContent = `${data.name}, ${data.sys.country}`
                    $windSpeed.textContent = data.wind.speed
                    $iconWeather.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)

                })
                .catch(error => {
                    console.log(error);
                })
        })
    }

    $searchForm.addEventListener('change', (e) => {
        const name = e.target.value
        if (name) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=d1dac33d81e9ba928f2d9dfed8a510e7`

            fetch(url)
                .then(data => data.json())
                .then(data => {
                    let temp = Math.round(data.main.temp)
                    $searchName.textContent = `${data.name}, ${data.sys.country}`
                    $searchTemperatureValue.textContent = `${temp} °C`
                })
        }else{
            $searchName.textContent = `Sin resultados :(`
            $searchTemperatureValue.textContent = ``
        }
    })
})