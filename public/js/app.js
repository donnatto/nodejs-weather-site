const weatherForm = document.querySelector('form')
const search = document.querySelector('#location')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', e => {
  e.preventDefault()
  const location = search.value
  const url = '/weather?address=' + location
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  fetchWeather(url)
})

fetchWeather = url => {
  fetch(url)
    .then(res => {
      res.json().then(data => {
        if (data.error) {
          messageOne.textContent = data.error
        } else {
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecast
        }
      })
    })
}
