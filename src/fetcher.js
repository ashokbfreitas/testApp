import config from "./config.json";

const getAllBackups = async () => {
    const fetchURL = `${config.server_host}`;
    let result = await fetch(
        fetchURL,
        {
            method: 'GET',
        }
    );
    return result.json();
}

const getFilteredData = async(department, environment) => {
    const fetchURL = `${config.server_host}?${department}&${environment}`;
    let result = await fetch(
        fetchURL,
        {
            method: 'GET',
        }
    );
    return result.json();
}

export {
    getAllBackups, getFilteredData
};