import { LoginInfo } from './categorias/login-info';
import { Rol } from '../../usuaries/interfaces/rol';
import { Grupo } from '../../usuaries/interfaces/grupo';
import { MisDatos } from '../../usuarix-actual/interfaces/mis-datos';
import { Usuarie } from '../../usuaries/interfaces/usuarie';
import { Categoria } from './categorias/categoria';


export type ServerResponseStatus = string;

export const STATUS_OK: ServerResponseStatus = "OK";
export const STATUS_ERROR: ServerResponseStatus = "ERROR";

export interface ServerResponse {
    status: ServerResponseStatus;
    error?: string;
}

// ----------------------------------------------------------------------------
// Auth
// ----------------------------------------------------------------------------
export interface ServerResponseLogin extends ServerResponse {
    data: string;
  }

export interface ServerResponseLoginPrueba extends ServerResponse {
    data: LoginInfo;
  }


export interface ServerResponseArchivos extends ServerResponse {
    filename: string;
}

export interface ServerResponseTitulos extends ServerResponse {
    data: any;
}


// ----------------------------------------------------------------------------
// Importador 
// ----------------------------------------------------------------------------
export interface ServerResponseImportador extends ServerResponse {
    dataCargadosCorrectamente: number;
    dataRegistrosTotales: number;
}

// ----------------------------------------------------------------------------
// Roles
// ----------------------------------------------------------------------------
export interface ServerResponseRol extends ServerResponse {
    data: Rol[];
}

// ----------------------------------------------------------------------------
// Grupos
// ----------------------------------------------------------------------------
export interface ServerResponseGrupo extends ServerResponse {
    data: Grupo[];
}

// ----------------------------------------------------------------------------
// Usuarix Actual
// ----------------------------------------------------------------------------
export interface ServerResponseUsuarix extends ServerResponse {
    data: Usuarie;
}

export interface ServerResponseUsuarios extends ServerResponse {
    data: Usuarie[];
}

export interface ServerResponseMisDatos extends ServerResponse {
    data: MisDatos;
}

export interface ServerResponseCategorias extends ServerResponse {
    data: Categoria[];
}

