const express = require('express')
const https = require('https')
const  bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res)=>{
 res.sendFile(__dirname + "/index.html")
})



app.post("/", (req, res)=>{
    
const query = req.body.cityName
const apiKey ="5cecbe177745dc820b4f640779b0bda2"
const units = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apiKey + "&units=" + units + "&id=800&icon=01d"

https.get(url, (response)=>{
console.log(response.statusCode)


response.on("data", (data)=>{
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const desc = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imgURL = " http://openweathermap.org/img/wn/"+ icon +"@2x.png"
    res.write("<h1>The temperature in " +query+ " is " +temp+  " Degree Celcius </h1>")
    res.write("<p>The weather is " +desc+"</p>")
    res.write("<img src=" +imgURL+ ">")
    res.send()

})

})
})

app.use('/static', express.static('static'))




const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server running on ${PORT}`))