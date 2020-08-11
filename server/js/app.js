// URLS
var host = 'http://181.64.7.63:9090';
var urlActualizar = 'obtener-musica';
var urlEstblecerVol = 'cambiar-maximo';

// Objectos DOM
var btnActualizar = document.getElementById('btn-actualizar');
var badgeVolumen = document.getElementById('badge-volumen');
var rangVolumen = document.getElementById('input-volumen');
var formVolumen = document.getElementById('form-volumen');
var btnVolumen = document.getElementById('btn-volumen');
var vumetro = document.getElementById('vumetro');
var volEntradaSpan = document.getElementById('vol-entrada');
var volSalidaSpan = document.getElementById('vol-salida');

// Variables globales
var contador = 1;
var max = 30;

// Listeners
rangVolumen.addEventListener('change', function(e) {
    badgeVolumen.textContent = this.value;   
})

function actualizarVumetroVista(musica) {
    var segVar = max / 8;

    for(var i = 0; i < 8; i++) {
        if(musica > (i * segVar))
            vumetro.children[i].classList.add('grey', 'darken-1');
        else
            vumetro.children[i].classList.remove('grey', 'darken-1');
    }
}

function obtenerVolReducido(musica) {
    var porcRed = max / 1000;
    return musica * porcRed;
}

setInterval(function() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', host + '/' + urlActualizar, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(this.status === 200){
            var resp = JSON.parse(this.responseText);
            var volEntrada = Number(resp);
            var volSalida = obtenerVolReducido(volEntrada);

            volEntradaSpan.textContent = volEntrada;
            volSalidaSpan.textContent = volSalida;

            chartEntrada.data.datasets[0].data.push(volEntrada);
            chartEntrada.data.labels.push(contador);
            chartEntrada.update();

            chartSalida.data.datasets[0].data.push(volSalida);
            chartSalida.data.labels.push(contador);
            chartSalida.update();
            
            contador++;
            actualizarVumetroVista(volEntrada);
        }
    }

    xhr.send();

}, 1500);

btnVolumen.addEventListener('click', function(e) {
    e.preventDefault();
    console.log("submit")

    var valor = rangVolumen.value;

    var params = 'vol=' + valor;

    var xhr = new XMLHttpRequest();

    xhr.open('POST', host + '/' + urlEstblecerVol, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(this.status === 200){
            const resp = JSON.parse(this.responseText);
            console.log(resp);
            max = valor;
        }
    }
    xhr.send(params);

})
