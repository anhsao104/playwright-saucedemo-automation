export const users = {
    standard:{
        username: (process.env.USER_NAME as string) || 'standard_user',
        password: (process.env.USER_PASSWORD as string) || 'secret_sauce'
    },
    invalid:{
        username:'invalid_user',
        password:'wrong_password'
    }
}