import { useEffect, useState } from "react";
import io from 'socket.io-client';

const useRerender = () => {
    const [rerender, setRerender] = useState<boolean>(false);
    const socket = io('http://localhost:5000/');
    socket.on('re', (data) => {
        console.log(data);
        setRerender(true);
    });
    useEffect(() => {

        socket.on('render', () => {
            console.log(true);
            setRerender(true);
        });
    }, []);

    return rerender;
}

export default useRerender;
