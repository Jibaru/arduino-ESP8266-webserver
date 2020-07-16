// URLS
var urlActualizar = '';
var urlEstblecerVol = '';

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

    xhr.open('GET', urlActualizar, true);

    xhr.onload = function(){
        if(this.status === 200){
            const resp = JSON.parse(this.responseText);

            console.log(resp);
        }
    }

    xhr.send();
});

formVolumen.addEventListener('submit', function(e) {
    e.preventDefault();

    var params = 'vol=245';

    var xhr = new XMLHttpRequest();

    xhr.open('POST', urlEstblecerVol, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(this.status === 200){
            const resp = JSON.parse(this.responseText);

            console.log(resp);
        }
    }
    xhr.send(params);

})
