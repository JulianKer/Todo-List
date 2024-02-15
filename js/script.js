let mensajeWarning =  `<section class="warning-no-tasks">
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
    
    if (inputDescripcion.value != "") {
        eliminarWarning();

        let descripcion = inputDescripcion.value;
        let estado = selectEstadoNuevaTask.value;
        let nuevaTarea;

        switch (selectEstadoNuevaTask.value) {
            case "status-por-empezar":
                nuevaTarea = {
                    id: "tarea-" + obtenerSiguienteId(),
                    descripcion: descripcion,
                    estado: estado
                };
                arrayDeTasks.push(nuevaTarea);

                contenedorAllTask.innerHTML += `
                                    <section class="task" id="` + nuevaTarea.id + `">
                                        <div class="first-row">
                                            <h4>Hoy</h4>
                                            <img src="icon/cerrar.png" alt="Eliminar" title="Eliminar" class="img-cruz" id="`+ nuevaTarea.id +`">
                                        </div>
                                        <div class="second-row">
                                            <p class="texto-descriptivo">`+ nuevaTarea.descripcion + `</p>
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
                    nuevaTarea = {
                        id: "tarea-" + (arrayDeTasks.length+1),
                        descripcion: descripcion,
                        estado: estado
                    };
                    arrayDeTasks.push(nuevaTarea);
    
                    contenedorAllTask.innerHTML += `
                                        <section class="task" id="` + nuevaTarea.id + `">
                                            <div class="first-row">
                                                <h4>Hoy</h4>
                                                <img src="icon/cerrar.png" alt="Eliminar" title="Eliminar" class="img-cruz" id="`+ nuevaTarea.id +`">
                                            </div>
                                            <div class="second-row">
                                                <p class="texto-descriptivo">`+ nuevaTarea.descripcion + `</p>
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
                    nuevaTarea = {
                        id: "tarea-" + (arrayDeTasks.length+1),
                        descripcion: descripcion,
                        estado: estado
                    };
                    arrayDeTasks.push(nuevaTarea);
    
                    contenedorAllTask.innerHTML += `
                                        <section class="task" id="` + nuevaTarea.id + `">
                                            <div class="first-row">
                                                <h4>Hoy</h4>
                                                <img src="icon/cerrar.png" alt="Eliminar" title="Eliminar" class="img-cruz" id="`+ nuevaTarea.id +`">
                                            </div>
                                            <div class="second-row">
                                                <p class="texto-descriptivo">`+ nuevaTarea.descripcion + `</p>
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
        inputDescripcion.value = "";
        inputDescripcion.focus()
        arrayDeTasks.forEach(element => {
            console.log(element.id)
        });
        console.log("......")

        botonesEliminarTask = document.querySelectorAll(".img-cruz")

        botonesEliminarTask.forEach(element => {

            element.addEventListener("click", ()=>{

                let idDelElemento = element.id;

                arrayDeTasks.forEach(task=>{

                    if (task.id === idDelElemento) {
                        let taskAEliminar = document.getElementById(idDelElemento);

                        if (taskAEliminar != null) {
                            contenedorAllTask.removeChild(taskAEliminar); // lo remuevo del html
                            let indexAEliminar = arrayDeTasks.findIndex(element => element.id === idDelElemento) // busco el index del elemento q quiero eliminar
                            arrayDeTasks.splice(indexAEliminar,1) // lo elimino del array

                            // las task se eliminan correctamente pero ver mejor cuando se le aplica el id, que SIEMPRE sea NO del lenght sino del 
                            // ultimo elemento mas 1 pq asi no se repiten nunca, osea tratar de que si tengo 10 elemntos, no hacer el
                            // lenght mas 1 sino buscar cual es el ultimo y ai sumar uno pq capa el ultimo es de id 5 pero esta solo ese elemento
                            // entonces desp se va a repetir LO HICE EN UN METODO MAS ABAJO, MIRAR

                            // SINO LO PODRIA DEJAR ASI QUE YA SE MUESTRA PERO BUENO CAPAZ DESPUES SE ME COMPLICA A LA HORA DE ORDENARLOS Y ESO































                        }
                    }
                })
            })
        });
    }
})

function obtenerSiguienteId() {
    return (++id);
}


function eliminarWarning(){
    let sectionWarning = document.getElementById("warning-no-tasks");
    if (sectionWarning) {
        contenedorAllTask.removeChild(sectionWarning);
    }
}