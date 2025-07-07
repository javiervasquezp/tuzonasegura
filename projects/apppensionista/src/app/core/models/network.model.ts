export interface NetworkSuccess<T> {
	Message: string;
    Details: string;
    Fecha: string;
    Codigo : string;
	Result: T;
	IsSuccess: boolean;
}
