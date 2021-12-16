import { ColoresLogger } from "./ColoresLogger";

/** 
 *Interfaz que define todas las opciones de configuracion posibles, todas opcionales
*/
export interface LoggerConfig {
    fichero?: string;
    formato?: string;
    colores?: ColoresLogger;
}

/**
 * Interfaz que define los mismos parametros que LoggerConfig sin ser opcionales
 * @see {@link LoggerConfig}
 */
export interface LoggerConfigE {
    fichero: string;
    formato: string;
    colores: ColoresLogger;
}

/**
 * Interfaz de configuración para Logger-DB
 * @extends LoggerConfig
 */
export interface LoggerDB_Config<T> extends LoggerConfig{
    config_conexion?: T;
    function_insertar?  : Funcion_insertar<T>;   
}

/**
 * Interfaz de configuración para Logger-DB
 * @extends LoggerConfigE
 */
 export interface LoggerDB_ConfigE<T> extends LoggerConfigE{
    config_conexion: T;
    function_insertar  : Funcion_insertar<T>;   
}

/**
 * Tipo para las funciones de comprobacion de Logger
 */
export type Funcion_comprobar<T> = (config: T) => Promise<boolean>;

/**
 * Tipo para las funciones de inserccion de Logger
 */
export type Funcion_insertar<T> = (log: string, config: T) => Promise<void>;