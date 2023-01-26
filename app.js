let cities = [
    {
        arabicName: "جدة",
        name: "Jeddah"
    },
    {
        arabicName: "الرياض",
        name: "Ar Riyāḑ"
    },
    {
        arabicName: "مكة المكرمة",
        name: "Makkah al Mukarramah"
    },
    {
        arabicName: "الشرقية",
        name: "Ash Sharqīyah"
    },
]

for (city of cities) {
    const content = `
        <option>${city.arabicName}</option>
    `
    document.getElementById("cities-select").innerHTML += content
}

document.getElementById("cities-select").addEventListener("change", function() {
    document.getElementById("city-name").innerHTML = this.value
    let cityName = ""
    for (let city of cities) {
        if (city.arabicName == this.value) {
            cityName = city.name
        }
    }
    getPrayersTimingOfCity(cityName)
})

function getPrayersTimingOfCity(cityName) {
    let params = {
        country: "SA",
        city: cityName,
    }
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: params
      })
      .then(function (response) {
        const timing = response.data.data.timings
        const readable = response.data.data.date.readable
        const weekday = response.data.data.date.hijri.weekday.ar
        const date = weekday + " " + readable
        fillTimeForPrayer("Fajr-time", timing.Fajr)
        fillTimeForPrayer("sunrise-time", timing.Sunrise)
        fillTimeForPrayer("Dhuhr-time", timing.Dhuhr)
        fillTimeForPrayer("asr-time", timing.Asr)
        fillTimeForPrayer("maghrib-time", timing.Maghrib)
        fillTimeForPrayer("isha-time", timing.Isha)
    
    
        document.getElementById("city-date").innerText = date
        console.log(readable + " " + weekday);
        console.log(timing);
      })
      .catch(function (error) {
        console.log(error);
      })
}

getPrayersTimingOfCity("Jeddah")

  function fillTimeForPrayer(id, time) {
    document.getElementById(id).innerText = time
  }