import { API_URL } from '../../environments/environment';

const BASE_URL : string = API_URL;

// AUTH ENDPOINTS
export const authEndpoints = {
    LOGIN_API: BASE_URL + "/login",
}

// Metadata ENDPOINTS
export const MetadataEndpoints = {
    EXIF_API: BASE_URL + "/exif",
    HEADER_API: BASE_URL + "/headerstructure",
}