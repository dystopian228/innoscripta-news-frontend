type ApiResponse<T> = {
    data: T;
    message: string|null;
}

export default ApiResponse;