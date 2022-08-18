import { DeleteResult, InsertResult, UpdateResult } from "typeorm";

export const apiResponseSchemes: Function[] = [];

export const addToResponseSchemes = (schema: any[]): void => {
    apiResponseSchemes.push(...schema);
}

export const printApiDomainUrl = (port: string | 3333, prefix: string): void => {
    console.log(`Api ready on http:\\localhost:${port}/${prefix}`)
}

export const generateEmailTokenUrl = (baseUrl: string, email: string, token: string): string => {
    // return `${baseUrl}/auth/parent/confirmation?email=${email}&token=${token}`;
    return `${baseUrl}?email=${email}&token=${token}`;
}

export const generateResetPasswordUrl = (clientUrl: string, token: string): string => {
    return `${clientUrl}?token=${token}`;
}

export const isDateExpired = (date: Date): boolean => {
    return new Date(date).getTime() - new Date().getTime() < 0
}

export const setExpirationDate = (minutes: number): Date => {
    return new Date(new Date().getTime() + minutes*60000)
}

export const typeReturn = async <T>(mutation: Promise<UpdateResult | DeleteResult | InsertResult>): Promise<T> => {
    return await mutation.then((res) => Array.isArray(res?.raw) ? res.raw[0] : res);
  };

