
let dueños = [];
let mascotas = [];
let idDueñoCounter = 1;
let idMascotaCounter = 1;


const estadosSalud = ['sano', 'enfermo', 'en tratamiento'];
const especies = ['perro', 'gato', 'ave', 'reptil', 'otro'];

let opciones = {
    "1": AgregarDueño,
    "2": AgregarMascota,
    "3": MascotaRegistrada,
    "4": MostrarMascotasNombre,
    "5": ActualizarEstado,
    "6": EliminarMascota,
    "7": verMascotasDeDueño,
    "8": salir
}
function iniciarVeterinaria(){
    mostrarMenu();
}
function mostrarMenu(){
    const menu = prompt(`
    🐶🐱 VETERINARIA ASÍNCRONA 🦜🐍
    1. Agregar dueño
    2. Agregar mascota
    3. Listar mascotas
    4. Buscar mascota por nombre
    5. Actualizar estado de salud de una mascota
    6. Eliminar una mascota por nombre
    7. Ver mascotras por dueño
    8. Salir
    Escribe una opción:
    `)
    if (menu in opciones){
        opciones[menu]();
    }
}
function AgregarDueño(){
    alert("Cargando... (Tiempo estimado: 1.5 segundos)");
    setTimeout(()=>{
        let nombre = prompt("Ingrese el nombre del dueño:").toLocaleLowerCase()
        if (!nombre){
            alert("Nombre no puede estar vacío");
            return mostrarMenu();
        }
        let cedula = prompt("Ingrese la cédula del dueño:")
        if (!cedula){
            alert("Cedula no puede estar vacia");
            return mostrarMenu();
        }
        const existencia = dueños.find(b => b.cedula == cedula)
        if (existencia){
            alert(`Ya existe el dueño con esta cedual: ${cedula}`)
            mostrarMenu()
        }
        let telefono = prompt("Ingrese el teléfono del dueño:")
        if (!telefono){
            alert("Teléfono no puede estar vacío");
            return mostrarMenu();
        }
        let dueño = {
            id: idDueñoCounter++,
            nombre: nombre,
            cedula: cedula,
            telefono: telefono
        }
        dueños.push(dueño);
        alert("Validando datos del dueño... (Tiempo estimado: 1.5 segundos)")
        setTimeout(()=>{
            alert(`Dueño ${nombre} agregado con éxito!`);
            mostrarMenu()
        },1500)
    }, 1500)
}

function AgregarMascota(){
    if (dueños.length === 0){
        alert("No hay dueños registrados, ingrese uno primero")
        return mostrarMenu()
    }
    alert("Validando datos del dueño... (Tiempo estimado: 1.5 segundos)");
    setTimeout(()=>{
        let nombre = prompt("Ingrese el nombre de la mascota:").toLocaleLowerCase()
        if (!nombre){
            alert("Nombre no puede estar vacío");
            return mostrarMenu();
        };
        let especie = prompt(`Ingrese la especie (${especies.join(', ')}):`).toLocaleLowerCase();
        if (!especie || !especies.includes(especie)) {
            alert("La especie no puede estar vacia")
            return mostrarMenu()
        };
        let edad = prompt("Ingrese la edad en años:")
        if(!edad){
            alert("La edad no puede estar vacia")
            return mostrarMenu()
        };
        let peso = prompt("Ingrese el peso en kilogramos:")
        if (!peso){
            alert("El peso no puede estar vacio")
            return mostrarMenu()
        };
        let salud = prompt(`Ingrese la salud (${estadosSalud.join(", ")}):`).toLocaleLowerCase()
        if (!salud){
            alert("La salud no puede estar vacia")
            return mostrarMenu()
        };
        let cedulaDueño = prompt("Escriba la cedula del dueño:")
        const dueño = dueños.find( d => d.cedula === cedulaDueño)
        if (!dueño){
            alert(`No se encontro el dueño con esa cedula ${cedulaDueño}`)
            return mostrarMenu()
        };
        const nuevaMascota = {
            id: idMascotaCounter++,
            nombre,
            especie,
            edad,
            peso,
            EstadoSalud: salud,
            idDueño: dueño.id
        }
        mascotas.push(nuevaMascota)
        alert("Agregando a la mascota (Puede durar 2 segundos)")
        setTimeout(()=>{
            alert(`Mascota ${nombre}, registrada con exito con el ID: ${nuevaMascota.id}`)
            mostrarMenu()
        },2000)
    },1500)
}
function MascotaRegistrada(){
    alert("Cargando... (Puede tardar 1.5 segundos)")
    if (mascotas.length > 0){
        setTimeout(() => {
            alert("Mascotas registradas:\n" + mascotas.map(m => `${m.nombre} (${m.especie}) edad: ${m.edad} peso: ${m.peso} Salud: ${m.EstadoSalud} ID dueño: ${m.idDueño}`).join('\n'));
            return mostrarMenu()
        }, 1500);
    }else{
        setTimeout(()=>{
            alert("No se ha registrado ninguna mascota")
            return mostrarMenu()
        },1500)
    }
}
function BuscarMascota(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const coincidencias = mascotas.filter(m => m.nombre.toLowerCase().startsWith(nombre));
            if(coincidencias.length > 0){
                resolve(coincidencias)
            }else{
                reject("No se encontraron mascotas con este nombre")
            }
        },1500)
    })
}
function MostrarMascotasNombre(){
    let nombre = prompt("Escribe el nombre de la mascota:").toLowerCase()
    if(!nombre){
        alert("Nombre no puede estar vacio")
        return mostrarMenu()
    }
    alert("Cargando mascotas... (Puede tardar 1.5 segundos)")

    BuscarMascota(nombre)
    .then((coincidencias)=>{
        alert("Mascotas encontradas:\n", coincidencias.map(c => `${c.nombre} (${c.especie})`).join("\n"))
        return mostrarMenu()
    })
    .catch((error)=>{
        alert(error);
        return mostrarMenu();
    })
}
function Wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function ActualizarEstado() {
    if (mascotas.length === 0) {
        alert("No hay mascotas registradas");
        return mostrarMenu();
    }

    let nombre = prompt("Escribe el nombre de la mascota:");
    if (!nombre) {
        alert("Nombre no puede estar vacío");
        return mostrarMenu();
    }

    const mascota = mascotas.find(m => m.nombre.toLowerCase().startsWith(nombre.toLowerCase()));
    if (!mascota) {
        alert("No hay mascotas con ese nombre");
        return mostrarMenu();
    }

    alert("Esperando diagnóstico del veterinario... (1 segundo)");
    await Wait(1000);

    let nuevoEstado = prompt(`Ingrese el nuevo estado de salud (${estadosSalud.join(", ")}):`);
    if (!nuevoEstado) {
        alert("El estado no puede estar vacío");
        return mostrarMenu();
    } else if (!estadosSalud.includes(nuevoEstado.toLowerCase())) {
        alert("Ingrese un estado válido");
        return mostrarMenu();
    }

    mascota.EstadoSalud = nuevoEstado.toLowerCase();
    alert(`Estado de salud actualizado con éxito a ${nuevoEstado}`);
    mostrarMenu();
}
function EliminarMascota() {
    if (mascotas.length === 0) {
        alert("No hay mascotas registradas");
        return mostrarMenu();
    }

    let nombre = prompt("Escribe el nombre de la mascota que deseas eliminar:");
    if (!nombre) {
        alert("El nombre no puede estar vacío");
        return mostrarMenu();
    }

    const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
    if (!mascota) {
        alert("No se encontró una mascota con ese nombre");
        return mostrarMenu();
    }

    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar a ${mascota.nombre}?`);
    if (!confirmacion) {
        alert("Eliminación cancelada.");
        return mostrarMenu();
    }

    alert("Procesando eliminación... (espere 2 segundos)");

    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    }).then(() => {
        const index = mascotas.findIndex(m => m.id === mascota.id);
        if (index !== -1) {
            mascotas.splice(index, 1);
            alert(`Mascota ${mascota.nombre} eliminada con éxito.`);
        } else {
            alert("Hubo un error al intentar eliminar la mascota.");
        }
        mostrarMenu();
    });
}
async function verMascotasDeDueño() {
    const cedula = prompt('Ingrese la cédula del dueño:');
    if (!cedula) {
        alert('La cédula no puede estar vacía.');
        return mostrarMenu();
    }

    alert('Cargando información del dueño... (esto tomará 2 segundos)');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const dueño = dueños.find(d => d.cedula === cedula);
    if (!dueño) {
        alert('No se encontró un dueño con esa cédula.');
        return mostrarMenu();
    }

    const mascotasDueño = mascotas.filter(m => m.idDueño === dueño.id);
    if (mascotasDueño.length === 0) {
        alert(`El dueño ${dueño.nombre} no tiene mascotas registradas.`);
    } else {
        let lista = `🐾 MASCOTAS DE ${dueño.nombre.toUpperCase()} 🐾\n\n`;
        mascotasDueño.forEach(m => {
            lista += `ID: ${m.id} | Nombre: ${m.nombre} | Especie: ${m.especie} | Edad: ${m.edad} años | Peso: ${m.peso} kg | Salud: ${m.estadoSalud}\n`;
        });
        alert(lista);
    }
    mostrarMenu();
}
function salir(){
    alert("Hasta luego")
}
window.onload = iniciarVeterinaria;