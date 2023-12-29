const socket = io();
const $view = document.querySelector('.view');
const $form = document.querySelector('form');
const $msg = document.getElementById('msg');
let user;

function createDivResp (clas, qtd, text) {
    let element;
    let el;
    if (qtd === 1){
        element = document.createElement('div');
        element.classList.add(clas);
        element.innerHTML = text;
        el = element;
    }

    if (qtd === 2){

       const elementCont = document.createElement('div');
        element = document.createElement('div');
        element.classList.add(clas);
        elementCont.classList.add('relative');
        element.innerHTML = text;
        elementCont.appendChild(element);
       el = elementCont
    }
return el;
}

$form.addEventListener('submit', (e)=>{
    const obj = {};
    e.preventDefault();

    const $input = e.target.querySelectorAll('input, select');
    $input.forEach(el => {
        obj[el.name] = el.value; 
    });

    if(!obj.tlp || !obj.email) return;

    localStorage.setItem('user', JSON.stringify(obj));
    socket.emit("chat msg", obj);

    $view.appendChild(createDivResp('in', 1, `${obj.fullname} | ${obj.nacio} | ${obj.tlp} | ${obj.email}`));
    $input.forEach(el => {
        el.value = ''; 
    });
});

socket.on("chat msg", (resp) => {
    $view.appendChild(createDivResp('out', 2, resp))
}); 
socket.on("msg", (resp) => {
    $view.appendChild(createDivResp('out', 2, resp))
}); 


msg.addEventListener('keypress', (e) => {
    
    const user = JSON.parse(localStorage.getItem('user'))
    if(e.key === 'Enter') {
        const msg = {
            ...user,
            msg: e.target.value
        }

        socket.emit('msg', msg);
        e.target.value = ''
    }
})