let estudiantes = []

function registrar(){
    const nombre = document.getElementById("nombre").value;
    const edad = parseInt(document.getElementById("edad").value);
    const programa = document.getElementById("programa").value;
    const nota = parseFloat(document.getElementById("nota").value);

    const est = {nombre, edad,programa, nota};

    estudiantes.push(est);
    limpiar();
    calcularPromedio();
    actualizarInfo(); 


    let mensajeHtml = new bootstrap.Toast(document.getElementById("mensaje"));
    mensajeHtml.show();


}

function limpiar(params) {
    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("programa").value = "";
    document.getElementById("nota").value = "";
}

function actualizarInfo() {
    let listaHtml = document.getElementById("lista");
    let cadena = "";
    for (let i = 0; i < estudiantes.length; i++) {
        cadena += `<div class="col col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 p-2">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${estudiantes[i].nombre}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${estudiantes[i].programa}</h6>
                        <p class="card-text">Edad: ${estudiantes[i].edad}</p>
                        <p class="card-text">Nota: ${estudiantes[i].nota}</p>
                        <a href="#" class="btn btn-danger" onclick="eliminar(${i})"><i class="bi bi-person-dash"></i> Eliminar</a>
                    </div>
                </div>
            </div>`
    }
    listaHtml.innerHTML = cadena;
}

function calcularPromedio() {
    let total = 0;
    let prom = 0;
    if (estudiantes.length>0) {
        for (let i = 0; i < estudiantes.length; i++) {
            total += estudiantes[i].nota;
        }
        prom = total / estudiantes.length;
    }
    document.getElementById("promedio").textContent = prom.toFixed(1);
}

function eliminar(index) {
    estudiantes.splice(index,1);
    calcularPromedio();
    actualizarInfo(); 
}
