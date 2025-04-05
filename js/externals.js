const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
        throw new Error("No se ha podido otorgar los permisos para la notificación.");
    } else {
        alert("Permiso concedido");
        new Notification("Hola, mi nombre es Jose Alejandro Montenegro Ruiz. Soy estudiante de la universidad.");
    }
};

async function recordVideo() {
    if (window.recorder && window.recorder.state === "recording") {
        window.recorder.stop();
    } else {
        const toggle = document.getElementById("recording-button");

        let stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true }).catch((error) => {
            throw new Error("No es posible continuar, debido a que no se han brindado permisos a la aplicación.");
        });

        const videoEl = document.getElementById("video-element");
        videoEl.srcObject = stream;
        videoEl.play();

        const chunks = [];
        window.recorder = new MediaRecorder(stream);

        window.recorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        window.recorder.onstop = function () {
            const blob = new Blob(chunks, { type: 'video/mp4' });
            toggle.innerHTML = `<i class="fa fa-circle"></i>`;
            videoEl.srcObject = null;
            videoEl.src = URL.createObjectURL(blob);
            videoEl.controls = true;

            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        };

        window.recorder.onstart = function () {
            toggle.innerHTML = `<i class="fa fa-square"></i>`;
        };

        window.recorder.start();
    }
}


function geolocalizacion(){
    if(navigator.permissions && navigator.permissions.query){
        navigator.permissions.query({name:'geolocation'}).then(function(result){
            const permission = result.state;
            if(permission === 'granted' || permission === 'prompt'){
            _onGetCurrentLocation();
            }
        });
    }else if(navigator.geolocation){
        _onGetCurrentLocation();
    }

}
function _onGetCurrentLocation(){
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge:0
    };
    navigator.geolocation.getCurrentPosition(function(Position){
        const marker = {
            lat : Position.coords.latitude,
            lng : Position.coords.longitude
        };
        let enlace = document.getElementById("ir_mapa");
        enlace.href = `https://maps.google.com/?q=${marker.lat},${marker.lng}`;
        enlace.text = "IR AL MAPA";
        enlace.traget = "_blank";

    },function(error){
        console.log(error);
    },options);
    }
const init = () =>{
    const tieneSoporteUserMedia = () =>
        !!(navegador.mediaDevices.getUserMedia);
    if(typeof MediaRecorder === "undefined" || !tieneSoporteUserMedia()){
        return alert("Su navegador no cumple con los requisitos, por favor actualice a un navegador mas reciente");
    }

    const $ListaDeDispositivos = document.querySelector("#ListaDeDispositvo"),
          $duracion = document.querySelector("#duracion"),
          $btnComenzarGrabacion = document.querySelector("#btnComenzarGrabacion"),
          $btnDetenerGravacion = document.querySelector("#btnDetenerGravacion");
          
          
const limpiarSelect = ()=>{
    for(let x = $ListaDeDispositivos.options.length-1; x >= 0; x--){
        $ListaDeDispositivos.options.remove(x);
    }
} 


const segundosATiempo = numeroDeSegundos => {
    let horas = Math.floor(numeroDeSegundos/60/60);
    numeroDeSegundos-= horas *60*60;
    let minutos = Math.floor(numeroDeSegundos/60);
    numeroDeSegundos-= minutos*60;

    numeroDeSegundos = parseInt(numeroDeSegundos);
    if(horas <10) horas ="0"+horas;
    if(minutos<10)minutos ="0"+minutos;
    if(numeroDeSegundos<10) numeroDeSegundos ="0"+numeroDeSegundos;

    return `${horas}:${minutos}:${numeroDeSegundos}`;
};
let tiempoInicio,MediaRecorder,idIntervalo;
const refrescar =()=>{
    $duracion.textContent =segundosDevices(),then(dispositivos =>{
        limpiarSelect();
        dispositivos.forEach((dispositivos,indice)=>{
            if(dispositivos.kind ==="audioinput"){
                const $opcion = document.createElement("option");
                $opcion.text = dispositivos.label || `Dispositivo ${indice+1}`;
                $opcion.value = dispositivos.deviceID;
                $ListaDeDispositivos.appendChild($opcion);
            }
        })
    })
};
const comenzarAContar = ()=>{
    tiempoInicio= Date.now();
    idIntervalo = setInterval(refrescar,500);
};
const comenzarAGrabar =()=>{
    if(!$ListaDeDispositivos.options.length) return alert("no hay dispositivos");
    if(MediaRecorder)
    )

}