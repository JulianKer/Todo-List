let task = `<section class="task">
                <div class="first-row">
                    <h4>Hoy</h4>
                    <img src="icon/cerrar.png" alt="Eliminar" title="Eliminar" class="img-cruz">
                </div>
                <div class="second-row">
                    <p class="texto-descriptivo">JAJAJAJAJJAJJAJJAJAJAJAJJJAJAJAJAJJAJJAJJAJAJAJAJJJAJAJAJAJJAJJAJJAJAJAJAJJ</p>
                    <div class="selector-estado-de-tarea">
                        <label for="estado-de-tarea">Estado:</label>
                        <select name="estado-de-tarea" id="estado-de-tarea">
                            <option value="estado-por-empezar">Por empezar</option>
                            <option value="estado-en-proceso">En proceso</option>
                            <option value="estado-terminada">Terminada</option>
                        </select>
                    </div>
                </div>
            </section>`;

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
let botonEliminarTask;
console.log(botonEliminarTask);
//------------------------------------

boton.addEventListener("click", ()=>{
    eliminarWarning();
    
    if (inputDescripcion.value != "") {
        let descripcion = inputDescripcion.value;
        let estado = selectEstadoNuevaTask.value;
        let nuevaTarea;
        switch (selectEstadoNuevaTask.value) {
            case "status-por-empezar":
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
        botonEliminarTask = document.querySelector(".img-cruz")
    }
})

function eliminarWarning(){
    let sectionWarning = document.getElementById("warning-no-tasks");
    if (sectionWarning) {
        contenedorAllTask.removeChild(sectionWarning);
    }
}