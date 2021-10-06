const express = require('express');
// const ejs = require('ejs')
const fetch = require('node-fetch');
const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    let response = await fetch('https://restcountries.com/v2/all?fields=flag;name;region;capital;population;alpha3Code')
    let countries = await response.json()
    res.render('index', { countries: countries })
})

fetch('https://restcountries.com/v2/all?fields=alpha3Code')
    .then((res) => res.json())
    .then(countries => {
        countries.forEach(country => {
            app.get(`/${country.alpha3Code}`, async (req, res) => {
                let response = await fetch(`https://restcountries.com/v2/alpha/${country.alpha3Code}`)
                let countryData = await response.json()
                let urls = []

                countryData.borders.forEach(async (border) => {
                    urls.push(`https://restcountries.com/v2/alpha/${border}?fields=alpha3Code;name`)
                })

                Promise.all(urls.map(url =>
                    fetch(url)
                        // .then(response => response)
                        .then(response => response.json())
                )).then(data => {
                    res.render('country', { country: countryData, borders: data })
                })
            });

        })
    })
// app.use(express.static(__dirname + '/'));
// app.engine('html', require('ejs').renderFile);

// app.get('/', (res, req) => {
// https.get("https://restcountries.com/v2/all?fields=alpha3Code", (res) => {
//     let body = '';
//     res.on('data', data => body += data)

//     res.on('end', () => {
//         let countryCodes = JSON.parse(body)
//         countryCodes.forEach(countryCode => {
//             app.get(`/${countryCode.alpha3Code}`, (req, res) => {
//                 // res.send(`Hello World from ${countryCode.alpha3Code}`)
//                 https.get(`https://restcountries.com/v2/alpha/${countryCode.alpha3Code}`, (httpRes) => {
//                     let body = '';
//                     httpRes.on('data', data => body += data)

//                     httpRes.on('end', () => {
//                         // console.log(JSON.parse(body))
//                         let cur = ''
//                         JSON.parse(body).currencies.forEach(currency => {
//                             cur += " " + currency.name
//                         });
//                         console.log(cur)
//                         res.render('country.html', { country: JSON.parse(body), currencies: cur })
//                     })
//                 })
//                 console.log(`This is the page for ${countryCode.alpha3Code}`)
//             })

//         });

//     })
// })
// })

app.listen(process.env.PORT || 5500, () => {
    console.log('Listening at http://localhost:5500')
})
