import {useState} from 'react';

export const useFetching = (callback) => {
    const [isLoading, setIsloading] = useState(false);

    const fetching = async (...args) => {
        try {
            setIsloading(true);
            await callback(...args);
        } catch (e) {
            console.log(e);
        } finally {
            setIsloading(false);
        }
    }

    return [fetching, isLoading];
}