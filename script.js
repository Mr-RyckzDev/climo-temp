const key = "182bbd1ed1c58d0ee10a0c2e01c2955b"

function formatarHora(timestamp){
  const data = new Date(timestamp * 1000)
  return data.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})
}

function calcularHoraLocal(timezone){
  const agora = new Date()
  const utc = agora.getTime() + (agora.getTimezoneOffset() * 60000)
  return new Date(utc + (timezone * 1000))
}

function mudarTema(ehDia){
  if(ehDia){
    document.body.classList.add("dia")
    document.body.classList.remove("noite")
  }else{
    document.body.classList.add("noite")
    document.body.classList.remove("dia")
  }
}

function infoDados(dados){

  const icone = dados.weather[0].icon

  const agoraCidade = calcularHoraLocal(dados.timezone)

  const nascer = new Date(dados.sys.sunrise * 1000)
  const por = new Date(dados.sys.sunset * 1000)

  const ehDia = agoraCidade >= nascer && agoraCidade < por

  let iconeFinal = icone
  if(!ehDia){
    iconeFinal = icone.replace("d","n")
  }

  document.querySelector(".nome-cidade").innerHTML =
    dados.name + ", " + dados.sys.country

  document.querySelector(".hora-local").innerHTML =
    agoraCidade.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})

  document.querySelector(".graus").innerHTML =
    Math.floor(dados.main.temp) + "°C"

  document.querySelector(".sensacao").innerHTML =
    "Sensação: " + Math.floor(dados.main.feels_like) + "°C"

  document.querySelector(".descricao").innerHTML =
    dados.weather[0].description

  document.querySelector(".umidade").innerHTML =
    dados.main.humidity + "%"

  document.querySelector(".vento").innerHTML =
    dados.wind.speed + " km/h"

  document.querySelector(".nuvens").innerHTML =
    dados.clouds.all + "%"

  document.querySelector(".minmax").innerHTML =
    Math.floor(dados.main.temp_min) + "° / " +
    Math.floor(dados.main.temp_max) + "°"

  document.querySelector(".nascer").innerHTML =
    formatarHora(dados.sys.sunrise)

  document.querySelector(".por").innerHTML =
    formatarHora(dados.sys.sunset)

  document.querySelector(".icone-clima").src =
    `https://openweathermap.org/img/wn/${iconeFinal}@2x.png`

  mudarTema(ehDia)
}

async function buscarTemp(cidade){
  const dados = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&units=metric&lang=pt_br`
  ).then(res => res.json())

  infoDados(dados)
}

function buscarCidade(){
  const cidade = document.querySelector(".input-buscar").value
  buscarTemp(cidade)
}