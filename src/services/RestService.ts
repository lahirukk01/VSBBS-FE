type TQueryParams = {
    [key: string]: string | number | boolean;
};

class RestService {
    baseUrl = '';
    static instance: RestService;

    constructor(baseUrl: string) {
        if (!RestService.instance) {
            this.baseUrl = baseUrl;
            RestService.instance = this;
        }

        return RestService.instance;
    }

    private buildUrl(route: string, queryParams: TQueryParams = {}): string {
        const query = Object.keys(queryParams)
            .map(key => `${key}=${queryParams[key]}`)
            .join('&');

        const queryString = query ? `?${query}` : '';

        return `${this.baseUrl}/${route}${queryString}`;
    }

    public async get(route: string, queryParams: TQueryParams = {}): Promise<any> {
        return fetch(this.buildUrl(route, queryParams))
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error));
    }

    public async post(route: string, body: any, queryParams: TQueryParams = {}): Promise<any> {
        return fetch(this.buildUrl(route, queryParams), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error));
    }

    public async put(route: string, body: any, queryParams: TQueryParams = {}): Promise<any> {
        return fetch(this.buildUrl(route, queryParams), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error));
    }

    public async delete(route: string): Promise<any> {
        return fetch(this.buildUrl(route, {}), {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error));
    }
}

export default new RestService(window.location.origin);
