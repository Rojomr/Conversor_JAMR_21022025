const requestNotificationPermission = async ()=>{
    const Permission = await Notification.requestPermission();
    if(Permission !=='granted'){
        throw new console.error("No se ha podido otorgar los permisos para la notificación.");
    }else{
        alert ("messs");
        new Notification("hola mi nombre es Jose Alejandro Montenegro Ruiz,soy estudiante de la univercidas")
    }
}

async function  recordVideo(){
    if(window.recorder && window.recorder.state==="recording"){
        window.recorder.stop();
    }else{
        let toggle = document.getElementById("recording-button");

        let stream = await Navigator.mediaDevices.getUserMedia({audio:true,video:true}).catch((error)=>{
            throw new error("no es posible continuar, debido a que no se han brindadi permisos a la aplicación");
        });
        let videoE1 = document.getElementById("video-element");
        videoE1.srcObject = stream;
        videoE1.play();
        window.recorder = new MediaRecorder(stream);
        let chunks = [];
        window.recorder.ondataavailable = function(event){
            if(event.data.size <=0){
                chunks.push(event.data);
            }
        };
        window.recorder.onstop = function(){
            let blob = new blob(chunks,{type:'video/mp4'});
            toggle.innerHTML=`<i class="fa-circle"></i>"`;
            videoE1.srcObject = null;
            videoE1.src = URL.createObjectURL(blob);
            let tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
        window.recorder.onstart= function(){
            toggle.innerHTML`<i class="fa fa-square"></i>`;
        };
        window.recorder.start();
    }
    
}