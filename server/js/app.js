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

// Variables globales
var contador = 1;

// Listeners
rangVolumen.addEventListener('change', function(e) {
    badgeVolumen.textContent = this.value;   
})

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
        }
    }

    xhr.send();

}, 1500);

btnActualizar.addEventListener('click', function(e) {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', host + '/' + urlActualizar, true);

    xhr.onload = function(){
        if(this.status === 200){
            var resp = JSON.parse(this.responseText);
            document.getElementById('vol-actual').textContent = resp;
            console.log(resp);
        }
    }

    xhr.send();
});

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
        }
    }
    xhr.send(params);

})
