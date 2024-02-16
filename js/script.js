let mensajeWarning =  `<section class="warning-no-tasks" id="warning-no-tasks">
                    <img src="icon/fingerUp.svg" alt="finger-up" class="img-finger">
                    <h3 class="title-warning">¡No hay tareas pendientes!</h3>
                </section>`
// new task --------------------------
let inputDescripcion = document.getElementById("description")
let selectEstadoNuevaTask = document.getElementById("status");
let boton = document.getElementById("boton");
//------------------------------------

// filter ----------------------------
let selectFiltroPorEstados = document.getElementById("selector-filtro-estados")
let selectFecha = document.getElementById("selector-fecha");
//------------------------------------

// all task --------------------------
let contenedorAllTask = document.getElementById("all-task");
let arrayDeTasks = [];
let botonesEliminarTask;
//------------------------------------

let id = 0;

boton.addEventListener("click", ()=>{
    
    if (inputDescripcion.value === "" || inputDescripcion.value === " ") {
        inputDescripcion.focus();
    }else{
        eliminarWarning(); // elimino el cartel de que no hay tareas pendientes

        let descripcion = inputDescripcion.value; // agarro la descripcion
        let estado = selectEstadoNuevaTask.value;// agarro el estado

        let nuevaTarea = {   // creo la task
            id: "tarea-" + obtenerSiguienteId(), // obtengo el siguiente id
            descripcion: descripcion,
            estado: estado
        };

        arrayDeTasks.push(nuevaTarea); // meto la task al array
        mostrarArray(arrayDeTasks); // muestro el array (en el html)

        inputDescripcion.value = ""; //vacío el input
        inputDescripcion.focus();  // le sigo haciendo focus
    }
})


// NOTA PARA EL JULIAN QUE SIGA MAÑANA ------------------------------>

selectFiltroPorEstados.addEventListener("change", ()=>{  // el filtro se hace todo bien pero tengo que tener en cuenta: cuando esten filtradas, eliminarlas del array original
    // tambien debo eliminarlas del array q se esta mostrando asi se borra del html cunaod esta el filtro, tambien tengo que tener en cuenta de que el selector de la
    // propia task, si estoy por ejemplo filtrando por empezar, al cambiar el selector de la task se debe borrar de donde se esta mostrando porque ya tiene otro estado
    // entonces si la cambio a en proceso, deberia verse ahora en el filtro de en proceso, y bueno, faltaria lo de el otro filtro que es el mas reciente
    // tambien ver como hacer para que si filtro por empezar y no hay tareas por empezar pero si que hay de las otras, que se muestre el mensaje de wanring y asi con todas

    let arrayFiltrado = [];
    let estadoDelSelector = selectFiltroPorEstados.value;

    let estadoFiltroTodas = "filtro-todas";
    let estadoFiltroPorEmpezar = "filtro-por-empezar";
    let estadoFiltroEnProceso = "filtro-en-proceso";
    let estadoFiltroTerminadas = "filtro-terminadas";

    let statusPorEmpezar = "status-por-empezar";
    let statusEnProceso = "status-en-proceso";
    let statusTerminada = "status-terminada";

    if (arrayDeTasks.length != 0) {
        switch (estadoDelSelector) {
            case estadoFiltroTodas:
                mostrarArray(arrayDeTasks);
                break;
    
            case estadoFiltroPorEmpezar:
                arrayFiltrado = arrayDeTasks.filter(task => {
                    return task.estado === statusPorEmpezar;
                })
                mostrarArray(arrayFiltrado);
                break;
    
            case estadoFiltroEnProceso:
                arrayFiltrado = arrayDeTasks.filter(task => {
                    return task.estado === statusEnProceso;
                })
                mostrarArray(arrayFiltrado);
                break;
    
            case estadoFiltroTerminadas:
                arrayFiltrado = arrayDeTasks.filter(task => {
                    console.log(task.estado)
                    console.log(statusTerminada)
                    console.log(task.estado === statusTerminada)
                    return task.estado === statusTerminada;
                })
                mostrarArray(arrayFiltrado);
                break;
        }
    }


    //console.log( "array de task" + arrayDeTasks)
    //console.log("array filtrado" + arrayFiltrado)
})



// ---------------------- FUNCIONES ------------------------------
function mostrarArray(arrayRecibido) { 

    contenedorAllTask.innerHTML = ""; // vacio el contenedor de las tareas asi NO se duplican

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
                                                <select name="estado-de-tarea" id="estado-de-tarea">
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
                                                    <select name="estado-de-tarea" id="estado-de-tarea">
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
                                                <p class="texto-descriptivo">`+ elementoDelArray.descripcion + `</p>
                                                <div class="selector-estado-de-tarea">
                                                    <label for="estado-de-tarea">Estado:</label>
                                                    <select name="estado-de-tarea" id="estado-de-tarea">
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
                        arrayRecibido.splice(indexAEliminar,1) // lo elimino del array

                        console.log("tamanio del array: " + arrayRecibido.length)
                        if (arrayRecibido.length === 0) {
                            mostrarWarning();
                        }
                    }
                }
            })
        })
    });
}



function obtenerSiguienteId() {
    return (++id);
}

function eliminarWarning(){
    let sectionWarning = document.getElementById("warning-no-tasks");
    if (sectionWarning) {
        console.log(sectionWarning)
        contenedorAllTask.removeChild(sectionWarning);
    }
}

function mostrarWarning() {
    contenedorAllTask.innerHTML += mensajeWarning;
}