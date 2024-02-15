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
//------------------------------------

boton.addEventListener("click", ()=>{
    eliminarWarning();

    if (inputDescripcion.value != "") {
        let descripcion = inputDescripcion.value;
        let estado = selectEstadoNuevaTask.value;

        switch (selectEstadoNuevaTask.value) {
            case "status-por-empezar":
                contenedorAllTask.innerHTML += `
                <section class="task">
                            <div class="first-row">
                                <h4>Hoy</h4>
                                <img src="icon/cerrar.png" alt="Eliminar" title="Eliminar" class="img-cruz">
                            </div>
                            <div class="second-row">
                                <p class="texto-descriptivo">`+ descripcion + `</p>
                                <div class="selector-estado-de-tarea">
                                    <label for="estado-de-tarea">Estado:</label>
                                    <select name="estado-de-tarea" id="estado-de-tarea">
                                        <option value="estado-por-empezar" selected >Por empezar</option>
                                        <option value="estado-en-proceso">En proceso</option>
                                        <option value="estado-terminada">Terminada</option>
                                    </select>
                                </div>
                            </div>
                        </section>`
                break;
            case "status-en-proceso":
                contenedorAllTask.innerHTML += `
                <section class="task">
                            <div class="first-row">
                                <h4>Hoy</h4>
                                <img src="icon/cerrar.png" alt="Eliminar" title="Eliminar" class="img-cruz">
                            </div>
                            <div class="second-row">
                                <p class="texto-descriptivo">`+ descripcion + `</p>
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
                <section class="task">
                            <div class="first-row">
                                <h4>Hoy</h4>
                                <img src="icon/cerrar.png" alt="Eliminar" title="Eliminar" class="img-cruz">
                            </div>
                            <div class="second-row">
                                <p class="texto-descriptivo">`+ descripcion + `</p>
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
    }
})

function eliminarWarning(){
    let sectionWarning = document.getElementById("warning-no-tasks");
    if (sectionWarning) {
        contenedorAllTask.removeChild(sectionWarning);
    }
}