import  { useCallback, useState } from 'react';
function UseHttp() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const sendRequest = useCallback(async (requestConfig,applydata) => {
        try {
        setIsLoading(true);
        setError(null);
        let response = await fetch(
            requestConfig.url,
            {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            }
        );
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        let data = await response.json();
        applydata(data);
        } catch (error) {
        console.log(error);
        setError(error.massage || "Something went worng!");
        }
        setIsLoading(false);
    },[]);
    return {
        isLoading,
        error,
        sendRequest
    }

}

export default UseHttp;