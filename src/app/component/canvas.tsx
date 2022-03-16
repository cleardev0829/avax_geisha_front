import React, {FunctionComponent, useState} from 'react';

import { Geisha } from "../core/models/geisha";
import ClockLoader from "react-spinners/ClockLoader";
import {environment} from "../../environment";

export interface CanvasProps {
    geishaData: Geisha | undefined;
    className: string;
}

export const Canvas: FunctionComponent<CanvasProps> = ({ geishaData, className }) => {

    // const canvasRef = useRef(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /*
    useEffect(() => {
       // drawGeishaImage(geishas).then();
    },[geishaData]);

    const drawGeishaImage = async (geishas: Geisha | undefined) => {
        if(geishas) {
            const keys = ['background', 'body', 'face', 'hair', 'accessory', 'aura'];
            setIsLoading(true);
            const images = [];
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                // @ts-ignore
                if (geishas[key].length > 0) {
                    let path = '';
                    const image = await loadImage(path);
                    images.push(image);
                }
            }
            setIsLoading(false);
            const canvas: any = canvasRef.current;
            if(canvas) {
                const ctx = canvas.getContext('2d');
                for(let i = 0 ; i < images.length ; i++) {
                    const image = images[i];
                    ctx.drawImage(image, 0, 0);
                }
            }
        }
    }
    */

    return (
        <div>
            {
                isLoading ? (
                    <div className="d-flex w-100 h-100 justify-content-center">
                        <ClockLoader size={ 70 } color='white' />
                    </div>
                ) : (
                    // <canvas ref={canvasRef} className={className} width="512" height="512"/>
                    <img className={className} src={`${environment.serverUrl}/geisha/geisha-img/${geishaData?.id}`} alt="img" />
                )
            }
        </div>
    )
}
