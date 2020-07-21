// URLS
var host = 'http://192.168.1.13';
var urlActualizar = 'obtener-musica';
var urlEstblecerVol = 'cambiar-maximo';

// Objectos DOM
var btnActualizar = document.getElementById('btn-actualizar');
var badgeVolumen = document.getElementById('badge-volumen');
var rangVolumen = document.getElementById('input-volumen');
var formVolumen = document.getElementById('form-volumen');

// Listeners
rangVolumen.addEventListener('change', function(e) {
    badgeVolumen.textContent = this.value;   
})

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

formVolumen.addEventListener('submit', function(e) {
    e.preventDefault();

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
