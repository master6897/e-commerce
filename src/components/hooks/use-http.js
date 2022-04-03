import {useState, useCallback} from 'react';
const useHttp = (applyData = null) => {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const sendRequest = useCallback(async (requestConfig) => {
        setIsLoading(true);
        setError(null);
        try{
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body? JSON.stringify(requestConfig.body) : null
            });
            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const data = await response.json();

            setIsLoading(false);
            setIsDone(true);
            if(applyData !== null){
                applyData(data);
            }
            return data;
        }catch (err){
            setError(err);
        }
    }, [applyData]);

    return{
        sendRequest,
        error,
        isLoading,
        isDone
    }
}
export default useHttp;