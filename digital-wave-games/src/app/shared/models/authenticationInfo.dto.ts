export interface AuthenticationInfo {
    username?: string,
    failedLoginAttempts?: number,
    nextAllowedAccess?: Date,
    banned?: boolean,
    resetFailedLoginAttempts?: Date,
    isEmailConfirmed?: boolean

}