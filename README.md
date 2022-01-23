# Logger
Librería para el manejo de logs en TypeScript y JavaScript

<img height="150" src="./Docs/Icono.png">

## Librería 
Las dependencias del paquete son únicamente de desarrollo y poder compilar los archivos TypeScript

Es posible copiar el código fuente en el proyecto, sin embargo, es recomendable incluirla como una librería externa

### Copiar Librería
Si se copian los archivos fuente o compilados, bastará con importarlos desde el archivo que lo necesite

```JS
// TypeScript/JavaScript 
import { Logger } from "./index";

// Node JS
const { Logger } = require("./index");
```

### NPM
Para usar la librería tanto con JavaScript como con TypeScript es necesario [compilar a JavaScript](#compilar-a-javascript)

Con `npm link` es posible incluir, como una dependencia, librarías externas que no se encuentren dentro del propio gestor.

Dentro de la carpeta donde se ha clonado el repositorio, ejecuta npm link. Esto creará un link simbólico en la carpeta global de npm (solo es necesario hacerlo una vez)

Luego, dentro de las carpetas donde se quiere usar, ejecuta npm link nombre_paquete. El nombre del paquete viene dado por *name*, dentro del package.json en este caso **logger**

Es posible hacerlo todo en un paso, ejecutando npm link /ruta/relativa/o/absoluta. La ruta puede ser relativa o absoluta a la carpeta de la librería

```BASH
# Cambia a la carpeta home
cd ~
# Clona el repositorio
git clone https://github.com/LuisPFdez/Logger-TS

# ---Primera forma---
# Mueve a la carpeta
cd Logger-TS
# Ejecuta el primer comando
npm link
# Carpeta que necesitará la librería
cd ../otraCarpeta
# Ejecuta el segundo comando
npm link logger

# ---Otra forma más directa---
# Carpeta que necesitará la librería
cd ../otraCarpeta
# Ejecuta el segundo comando
npm link ../Logger-TS
```
**Si algún paquete dentro de *node_modules* comparte el mismo nombre, npm link, sobreescribirá el directorio. Para evitar basta con cambiar el valor de name, de package.json**

Para importar la librería

```JS
// TypeScript/JavaScript 
import { Logger } from "logger";

// Node JS
const { Logger } = require("logger");
```

### Compilar a JavaScript
**Para compilar a JavaScript, dentro de la carpeta, es necesario tener antes las dependencias de desarrollo.** 

```BASH
# En caso de no tener las dependencias ejecuta
npm install
# O la forma abreviatura
npm i
```

Una vez instaladas las dependencias. Hay tres formas de hacerlo:
1. La primera y más recomendada.
```BASH
npm run build:ts
```
2. La segunda es similar a la primera (es necesario en el mismo directorio que *tsconfig.json*, o de lo contrario, dará error).
```BASH
npx tsc
```
3. La última, similar a las anteriores, pero ejecuta antes una comprobación del código (útil si se ha modificado el código).
```BASH
npm run build 
```

**Al finalizar, se habrá generado una carpeta *dist*, la cual contendrá los archivos de JavaScript y los archivos de declaración de TypeScript**

#### Archivos de declaración (TypeScript)
Proporcionan información a TypeScript sobre una API escrita en JavaScript. Permitiendo usar la API en TypeScript. 

Estos archivos tienen una extensión **.d.ts** y son necesarios únicamente para TypeScript. Permiten a TypeScript asignar características del lenguaje, que no están presentes en JavaScript.

Estos archivos no influyen para nada en el código JavaScript. Sin embargo, en caso de querer evitar que se incluyan en la compilación, es necesario modificar la propiedad **declaration** del archivo de [configuración del compilador](./tsconfig.json).
```JSON
{
    "compilerOptions": {
        "declaration": false
    },
}
```
## Clase Logger

Clase principal, encargada de la los registros log.

### Constructor

El constructor recibe 5 parámetros (todos son opcionales).

1. **fichero** <*string*>, nombre del fichero (no ha de especificarse la ruta en el nombre, es omitida en caso de especificarse), por defecto *logger.log*. Si el fichero no existe, creará un nuevo archivo. En caso de que el archivo exista, comprobará la extensión por seguridad, solo escribirá sobre los archivos con extensión log. El archivo ha de tener permisos de lectura y escritura.
2. **ruta** <*string*>, ruta donde se almacenará el fichero. Por defecto el directorio será *./*. Si la ruta no existe o no es un directorio lanzará una excepción.
3. **nivel** <*NIVEL_LOG*>, nivel de log mínimo para el registro de logs.
4. **formato** <*string*>, formato normal del log.
5. **formato_error** <*string*>, formato para logs de errores.

TypeScript
``` TS
import { Logger, NIVEL_LOG, formato_defecto, formato_error_defecto } from "logger";

const log = new Logger("Archivo_Log.log", "ruta/archivo", NIVEL_LOG.TODOS, formato_defecto, formato_error_defecto);
```

JavaScript (NodeJS)
``` JS
const {Logger, NIVEL_LOG, formato_defecto, formato_error_defecto } = require("logger");

const log = new Logger("Archivo_Log.log", "ruta/archivo", NIVEL_LOG.TODOS, formato_defecto, formato_error_defecto);
```
### Cambiar parámetros de la clase

Todos los parámetros de la clase pueden ser modificados cuando se desee. Al establecer un nuevo valor este funcionará igual que al establecerlo en el constructor. También es posible ver su actual valor.

TypeScript
```TS
import { Logger } from "Logger";

const log = new Logger();

log.log_archivo("Log en el archivo por defecto");

//Para visualizar las propiedades
console.log(log.fichero);
console.log(log.ruta);

//Para modificar una propiedad
log.fichero = "./archivo.log";
//Al modificar la ruta también cambiará la ruta del fichero
log.ruta = "./tmp";

log.log_archivo("Log en un archivo diferente");

console.log(log.fichero);
console.log(log.ruta);
```

JavaScript
```JS
const { Logger } = require("logger");

const log = new Logger();

log.log_archivo("Log en el archivo por defecto");

//Para visualizar las propiedades
console.log(log.fichero);
console.log(log.ruta);

//Para modificar una propiedad
log.fichero = "./archivo.log";
//Al modificar la ruta también cambiará la ruta del fichero
log.ruta = "./tmp";

log.log_archivo("Log en un archivo diferente");

console.log(log.fichero);
console.log(log.ruta);
```

### Logs
La clase logger ofrece dos formas de registrar los logs, mediante la consola o en un archivo. Estos a su vez ofrecen distintos tipos de logs, cada tipo tendrá su [prioridad](#niveles-log).

Todos los métodos, independientemente del nivel y la manera de registrarlo, reciben 3 parámetros. Siendo dos de ellos opcionales.

1. **msg** <*string*>, mensaje del log, es el único parámetro obligatorio.
2. **config** <*LoggerConfig*>, configuración especifica para el log (fichero, formato y/o colores). En caso de no querer modificar la configuración, pero sea necesario pasar un tercer parámetro, bastará con un objeto vacío (valor por defecto).  
3. **error** <*Error*>, excepción de la que se obtiene datos del error. En caso de no recibir ninguna, su valor por defecto, será una instancia de la clase Error (permite obtener ciertos datos como el fichero, el método o la línea desde donde se ha llamado).

TypeScript
```TS
import { Logger } from "Logger";

const log = new Logger();

log.log_consola("Muestra log de consola 1");
log.info_consola("Muestra log de consola 2");
log.aviso_consola("Muestra log de consola 3");
log.error_consola("Muestra log de consola 4");
log.fatal_consola("Muestra log de consola 5");

log.log_archivo("Muestra log de archivo 1");
log.info_archivo("Muestra log de archivo 2");
log.aviso_archivo("Muestra log de archivo 3");
log.error_archivo("Muestra log de archivo 4");
log.fatal_archivo("Muestra log de archivo 5");
```

JavaScript
```JS
const { Logger } = require("logger");

const log = new Logger();

log.log_consola("Muestra log de consola 1");
log.info_consola("Muestra log de consola 2");
log.aviso_consola("Muestra log de consola 3");
log.error_consola("Muestra log de consola 4");
log.fatal_consola("Muestra log de consola 5");

log.log_archivo("Muestra log de archivo 1");
log.info_archivo("Muestra log de archivo 2");
log.aviso_archivo("Muestra log de archivo 3");
log.error_archivo("Muestra log de archivo 4");
log.fatal_archivo("Muestra log de archivo 5");
```

Formato error

TypeScript
```TS
import { Logger } from "Logger";

const log = new Logger();

try {
    log.log_consola("Log normal");

    //También es posible instanciar un error y mostrará el formato error
    log.log_consola("Log error", {}, new Error("Excepcion"));

    //Se lanza una excepcion
    throw new SyntaxError("Excepcion");
} catch (e) {
    //Se le pasa la excepcion haciendo casting a la clase error
    log.log_consola("Log error", {}, <Error>e);
}
```

JavaScript
```JS
const { Logger } = require("logger");

const log = new Logger();

try {
    log.log_consola("Log normal");

    //También es posible instanciar un error y mostrará el formato error
    log.log_consola("Log error", {}, new Error("Excepcion"));

    //Se lanza una excepcion
    throw new SyntaxError("Excepcion");
} catch (e) {
    //Se le pasa la excepcion haciendo casting a la clase error
    log.log_consola("Log error", {}, e);
}
```

### Formatos

La clase logger maneja dos formatos de logs. 
- **Formato Normal**, formato por defecto para los logs.
- **Formato Errores**, formato para los errores. Este formato es usado al pasarle una excepción en la llamada para el log.

Las constantes **formato_defecto**  y **formato_error_defecto**, permiten acceder al valor por defecto que tienen los formatos.

``` TS
//Formato por defecto
export const formato_defecto = "(%{T})[%{D}-%{M}-%{Y}, %{H}:%{i}] - %{R}";
// Formato de error por defecto
export const formato_error_defecto = "(%{T})[%{D}-%{M}-%{Y}, %{H}:%{i}]( %{N} {%{F},%{L}} [%{E}] - {%{A}}) - %{R}";
```
Para crear un formato propio, existen ciertos parámetros que podrán sustituirse por su correspondiente valor. Todos estos parámetros han de estar entre `%{}`, por ejemplo `%{T}`

| Parámetro | Valor                                                             |
|:---------:|-------------------------------------------------------------------|
| **s**     | Muestra los segundos                                              |
| **i**     | Muestra los minutos                                               |
| **H**     | Muestra las horas                                                 |
| **D**     | Muestra el día                                                    |
| **M**     | Muestra el mes                                                    |
| **Y**     | Muestra el año                                                    |
| **T**     | Muestra el tipo de log                                            |
| **F**     | Muestra el módulo donde se lanza el error o se llama al método    |
| **A**     | Muestra el archivo donde se lanza el error o se llama al método   |
| **R**     | Muestra el mensaje pasado al método                               |
| **L**     | Muestra la línea donde se lanza el error o se llama al método     |
| **N**     | Muestra el nombre del error                                       |
| **E**     | Muestra el mensaje del error                                      |
| **CR**    | Pinta de color rojo (Consola)                                     |
| **CA**    | Pinta de color azul (Consola)                                     |
| **CV**    | Pinta de color verde (Consola)                                    |
| **CM**    | Pinta de color amarillo (Consola)                                 |
| **CF**    | Marca el fin de coloreado                                         |

### LoggerConfig - Configuración de Log
Al registrar un log, es posible establecer una configuración específica para el log. La interfaz LoggerConfig (TypeScript), permite establecer las propiedades de un objeto de configuración (existe otro llamado LoggerConfigE, es posible que aparezca como una recomendación del IDE, similar pero sin las propiedades opcionales, su uso se limita al funcionamiento interno de la librería).  

LoggerConfig posee tres propiedades, todas opcionales:
- **colores** <*ColoresLogger*>, permite establecer una paleta de colores personalizada. No es posible modificar la paleta de los [log de archivo](#colores). 
- **fichero** <*string*>, permite establecer un fichero específico para el log (la ruta será la misma que la de la clase). **Esta propiedad solo afecta a los log de archivo**
- **formato** <*string*>, permite establecer un formato específico para el registro, independientemente de los formatos por defecto.

TypeScript
```TS
import { Logger, LoggerConfig } from "Logger";

const log = new Logger();

const config: LoggerConfig = {
    formato: "Nuevo Formato -> %{R}",
    fichero: "Archivo.log"
};

log.log_consola("Log normal", config);
log.log_archivo("Log normal", config);

//El formato de config tendrá prioridad sobre el formato de error
log.log_consola("Log error", config, new Error("Excepcion"));
```

JavaScript
```JS
const { Logger } = require("logger");

const log = new Logger();

const config = {
    formato: "Nuevo Formato -> %{R}",
    fichero: "Archivo.log"
};

log.log_consola("Log normal", config);
log.log_archivo("Log normal", config);

//El formato de config tendrá prioridad sobre el formato de error
log.log_consola("Log error", config, new Error("Excepcion"));
```

#### Colores
Es posible establecer colores, en los formatos, estos únicamente se muestran por consola, en un archivo se mostraría el código del color. Sin embargo, la aplicación permite cambiar la paleta de colores en las llamadas a los logs, como un objeto dentro del objeto de [configuración de los log](#loggerconfig-configuración-de-log).

Como los códigos de colores se verían en los archivos, pudiendo quedar algo como, por ejemplo, '\x1b[31mRojo\x1b[0m', los colores están inhabilitados para los log de tipo archivo. Aunque se pase en la configuración, en el formato los parámetros de los colores se sustituyen por "".

Para TypeScript existe una interfaz que facilita la creación de un objeto de colores, ColoresLogger. La interfaz especifica 5 colores:
- **AMARILLO** <*string*>, color amarillo, su valor se sustituye por el parámetro **CM** en el formato.
- **AZUL** <*string*>, color azul, su valor se sustituye por el parámetro **CA** en el formato.
- **ROJO** <*string*>, color rojo, su valor se sustituye por el parámetro **CR** en el formato.
- **VERDE** <*string*>, color verde, su valor se sustituye por el parámetro **CV** en el formato.
- **FINC** <*string*>, indica el fin del coloreado, su valor se sustituye por el parámetro **CF** en el formato.

Cada color no ha de corresponder necesariamente con el nombre de la propiedad, esto permite intercambiar colores sin necesidad de cambiar el formato. 

El objeto **Colores** permite acceder a los valores por defecto

| Color         | Valor            |
|:-------------:|:----------------:|
| *FINC*        | **\x1b[0m**      |
| *ROJO*        | **\x1b[31m**     |
| *VERDE*       | **\x1b[32m**     |
| *AMARILLO*    | **\x1b[33m**     |
| *AZUL*        | **\x1b[34m**     |

```TS
import { Colores, ColoresLogger, Logger, LoggerConfig } from "Logger";

const log = new Logger();

const colores: ColoresLogger = {
    AMARILLO: Colores.AMARILLO,
    AZUL: "\x1b[36m",
    ROJO: Colores.ROJO,
    VERDE: Colores.VERDE,
    FINC: Colores.FINC
}

const config: LoggerConfig = {
    formato: "%{CA}%{R}%{CF}",
    colores: colores
};

log.log_consola("Texto Cian", config);
config.colores = Colores;
log.log_archivo("Texto Azul", config);
```

```JS
const { Logger, Colores } = require("logger");

const log = new Logger();

const colores = {
    AMARILLO: Colores.AMARILLO,
    AZUL: "\x1b[36m",
    ROJO: Colores.ROJO,
    VERDE: Colores.VERDE,
    FINC: Colores.FINC
}

const config = {
    formato: "%{CA}%{R}%{CF}",
    colores: colores
};

log.log_consola("Texto Cian", config);
config.colores = Colores;
log.log_consola("Texto Azul", config);
```

### NIVELES LOG
La librería permite establecer un nivel mínimo para mostrar los distintos tipos de registro.

Al establecer un nivel, todos aquellos niveles inferiores no se mostrarán. Para establecer un nivel, el enum **NIVEL_LOG**, permite establecer el nivel mínimo (cada nivel tiene asignado un valor numérico), también es posible establecer el nivel mediante números. 

| Nivel     | Valor  |
|:---------:|:------:|
| *TODOS*   | **0**  |
| *LOG*     | **1**  |
| *INFO*    | **2**  |
| *AVISO*   | **3**  |
| *ERROR*   | **4**  |
| *FATAL*   | **5**  |
| *NINGUNO* | **6**  |

TypeScript
```TS
import { Logger, NIVEL_LOG } from "logger";

const log = new Logger();

log.nivel = NIVEL_LOG.ERROR;
// Es posible también usar un valor numerico (NIVEL_LOG.ERROR es igual a 4)
log.nivel = 4;
```

JavaScript (NodeJS)
```JS
const {Logger, NIVEL_LOG } = require("logger");

const log = new Logger();

log.nivel = NIVEL_LOG.ERROR;
// Es posible también usar un valor numerico (NIVEL_LOG.ERROR es igual a 4)
log.nivel = 4;
```

## Clase Logger_DB

Clase que extiende a [Logger](#clase-logger). Permitiendo usar los metodos de Logger junto a los específicos de *Logger_DB*. 

*Logger_DB* establece metodos genericos para guardar los registros en bases de datos a traves de **callbacks**.

### Constructor Logger_DB
Logger_DB recibe tres parámetros. Todos son opcionales. 

1. **config_conexion** <*T*>, configuracion para establecer la conexion. En TypeScript el tipo de este se establece con el tipo generico. 
2. **funcion_insertar_log** <*Funcion_insertar&lt;T&gt;*>, funcion para insertar el log en la base de datos. Por defecto es una funcion vacia.
3. **funcion_comprobar_conexion** <*Funcion_comprobar&lt;T&gt;*>, permite comprobar la conexion. Se ejecuta al cambiar la configuración de conexion, si la funcion devuelve **false** (se supone que por que la conexion ha fallado), se lanza una excepcion. La funcion por defecto devuelve siempre true. 

El constructor admite los tambien los metodos de [Logger](#constructor). 

Para crear una instancia de la clase, no es posible usar el constuctor. Logger_DB ofrece un metodo estatico, que hace una comprobación de la conexion, mediante la función para comprobar la conexion.

El metodo estatico **InstanciarClase**, devuelve una instancia de clase. Es un metodo asincrono

```TS
import { Funcion_comprobar, Funcion_insertar, Logger_DB } from "logger";
import { ConnectionConfig, createConnection } from "mysql";

const config = {
    password: "contraseña",
    host: "localhost",
    database: "test",
    user: "USUARIO"
}

const comprobarConexion: Funcion_comprobar<ConnectionConfig> = async (config) => {
    //Crea la conexion
    const con = createConnection(config);
    //Intenta establecer la conexion.
    con.connect((err) => {
        if (err) {
            //En caso de haber un error devuelve un error
            return false;
        }
    });

    //Destruye la conexion
    con.destroy();
    //Devuelve la conexion
    return true;
}

const insertarQuery: Funcion_insertar<ConnectionConfig> = async (quer, config) => {
    //Crea la conexion
    const con = createConnection(config);
    //Inicia la conexion con la base de datos
    con.connect();

    //Ejecuta la query para insertar el log
    con.query(`Insert into pruebas values ('${quer}')`, function (err, fias) {
        if (err) {
            //En caso de error lo muestra por consola
            console.log("Error", err.message);
            return;
        }
        //En caso de una ejecucion correcta muestra un mensaje en la consola
        console.log("Consulta ejecutada con éxito:", fias);
    });
    //Finaliza la conexion
    con.end();
}

//Funcion asincrona main
async function main() {
    try {
        //Instancia la clase con el metodo generico
        const log = await Logger_DB.InstanciarClase<ConnectionConfig>(config, insertarQuery, comprobarConexion);

        //Los niveles de log funciona. Su funcionamiento es igual que Logger-TS
        log.log_base_datos("Log en base de datos 1")
        log.info_base_datos("Log en base de datos 2");
        log.aviso_base_datos("Log en base de datos 3");
        log.error_base_datos("Log en base de datos 4");
        log.fatal_base_datos("Log en base de datos 5");
    } catch (e) {
        console.log("Error: ", <Error>e.name);
    };
}

main();
```

```JS
const { Logger_DB } = require("logger");
const { createConnection } = require("mysql");

const config = {
    password: "contraseña",
    host: "localhost",
    database: "test",
    user: "USUARIO"
}

const comprobarConexion = async (config) => {
    //Crea la conexion
    const con = createConnection(config);
    //Intenta establecer la conexion.
    con.connect((err) => {
        if (err) {
            //En caso de haber un error devuelve un error
            return false;
        }
    });

    //Destruye la conexion
    con.destroy();
    //Devuelve la conexion
    return true;
}

const insertarQuery = async (quer, config) => {
    //Crea la conexion
    const con = createConnection(config);
    //Inicia la conexion con la base de datos
    con.connect();

    //Ejecuta la query para insertar el log
    con.query(`Insert into pruebas values ('${quer}')`, function (err, fias) {
        if (err) {
            //En caso de error lo muestra por consola
            console.log("Error", err.message);
            return;
        }
        //En caso de una ejecucion correcta muestra un mensaje en la consola
        console.log("Consulta ejecutada con éxito:", fias);
    });
    //Finaliza la conexion
    con.end();
}

//Funcion asincrona main
async function main() {
    try {
        //Instancia la clase con el metodo generico
        const log = await Logger_DB.InstanciarClase(config, insertarQuery, comprobarConexion);

        //Los niveles de log funciona. Su funcionamiento es igual que Logger-TS
        log.log_base_datos("Log en base de datos 1")
        log.info_base_datos("Log en base de datos 2");
        log.aviso_base_datos("Log en base de datos 3");
        log.error_base_datos("Log en base de datos 4");
        log.fatal_base_datos("Log en base de datos 5");
    } catch (e) {
        console.log("Error: ", e.name);
    };
}

main();
```

### Tipo Generico T
Permite establecer el tipo de la configuracion para la conexión (en TypeScript). El tipo generico determina el tipo de configuración de la conexion para la instancia.
```TS
const log = await Logger_DB.InstanciarClase<ConnectionConfig>(config, insertarQuery, comprobarConexion);
```

&lt;ConnectionConfig&gt; define el tipo de configuracion de la instancia para acceder a la base de datos. En este caso, el tipo sera la interfaz de configurion de mysql *ConnectionConfig*

### LoggerDB_Config&lt;T&gt;
Extiende de [Logger_Config](#loggerconfig-configuración-de-log). 
Permite declarar la configuracion y funciones para la conexion de la base de datos.

LoggerDB_Config&lt;T&gt; posee tres propiedades, todas son opcionales:
- **config_conexion** <*T*>, permite sustituir la configuracion para la conexion. 
- **funcion_insertar** <*Funcion_insertar&lt;T&gt;*>, permite cambiar la funcion para insertar en la base de datos.
- **funcion_comprobar** <*Funcion_comprobar&lt;T&gt;*>, permite cambiar la funcion para comprobar la conexion (La funcion se ejecuta al cambiar la funcion de insertar, en caso de solo cambiar funcion de comprobar esta no se utulizara).
