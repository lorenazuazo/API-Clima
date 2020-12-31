const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load',() =>{
    formulario.addEventListener('submit',buscarClima)
});

function buscarClima(e){
    e.preventDefault();

    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        mostrarError('Todos los campos son obligatorios');
        return
    }

    consultarApi(ciudad,pais);
}

function consultarApi(ciudad,pais){
    const apiId = '5aa5c94fcacbc83905f2748aaee52caf';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais},}&appid=${apiId}`;

    spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            limpiarHTML();
            if(data.cod === '404'){
                mostrarError('Ciudad no encontrada');
                return
            }
            //imprime la respuesta en html
            mostrarClima(data);
        })
}

function mostrarClima(data){
    
    const { name, main: { temp,temp_max,temp_min }} = data;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const ciudad = document.createElement('p');
    ciudad.textContent = `Clima en ${name}`;
    ciudad.className = 'font-bold text-2xl';

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.className = 'font-bold text-6xl';

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451;`;
    tempMin.className = 'text-xl';

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.className = 'text-center text-white';
    resultadoDiv.appendChild(ciudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMin);
    resultadoDiv.appendChild(tempMax);
    

    resultado.appendChild(resultadoDiv);

}

const kelvinACentigrados = temp => parseInt(temp - 273.15);


function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');
   if(!alerta){
       const alerta = document.createElement('div');
       alerta.className = 'bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto mt-6 text-center';
       alerta.innerHTML = `
           <strong class="font-bold">Error!</strong>
           <span class="block">${mensaje}</span>
       `
   
       container.appendChild(alerta);

       setTimeout(() => {
           alerta.remove();
       }, 3000);
   }
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function spinner(){
    limpiarHTML();
    
    const divSpinner = document.createElement('div');
    divSpinner.className = 'sk-fading-circle';

    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}