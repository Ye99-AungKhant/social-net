interface Config {
    ApiBaseUrl: string
}

export const config: Config = {
    ApiBaseUrl: process.env.REACT_APP_API_BASE_URL || '',
};