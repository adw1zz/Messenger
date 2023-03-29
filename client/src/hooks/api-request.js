import {useState} from 'react';

export const useFetching = (callback) => {
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args) => {
        try {
            setIsloading(true);
            await callback(...args);
        } catch (e) {
            console.log(e);
            setError(e.message);
        } finally {
            setIsloading(false);
        }
    }

    return [fetching, isLoading, error];
}