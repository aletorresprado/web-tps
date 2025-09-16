    document.getElementById("formPersona").addEventListener("submit", function(event) {
            event.preventDefault(); // Evita que el formulario se recargue

            // Obtener valores correctamente (sin parseInt para strings)
            const nombre = document.getElementById("nombre").value;
            const edad = parseInt(document.getElementById("edad").value);
            const dni = document.getElementById("dni").value;
            const sexo = document.getElementById("sexo").value;
            const peso = parseFloat(document.getElementById("peso").value);
            const altura = parseFloat(document.getElementById("altura").value);
            const nacimiento = parseInt(document.getElementById("nacimiento").value);

            class Persona {
                constructor(nombre, edad, dni, sexo, peso, altura, nacimiento){
                    this._nombre = nombre;
                    this._edad = edad;
                    this._dni = dni;
                    this._sexo = sexo;
                    this._peso = peso;
                    this._altura = altura;
                    this._nacimiento = nacimiento;
                }

                generacion(){
                    if (isNaN(this._nacimiento)){
                        return "Ingresa un año válido";
                    } else if (this._nacimiento >= 1930 && this._nacimiento <= 1948){
                        return "Silent Generation - Rasgo: Irreverencia 😐";
                    } else if (this._nacimiento >= 1949 && this._nacimiento <= 1968){
                        return "Baby Boom - Ambición 😃";
                    } else if (this._nacimiento >= 1969 && this._nacimiento <= 1980){
                        return "Generación X - Obsesión por el éxito 😎";
                    } else if (this._nacimiento >= 1981 && this._nacimiento <= 1993){
                        return "Generación Y - Frustración 😖";
                    } else if (this._nacimiento >= 1994 && this._nacimiento <= 2010){
                        return "Generación Z - Irreverencia 🥵";
                    } else {
                        return "No se pudo determinar la generación";
                    }
                }
                
                esMayorDeEdad(){
                    if (isNaN(this._edad)){
                        return "Ingresa una edad válida";
                    } else if (this._edad >= 18) {
                        return "Eres mayor de edad";
                    } else {
                        return "Eres menor de edad";
                    }  
                }
                
                obtenerSexo(){
                    if (this._sexo === "M") {
                        return "Sexo Masculino";
                    } else if (this._sexo === "F") {
                        return "Sexo Femenino";
                    } else {
                        return "Sexo no especificado";
                    }
                }
                
                obtenerDni(){
                    return this._dni;
                }
                
                mostrarDatos(){
                    let datos = `
                        <p><strong>Nombre:</strong> ${this._nombre}</p>
                        <p><strong>Edad:</strong> ${this._edad} años</p>
                        <p><strong>Estado:</strong> ${this.esMayorDeEdad()}</p>
                        <p><strong>DNI:</strong> ${this.obtenerDni()}</p>
                        <p><strong>Sexo:</strong> ${this.obtenerSexo()}</p>
                        <p><strong>Peso:</strong> ${this._peso} kg</p>
                        <p><strong>Altura:</strong> ${this._altura} m</p>
                        <p><strong>Año de nacimiento:</strong> ${this._nacimiento}</p>
                        <p><strong>Generación:</strong> ${this.generacion()}</p>
                    `;

                    // Mostrar resultados en la página
                    document.getElementById("datosPersona").innerHTML = datos;
                    document.getElementById("resultados").style.display = "block";
                    
                    // También mostrar en consola
                    console.log(datos.replace(/<[^>]*>/g, ''));
                }
            }

            // Crear instancia de Persona con los datos del formulario
            let persona = new Persona(nombre, edad, dni, sexo, peso, altura, nacimiento);
            persona.mostrarDatos();
        });