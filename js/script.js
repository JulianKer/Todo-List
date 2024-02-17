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
    }
})
// -----------------------------------------------------------------------------------------------------------------------------



//--------------------------------------------- SELECTOR DE FILTRO POR ESTADOS -------------------------------------------------
selectFiltroPorEstados.addEventListener("change", ()=>{ 
    // NOTA PARA EL JULIAN QUE SIGA MAÑANA

    // 1 --- tambien tengo que tener en cuenta de que el selector de la propia task, si estoy por ejemplo filtrando por empezar, 
    // al cambiar el selector de la task se debe borrar de donde se esta mostrando porque ya tiene otro estado
    // entonces si la cambio a en proceso, deberia verse ahora en el filtro de en proceso, 

    // 2---- y bueno, faltaria lo de el otro filtro que es el mas reciente

    contenedorAllTask.innerHTML = ""; // vacio el contenedor de las tareas asi NO se duplican

    let estadoDelSelector = selectFiltroPorEstados.value;

    if (arrayDeTasks.length != 0) {
        switch (estadoDelSelector) {
            case estadoFiltroTodas:
                mostrarArray(arrayDeTasks); // muestro el array

                //-------- en caso de que cuando cambie el selector, si no tiene nada, muestro el warning-----
                if (arrayDeTasks.length == 0) {
                    contenedorAllTask.innerHTML= ""                                                         //
                    mostrarWarning()                                                                        // 
                }                                                                                           //
                //--------------------------------------------------------------------------------------------
                break;
    
            case estadoFiltroPorEmpezar:
                arrayFiltradoStatusPorEmpezar = arrayDeTasks.filter(task => {
                    return task.estado === statusPorEmpezar;
                })
                mostrarArray(arrayFiltradoStatusPorEmpezar);// muestro el array

                //-------- en caso de que cuando cambie el selector, si no tiene nada, muestro el warning-----
                if (arrayFiltradoStatusPorEmpezar.length == 0) {                                            //
                    contenedorAllTask.innerHTML= ""                                                         //
                    mostrarWarning()                                                                        //
                }                                                                                           //
                //--------------------------------------------------------------------------------------------
                break;
    
            case estadoFiltroEnProceso:
                arrayFiltradoStatusEnProceso = arrayDeTasks.filter(task => {
                    return task.estado === statusEnProceso;
                })
                mostrarArray(arrayFiltradoStatusEnProceso);// muestro el array

                //-------- en caso de que cuando cambie el selector, si no tiene nada, muestro el warning-----
                if (arrayFiltradoStatusEnProceso.length == 0) {                                             //
                    contenedorAllTask.innerHTML= ""                                                         //
                    mostrarWarning()                                                                        //
                }                                                                                           //
                //--------------------------------------------------------------------------------------------
                break;
    
            case estadoFiltroTerminadas:
                arrayFiltradoStatusTerminadas = arrayDeTasks.filter(task => {
                    return task.estado === statusTerminada;
                })
                mostrarArray(arrayFiltradoStatusTerminadas);// muestro el array

                //-------- en caso de que cuando cambie el selector, si no tiene nada, muestro el warning-----
                if (arrayFiltradoStatusTerminadas.length == 0) {                                            //
                    contenedorAllTask.innerHTML= ""                                                         //
                    mostrarWarning()                                                                        //
                }                                                                                           //
                //--------------------------------------------------------------------------------------------
                break;
        }
    }else{
        eliminarWarning();
        mostrarWarning();
    }
})
// -----------------------------------------------------------------------------------------------------------------------------




// ---------------------- FUNCIONES ------------------------------
function mostrarArray(arrayRecibido) { 

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
                        arrayRecibido.splice(indexAEliminar,1) // lo remuevo del array

                        // este switch es para cuando elimino la task mientras esta filtrado, se elimine tambien del array original
                        // y asi cuando filtro a todas de nuevo, no se muestre la que elimine cuando apliqué otro filtro
                        switch (selectFiltroPorEstados.value) {
                            case estadoFiltroPorEmpezar:
                                indexAEliminar = arrayDeTasks.findIndex(element => element.id === idDelElemento)
                                arrayDeTasks.splice(indexAEliminar,1)
                                break;

                            case estadoFiltroEnProceso:
                                indexAEliminar = arrayDeTasks.findIndex(element => element.id === idDelElemento)
                                arrayDeTasks.splice(indexAEliminar,1)
                                break;

                            case estadoFiltroTerminadas:
                                indexAEliminar = arrayDeTasks.findIndex(element => element.id === idDelElemento)
                                arrayDeTasks.splice(indexAEliminar,1)
                                break;
                        }
                        //--- si el array filtrado quedó vacío, muestro el warning-----
                        if (arrayRecibido.length === 0) {                            //
                            mostrarWarning()                                         //
                        }                                                            //
                        // ------------------------------------------------------------
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
        contenedorAllTask.removeChild(sectionWarning);
    }
}

function mostrarWarning() {
    contenedorAllTask.innerHTML += mensajeWarning;
}