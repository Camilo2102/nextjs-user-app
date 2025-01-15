import { EventSourceMessage, fetchEventSource } from "@microsoft/fetch-event-source"
import axios from "axios";

type Headers = { [key: string]: string };

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';
    headers?: Headers;
    body?: any;
}

interface ApiInstanceOptions {
    baseURL: string;
    headers?: Headers;
}

interface ServerSideEventInstanceOptions {
    baseURL?: string;
    signal?: AbortSignal
    body?: any
    onopen?: (response: Response) => void | Promise<void>;
    onclose?: () => void;
    onmessage: (msg: EventSourceMessage) => void;
    onerror?: (err: any) => void;
}

export function createApiInstance(options: ApiInstanceOptions) {
    return async <T = any>(endpoint: string, fetchOptions: FetchOptions = {}): Promise<T> => {
        const { baseURL, headers: defaultHeaders } = options;
        const { method = "GET", headers = { 'Content-Type': 'application/json' }, body } = fetchOptions;

        const response = await fetch(`${baseURL}${endpoint}`, {
            method,
            headers: { ...defaultHeaders, ...headers },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json() as Promise<T>;
    };
}


export function createApiGatewayApiInstance(url: string) {
    const baseURL = url || "http://localhost:7878/api";

    return axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function createServerSideEventInstance(endpoint: string, options: ServerSideEventInstanceOptions) {
    return () => fetchEventSource(`${options.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options.body),
        signal: options.signal ?? new AbortController().signal,
        async onopen(response) {
            if (response.ok && response.headers.get('content-type') === "application/stream+json") {
                return;
            }
            options.onopen && options.onopen(response);
        },
        onclose() {
            options.onclose && options.onclose();
            throw "Conection closed";
        },
        onmessage(msg) {
            options.onmessage(msg);
        },
        onerror(err) {
            if (err) {
                options.onerror && options.onerror(err);
                throw err;
            }
        }
    })

}

export function createApiGatewayServerSideEventInstance(endpoint: string, options: ServerSideEventInstanceOptions) {
    const { baseURL, ...data } = options;

    if (process.env.NEXT_PUBLIC_API_URL) return createServerSideEventInstance(endpoint, { baseURL: process.env.NEXT_PUBLIC_API_URL, ...data });

    console.error("No api gateway variable using local");

    return  createServerSideEventInstance(endpoint, { baseURL: "http://localhost:5860", ...data });
}