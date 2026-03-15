const key = "182bbd1ed1c58d0ee10a0c2e01c2955b"

function infoDados(dados) {

const icone = dados.weather[0].icon

document.querySelector(".nome-cidade").innerHTML = dados.name
document.querySelector(".graus").innerHTML = Math.floor(dados.main.temp) + "°C"
document.querySelector(".descricao").innerHTML = dados.weather[0].description
document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%"

document.querySelector(".icone-clima").src =
`https://openweathermap.org/img/wn/${icone}@2x.png`

}

async function buscarTemp(cidade) {
  
const dados = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&units=metric&lang=pt_br`
).then(resposta => resposta.json())

infoDados(dados)

}

function buscarCidade(){

const cidade = document.querySelector(".input-buscar").value

buscarTemp(cidade)

}