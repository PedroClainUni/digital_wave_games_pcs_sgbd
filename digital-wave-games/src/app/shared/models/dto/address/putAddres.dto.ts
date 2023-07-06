export interface PutAddressDTO {
    id: number,
    postalCode: string,
    city: string,
    district: string,
    street: string,
    number: string,
    additionalInfo: string,
    state: string,
    cep: string
}