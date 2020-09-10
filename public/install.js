let defferedPrompt;
window.addEventListener('beforeinstallprompt',(e)=>{
    e.preventDefault()
    defferedPrompt=e;
    document.querySelector('#installBtn').addEventListener('click',e=>{
        defferedPrompt.prompt();
        defferedPrompt.userChoice
        .then((choice)=>{
            if(choice.outcome==='accepted'){
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            defferedPrompt=null;
        })
    });
    document.querySelector('#installBanner').style.display='flex';
})