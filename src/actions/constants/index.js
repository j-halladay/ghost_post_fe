export const domain = "http://localhost:8000"
export const jsonHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json"
}
const API_HOST = 'http://localhost:8000';

let _csrfToken = null;

async function getCsrfToken() {
    if (_csrfToken === null) {
        const response = await fetch(`${API_HOST}/csrf/`, {
            credentials: 'include',
        });
        const data = await response.json();
        _csrfToken = data.csrfToken;
    }
    return _csrfToken;
}


export const handleJsonResponse = res => {
    if (res.ok) {
        return res.json()
    }
    return res.json().then(result => {
        throw result
    })
}