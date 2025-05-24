# Gestión Asíncrona de una Veterinaria 🐾

Aplicación JavaScript para gestionar mascotas y dueños en una veterinaria con operaciones asíncronas.

## Tecnologías usadas
- JavaScript puro (sin frameworks)
- HTML básico para la estructura
- Callbacks, Promesas y Async/Await para manejo asíncrono

## Funcionalidades implementadas
1. CRUD completo para dueños y mascotas
2. Validación de datos en todas las operaciones
3. 6 operaciones asíncronas:
   - Registro de dueño (callback + setTimeout)
   - Registro de mascota (callback + setTimeout)
   - Búsqueda de mascota (Promesa)
   - Actualización de estado de salud (async/await)
   - Eliminación de mascota (Promesa + confirmación)
   - Ver mascotas de un dueño (async/await + retraso)

## Cómo se aplicó la asincronía
- **setTimeout**: Para simular operaciones que toman tiempo (validaciones, búsquedas)
- **Callbacks**: Para manejar el flujo después de operaciones asíncronas
- **Promesas**: Para operaciones que pueden fallar o tener retraso
- **Async/Await**: Para código asíncrono más legible y secuencial

## Cómo ejecutar
1. Abrir el archivo `index.html` en un navegador web
2. Interactuar con los prompts y alerts del sistema