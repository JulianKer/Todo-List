let mensajeWarning =  `<section class="warning-no-tasks" id="warning-no-tasks">
                    <img src="icon/fingerUp.svg" alt="finger-up" class="img-finger">
                    <h3 class="title-warning">¡No hay tareas pendientes!</h3>
                </section>`;

let ancla = `<a href="#arriba" id="a-ancla"><img src="icon/flecha-up.svg" alt="Ir arriba" title="Ir arriba"></a>`;
let sectionAncla = document.getElementById("ancla");

// new task --------------------------
let inputDescripcion = document.getElementById("description")
let selectEstadoNuevaTask = document.getElementById("status");
let boton = document.getElementById("boton");
//------------------------------------

// filter ----------------------------
let selectFiltroPorEstados = document.getElementById("selector-filtro-estados")
let selectFecha = document.getElementById("selector-fecha");
let estadoDelSelector;
let estadoDelSelectorFechas;
let arrayAMostrar = [];
//------------------------------------

// all task --------------------------
let contenedorAllTask = document.getElementById("all-task");
let arrayDeTasks = [];
let botonesEliminarTask;
//------------------------------------

// task -----------------------------
let selectoresTasks;
let estadoDeLaTaskIndividual = "";
// let idDeLaTask = "";
//------------------------------------


// ------- variables que uso en las funciones ---------
let id = 0;
let arrayFiltradoStatusPorEmpezar = [];
let arrayFiltradoStatusEnProceso = [];
let arrayFiltradoStatusTerminadas = [];

let estadoFiltroTodas = "filtro-todas";
let estadoFiltroPorEmpezar = "filtro-por-empezar";
let estadoFiltroEnProceso = "filtro-en-proceso";
let estadoFiltroTerminadas = "filtro-terminadas";

let statusPorEmpezar = "status-por-empezar";
let statusEnProceso = "status-en-proceso";
let statusTerminada = "status-terminada";
//----------------------------------------------------


// ------------------------------------------- AGREGAR UNA NUEVA TASK ------------------------------------------------------------
boton.addEventListener("click", ()=>{
    
    if (inputDescripcion.value === "" || inputDescripcion.value === " ") {
        inputDescripcion.focus();
    }else{
        eliminarWarning(); // elimino el cartel de que no hay tareas pendientes
        contenedorAllTask.innerHTML = ""; // vacio el contenedor de las tareas asi NO se duplican

        let descripcion = inputDescripcion.value; // agarro la descripcion
        let estado = selectEstadoNuevaTask.value;// agarro el estado

        let nuevaTarea = {   // creo la task
            id: "tarea-" + obtenerSiguienteId(), // obtengo el siguiente id
            descripcion: descripcion,
            estado: estado
        };

        //pongo que el filtro sea en "todas" asi se muestran todas primero por si es que estaba en alguna otra opcion
        selectFiltroPorEstados.value = estadoFiltroTodas  // selectFiltroPorEstados.value = "filtro-todas"; 

        arrayDeTasks.push(nuevaTarea); // meto la task al array
        mostrarArray(arrayDeTasks); // muestro el array (en el html)

        inputDescripcion.value = ""; //vacío el input
        inputDescripcion.focus();  // le sigo haciendo focus


        //filtro todas las task por separado asi apenas se crea cada task, segun su estado ya pertenece a un array
        filtrarStatusPorEmpezar();
        filtrarStatusEnProceso();
        filtrarStatusTerminadas();
    }
})
// -----------------------------------------------------------------------------------------------------------------------------



//--------------------------------------------- SELECTOR DE FILTRO POR ESTADOS -------------------------------------------------
selectFiltroPorEstados.addEventListener("change", ()=>{ 

    estadoDelSelector = selectFiltroPorEstados.value;
    estadoDelSelectorFechas = selectFecha.value;
    // 2---- y bueno, faltaria lo de el otro filtro que es el mas reciente

    contenedorAllTask.innerHTML = ""; // vacio el contenedor de las tareas asi NO se duplican

    if (arrayDeTasks.length != 0) {

        switch (estadoDelSelector) {
            case estadoFiltroTodas:

                switch (estadoDelSelectorFechas) {
                    case "ordenar-recientemente":
                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = arrayDeTasks.slice().sort(comparadorAscendente)
                        break;
                    case "ordenar-antiguamente":
                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = arrayDeTasks.slice().sort(comparadorDescendente)
                        break;
                }
                mostrarArray(arrayAMostrar); // muestro el array que filtré
                break;
    
            case estadoFiltroPorEmpezar:
                switch (estadoDelSelectorFechas) {
                    case "ordenar-recientemente":
                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = filtrarStatusPorEmpezar().slice().sort(comparadorAscendente)
                        break;
                    case "ordenar-antiguamente":
                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = filtrarStatusPorEmpezar().slice().sort(comparadorDescendente)
                        break;
                }
                mostrarArray(arrayAMostrar);// muestro el array que filtré
                break;
    
            case estadoFiltroEnProceso:
                switch (estadoDelSelectorFechas) {
                    case "ordenar-recientemente":
                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = filtrarStatusEnProceso().slice().sort(comparadorAscendente)
                        break;
                    case "ordenar-antiguamente":
                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = filtrarStatusEnProceso().slice().sort(comparadorDescendente)
                        break;
                }
                mostrarArray(arrayAMostrar);// muestro el array que filtré
                break;
    
            case estadoFiltroTerminadas:
                switch (estadoDelSelectorFechas) {
                    case "ordenar-recientemente":
                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = filtrarStatusTerminadas().slice().sort(comparadorAscendente)
                        break;
                    case "ordenar-antiguamente":
                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = filtrarStatusTerminadas().slice().sort(comparadorDescendente)
                        break;
                }
                mostrarArray(arrayAMostrar);// muestro el array que filtré
                break;
        }

        // aca me fijo que si despues de TOOODOS los filtros, si el contenedor que estoy mostrando quedo vacío, muestro el warning
        if (contenedorAllTask.innerHTML.trim() === "") {
            mostrarWarning();
        }
    }else{
        eliminarWarning();
        mostrarWarning();
    }
})
// -----------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------- SELECTOR DE FILTRO POR AGREGADO -------------------------------------------------
selectFecha.addEventListener("change", ()=>{
    estadoDelSelector = selectFiltroPorEstados.value;
    estadoDelSelectorFechas = selectFecha.value;

    contenedorAllTask.innerHTML = ""; // vacio el contenedor de las tareas asi NO se duplican

    if (arrayDeTasks.length != 0) {

        switch (estadoDelSelector) {
            case estadoFiltroTodas:
                switch (estadoDelSelectorFechas) {
                    case "ordenar-recientemente":

                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = arrayDeTasks.slice().sort(comparadorAscendente)
                        break;
                    case "ordenar-antiguamente":

                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = arrayDeTasks.slice().sort(comparadorDescendente)
                        break;
                }
                mostrarArray(arrayAMostrar); // muestro el array que filtré
                break;
    
            case estadoFiltroPorEmpezar:
                switch (estadoDelSelectorFechas) {
                    case "ordenar-recientemente":
                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = filtrarStatusPorEmpezar().slice().sort(comparadorAscendente)
                        break;
                    case "ordenar-antiguamente":
                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = filtrarStatusPorEmpezar().slice().sort(comparadorDescendente)
                        break;
                }
                mostrarArray(arrayAMostrar);// muestro el array que filtré
                break;
    
            case estadoFiltroEnProceso:
                switch (estadoDelSelectorFechas) {
                    case "ordenar-recientemente":
                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = filtrarStatusEnProceso().slice().sort(comparadorAscendente)
                        break;
                    case "ordenar-antiguamente":
                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = filtrarStatusEnProceso().slice().sort(comparadorDescendente)
                        break;
                }
                mostrarArray(arrayAMostrar);// muestro el array que filtré
                break;
    
            case estadoFiltroTerminadas:
                switch (estadoDelSelectorFechas) {
                    case "ordenar-recientemente":
                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = filtrarStatusTerminadas().slice().sort(comparadorAscendente)
                        break;
                    case "ordenar-antiguamente":
                        // le paso el comparador SIN los parentesis porque no quiero que se ejecute primero esa funcion.
                        arrayAMostrar = filtrarStatusTerminadas().slice().sort(comparadorDescendente)
                        break;
                }
                mostrarArray(arrayAMostrar);// muestro el array que filtré
                break;
        }

        // aca me fijo que si despues de TOOODOS los filtros, si el contenedor que estoy mostrando quedo vacío, muestro el warning
        if (contenedorAllTask.innerHTML.trim() === "") {
            mostrarWarning();
        }
    }else{
        eliminarWarning();
        mostrarWarning();
    }
})
// -----------------------------------------------------------------------------------------------------------------------------

// ---------------------- FUNCIONES ------------------------------
function mostrarArray(arrayRecibido) { 
    saberSiHaceFaltaElAncla(arrayRecibido);

    arrayRecibido.forEach(elementoDelArray =>{ // por cada task,
        switch (elementoDelArray.estado) {   // veo segun su estado para poner el "selected"
            case "status-por-empezar":
                contenedorAllTask.innerHTML += `
                                    <section class="task" id="` + elementoDelArray.id + `">
                                        <div class="first-row">
                                            <h4>Hoy</h4>
                                            <img src="icon/cerrar.png" alt="Eliminar" title="Eliminar" class="img-cruz" id="`+ elementoDelArray.id +`">
                                        </div>
                                        <div class="second-row">
                                            <p class="texto-descriptivo">`+ elementoDelArray.descripcion + `</p>
                                            <div class="selector-estado-de-tarea">
                                                <label for="estado-de-tarea">Estado:</label>
                                                <select name="estado-de-tarea" id="` + elementoDelArray.id + `" class="estado-de-tarea">
                                                    <option value="estado-por-empezar" selected>Por empezar</option>
                                                    <option value="estado-en-proceso">En proceso</option>
                                                    <option value="estado-terminada">Terminada</option>
                                                </select>
                                            </div>
                                        </div>
                                    </section>`
                    break;
                case "status-en-proceso":
                    contenedorAllTask.innerHTML += `
                                        <section class="task" id="` + elementoDelArray.id + `">
                                            <div class="first-row">
                                                <h4>Hoy</h4>
                                                <img src="icon/cerrar.png" alt="Eliminar" title="Eliminar" class="img-cruz" id="`+ elementoDelArray.id +`">
                                            </div>
                                            <div class="second-row">
                                                <p class="texto-descriptivo">`+ elementoDelArray.descripcion + `</p>
                                                <div class="selector-estado-de-tarea">
                                                    <label for="estado-de-tarea">Estado:</label>
                                                    <select name="estado-de-tarea" id="` + elementoDelArray.id + `" class="estado-de-tarea">
                                                        <option value="estado-por-empezar">Por empezar</option>
                                                        <option value="estado-en-proceso" selected>En proceso</option>
                                                        <option value="estado-terminada">Terminada</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </section>`
                        break;
                case "status-terminada":
                    contenedorAllTask.innerHTML += `
                                        <section class="task" id="` + elementoDelArray.id + `">
                                            <div class="first-row">
                                                <h4>Hoy</h4>
                                                <img src="icon/cerrar.png" alt="Eliminar" title="Eliminar" class="img-cruz" id="`+ elementoDelArray.id +`">
                                            </div>
                                            <div class="second-row">
                                                <p class="texto-descriptivo letra-tachada">`+ elementoDelArray.descripcion + `</p>
                                                <div class="selector-estado-de-tarea">
                                                    <label for="estado-de-tarea">Estado:</label>
                                                    <select name="estado-de-tarea" id="` + elementoDelArray.id + `" class="estado-de-tarea">
                                                        <option value="estado-por-empezar">Por empezar</option>
                                                        <option value="estado-en-proceso">En proceso</option>
                                                        <option value="estado-terminada" selected>Terminada</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </section>`
                        break;
                }
            })


// ------- ESCUCHADOR DE LOS BOTONES DE ELIMINNAR LA TASK ------------------------------------------------------
    botonesEliminarTask = document.querySelectorAll(".img-cruz")

    botonesEliminarTask.forEach(element => {
        element.addEventListener("click", ()=>{

            let idDelElemento = element.id;

            arrayRecibido.forEach(task=>{

                if (task.id === idDelElemento) {
                    let taskAEliminar = document.getElementById(idDelElemento);

                    if (taskAEliminar != null) {
                        contenedorAllTask.removeChild(taskAEliminar); // lo remuevo del html
                        let indexAEliminar = arrayRecibido.findIndex(element => element.id === idDelElemento) // busco el index del elemento q quiero eliminar
                        arrayRecibido.splice(indexAEliminar,1) // lo remuevo del array

                        // aca elimino tambien la task del array original asi cuando filtramos de vuelta, no aparece
                        indexAEliminar = arrayDeTasks.findIndex(element => element.id === idDelElemento)
                        arrayDeTasks.splice(indexAEliminar,1);

                        //--- si el array filtrado quedó vacío, muestro el warning-----
                        if (arrayRecibido.length === 0) {                            //
                            mostrarWarning()                                         //
                        }                                                            //
                        // ------------------------------------------------------------
                        saberSiHaceFaltaElAncla(arrayRecibido);
                    }
                }
            })
        })
    });
    // -----------------------------------------------------------------------------------------------------------



    // --------------------------ESCUCHADOR DE LOS SELECTORES DE CADA TASK ---------------------------------------

    // primero agarro todos los selectores de las task q hay
    selectoresTasks = document.querySelectorAll(".estado-de-tarea")

    // por cada selector, le agrego un escuchador de cambio
    selectoresTasks.forEach(selector => {
    
    // cuando cambie el selector
    selector.addEventListener("change", ()=>{
        // veo a que cambio
        let nuevoEstado = selector.value;

        // busco el contenedor mas cercano a este selector y obtengo el id de ese contenedor
        let sectionDeLaTask = selector.closest(".task")
        let idDeLaTask = sectionDeLaTask.id;

        // le cambio el estado a la task pasandole a QUÉ task se lo quiero cambiar y QUÉ estado ponerle
        cambiarEstadoDeEstaTask(idDeLaTask, nuevoEstado);

        // obtengo el parrafo de ESA task para ver si le tengo que tachar la letra segun sea tarea terminada o no
        let parrafoDescriptivoDeLaTask = sectionDeLaTask.querySelector(".texto-descriptivo")

        if (nuevoEstado === "estado-terminada") {
            parrafoDescriptivoDeLaTask.classList.add("letra-tachada")
        }else{
            parrafoDescriptivoDeLaTask.classList.remove("letra-tachada")
        }
        
        // filtro el array original con cada estado para que se actualizen y la task que cambio de estado
        // esté en el array que le corresponde (ademas de estar en el original "arrayDeTasks")
        filtrarStatusPorEmpezar();
        filtrarStatusEnProceso();
        filtrarStatusTerminadas();

        // segun el filtro que este puesto a la hora de haber cambiado el estado, hago lo siguiente:
        switch (selectFiltroPorEstados.value) {

            // si el filtro esta en "todas", veo el array original donde estan todas
            case estadoFiltroTodas:
                // si esta vacio, muestro el warning
                if (arrayDeTasks.length === 0) {
                    mostrarWarning();
                }
                break;

            // si el filtro esta en "por empezar", veo el array filtrado por empezar 
            case estadoFiltroPorEmpezar:
                // si esta vacio, muestro el warning
                if (arrayFiltradoStatusPorEmpezar.length === 0) {
                    mostrarWarning();
                }else{
                    saberSiHaceFaltaElAncla(arrayFiltradoStatusPorEmpezar)
                }
                break;

            // si el filtro esta en "en proceso", veo el array de filtrado en proceso
            case estadoFiltroEnProceso:
                // si esta vacio, muestro el warning
                if (arrayFiltradoStatusEnProceso.length === 0) {
                    mostrarWarning();
                }else{
                    saberSiHaceFaltaElAncla(arrayFiltradoStatusEnProceso)
                }
                break;

            // si el filtro esta en "terminadas", veo el array filtrado terminadas
            case estadoFiltroTerminadas:
                // si esta vacio, muestro el warning
                if (arrayFiltradoStatusTerminadas.length === 0) {
                    mostrarWarning();
                }else{
                    saberSiHaceFaltaElAncla(arrayFiltradoStatusTerminadas)
                }
                break;
            }
        })
    })
    // -----------------------------------------------------------------------------------------------------------
}






// ------- FUNCION DE CAMBIO DE ESTADO DEL SELECTOR DE CADA TASK JUNTO A LA OBTENCION DEL ESTADO CORRESPONDIENTE SEGUN EL ELEGIDO ----------
function cambiarEstadoDeEstaTask(idDeTaskACambiar, nuevoEstado) {

    // segun el id que me paso, busco una task con ese id en el array original
    let taskEncontradaEnElArray = arrayDeTasks.find(element => element.id === idDeTaskACambiar);

    // si encontré una task con ese id, hago lo siguiente
    if (taskEncontradaEnElArray) {

        // busco en QUË index está esa task
        let index = arrayDeTasks.findIndex(element => element.id === idDeTaskACambiar)

        // segun el index, le cambio a ESA posicion, el estado obteniendolo con el replace() por que el estado que me viene es 
        // el de "estado-..." y yo necesito el de "status-..."
        arrayDeTasks[index].estado = nuevoEstado.replace("estado","status");

        // si al cambiar el estado, el filtro NO esta en "todas", la elimino del contenedor. esto lo hago porque por ejemplo:
        // si estoy en el filtro "terminadas" y le cambio el estado a alguna task a "por empezar", ya NO deberia mostrarse ahí
        // esa task, por ende la dejo de mostrar, PERO en el caso de que el filtro esté en "todas", no la elimino aunque le cambie
        // el estado porque justamente estoy mostrando todas incluyendo TODOS los estados
        if (selectFiltroPorEstados.value != estadoFiltroTodas) {
            let sectionDeLaTask = document.getElementById(idDeTaskACambiar);
            if (sectionDeLaTask) contenedorAllTask.removeChild(sectionDeLaTask);
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------- FUNCIONES DE FILTRADO ------------------------
function filtrarStatusPorEmpezar() {
    arrayFiltradoStatusPorEmpezar = arrayDeTasks.filter(task => task.estado === statusPorEmpezar)
    return arrayFiltradoStatusPorEmpezar;
}

function filtrarStatusEnProceso() {
    arrayFiltradoStatusEnProceso = arrayDeTasks.filter(task => task.estado === statusEnProceso)
    return arrayFiltradoStatusEnProceso;
}

function filtrarStatusTerminadas() {
    arrayFiltradoStatusTerminadas = arrayDeTasks.filter(task => task.estado === statusTerminada)
    return arrayFiltradoStatusTerminadas;
}
//-----------------------------------------------------------------------------


// --------------- COMPARADORES --------------------------
function comparadorAscendente(a,b) {
    // primero separo los id de los obejtos q me pasan con el metodo split porq yo se que el id es x ej: "tarea-1", entonces los 
    // separo por el guin medio "-" y me quedo con la segunda parte de ese array que me da, osea, me quedo con el numero
    let aSinLetras = a.id.split("-")[1];
    // lo mismo con este
    let bSinLetras = b.id.split("-")[1];
    
    // y despues los resto para ver si me da -1 0 +1
    return aSinLetras - bSinLetras;
}
function comparadorDescendente(a,b) {
    // primero separo los id de los obejtos q me pasan con el metodo split porq yo se que el id es x ej: "tarea-1", entonces los 
    // separo por el guin medio "-" y me quedo con la segunda parte de ese array que me da, osea, me quedo con el numero
    let aSinLetras = a.id.split("-")[1];
    // lo mismo con este
    let bSinLetras = b.id.split("-")[1]; 

    // y despues los resto para ver si me da -1 0 +1
    return bSinLetras - aSinLetras;
}
//-------------------------------------------------------

function saberSiHaceFaltaElAncla(array) {
    let elementoAncla = document.getElementById("a-ancla");

    if (array.length >= 3) {
        sectionAncla.innerHTML = ancla;    
    }else{
        if (elementoAncla) {
            sectionAncla.removeChild(elementoAncla);
        }
    }
}


function obtenerSiguienteId() {
    // para el siguiente id, hago un preincremento, osea, primero lo incremento en 1 y despues lo devuelvo
    return (++id);
}

function eliminarWarning(){
    // busco el contenedor de warning por su id
    let sectionWarning = document.getElementById("warning-no-tasks");
    // si está, lo elimino
    if (sectionWarning) {
        contenedorAllTask.removeChild(sectionWarning);
    }
}

function mostrarWarning() {
    // le agrego al contenedor el mensaje
    contenedorAllTask.innerHTML += mensajeWarning;
}