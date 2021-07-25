let toggle = document.querySelector('#night')

var theme = window.localStorage.getItem('data-theme');
if (theme) document.documentElement.setAttribute('data-theme', theme);
toggle.checked = theme == 'dark' ? true : false;
setTheme(theme)

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        window.localStorage.setItem('data-theme', 'dark');
        setTheme('dark')
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        window.localStorage.setItem('data-theme', 'light');
        setTheme('light')
    }
})

function setTheme(theme) {
    if (theme == 'dark') {
        document.documentElement.style.setProperty('--text-color', 'hsl(0, 0%, 100%)')
        document.documentElement.style.setProperty('--background-color', 'hsl(207, 26%, 17%)')
        document.documentElement.style.setProperty('--element-color', 'hsl(209, 23%, 22%)')
        document.documentElement.style.setProperty('--placeholder-color', 'hsl(206, 8%, 61%)')
    } else {
        document.documentElement.style.setProperty('--text-color', 'hsl(200, 15%, 8%)')
        document.documentElement.style.setProperty('--background-color', 'hsl(0, 0%, 98%)')
        document.documentElement.style.setProperty('--element-color', 'hsl(0, 0%, 100%)')
        document.documentElement.style.setProperty('--placeholder-color', 'hsl(0, 0%, 52%)')
    }
}