// URLS
var host = 'https://181.64.7.63:9090';
var urlActualizar = 'obtener-musica';
var urlEstblecerVol = 'cambiar-maximo';

// Objectos DOM
var btnActualizar = document.getElementById('btn-actualizar');
var badgeVolumen = document.getElementById('badge-volumen');
var rangVolumen = document.getElementById('input-volumen');
var formVolumen = document.getElementById('form-volumen');
var btnVolumen = document.getElementById('btn-volumen');
var vumetro = document.getElementById('vumetro');

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

setInterval(function() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', host + '/' + urlActualizar, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(this.status === 200){
            var resp = JSON.parse(this.responseText);
            document.getElementById('vol-actual').textContent = resp;

            var musc = Number(resp);

            /*for(var i = 0; i< 8; i++) {
                chart.data.datasets[0].data[0] = musc * (i + 1);
            }*/
            chart.data.datasets[0].data.push(musc);
            chart.data.labels.push(contador);
            contador++;
            chart.update();

            actualizarVumetroVista(musc);
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
