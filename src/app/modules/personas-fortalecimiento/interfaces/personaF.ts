export interface PersonaF{
    ID:             number;
	Orden:          number;
	Apellido: 		string;
	NombreAutopercibido: 		string;
	FechaNac:       Date | string;
	TipoDocumento:  string;
	NroDocumento:   string;
	Email:          string;
	Provincia:      string;
	Localidad:      string;
	Municipio:      string;
	FuenteIngreso: 		string[];
}