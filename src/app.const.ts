import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export enum SystemConfigurationKeys {
    MailchimpKey ="MailchimpKey",
}

export enum SystemStorageKeys {
    UploadPathMobileUserActivityRemote = 'UploadPathMobileUserActivityRemote',
}

export const swaggerTags = {
    auth: '#auth',
    mobileMetaData: 'mobile-metadata',
}

export const apiBaseRoutes = {
    base: 'api',
    auth: 'auth',
    mobile: 'mobile',
}

export const tokenScheme = 'bearer';

export const bearerAuthConfig: SecuritySchemeObject = {
    description: 'Default',
    type: 'http',
    scheme: tokenScheme,
    bearerFormat: 'JWT',
    in: 'header',
}

export enum LogTypes {
    Console = 'console',
    Info = 'info',
    Error = 'error',
    Warn = 'warn',
    Debug = 'debug',
    Verbose = 'verbose',
}

export enum UserTypes {
    ADMIN = 'admin',
    PARENT = 'parent',
    CHILD = 'child'
}

