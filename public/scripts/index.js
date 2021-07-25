

let setter = document.querySelector('.cards-container');
let header = document.querySelector('.header-content')
let filterText = document.querySelector('#filter-text');
let filterRegion = document.querySelector('#filter-region');
let countries = document.querySelectorAll('.card');
// let filterName = '.chlidren[0].children[1].children[0].innerHTML'
// back.style.width = getComputedStyle(setter).width
header.style.width = getComputedStyle(setter).width;

filterText.addEventListener('input', (event) => {
    console.log(filterRegion.value == ' ')
    if (filterRegion.value == ' ') {
        let search = event.target.value.toString().toLowerCase()
        countries.forEach(country => {
            let name = country.querySelector('h3').innerHTML.toString().toLowerCase()

            if (name.includes(search))
                country.style.display = 'block'
            // country.classList.add('text-filter')
            else {
                country.style.display = 'none'
                // country.classList.remove('text-filter')
            }
        })
    }
})

filterRegion.addEventListener('change', (event) => {
    let region = event.target.value.toString().toLowerCase()
    if (region == 'america') region = region.concat('s')

    countries.forEach(country => {
        let countryRegion = country.querySelector('.region').innerHTML.toString().toLowerCase();
        // console.log(region == countryRegion)
        if (region == countryRegion) {
            country.style.display = 'block'
            // country.classList.add('region-filter')
        } else {
            country.style.display = 'none'

        }
    })
})