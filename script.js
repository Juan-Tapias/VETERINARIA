
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
            mostrarMenu()
        }, 1500);
    }else{
        setTimeout(()=>{
            alert("No se ha registrado ninguna mascota")
            mostrarMenu()
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
    alert("Cargando mascotas... (Puede tardar 1.5 segundos)")

    BuscarMascota(nombre)
    .then((coincidencias)=>{
        alert("Mascotas encontradas:\n", coincidencias.map(c => `${c.nombre} (${c.especie})`).join("\n"))
        mostrarMenu()
    })
    .catch((error)=>{
        alert(error);
        mostrarMenu();
    })
}

window.onload = iniciarVeterinaria;