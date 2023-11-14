// jshint esversion:6
import Webcam from "react-webcam"
import { useRef, useState, useCallback } from "react"
import {ImCancelCircle} from 'react-icons/im'

type CustomWebcamProp = {
    closeModal: () => void
    setImageURL: (imgSrc: any | null) => void
    setProfileImage:any
}

export const CustomWebcam: React.FC<Partial<CustomWebcamProp>> = ({ closeModal, setImageURL,setProfileImage }) => {
    const webcamRef = useRef<Webcam>(null);
    
    const [imgSrc, setImgSrc] = useState<any | null>(null);

    // create a capture function
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            const imgFile = urltoFile(imageSrc, "User image");
            setImgSrc(imgFile);
        }
       
        
    }, [webcamRef]);

    // Retake picture
    const retake = () => {
        setImgSrc(null);
    };

    // Save image
    const saveImage = () => {
        if (setImageURL) {
            setImageURL(imgSrc);
        }
        
        if (closeModal) {
            closeModal();
        }
    
        if (setProfileImage) {
            setProfileImage();
        }
    }
    

    function urltoFile(url: string, filename: string,) {
     

        const byteString = atob(url.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const byteArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          byteArray[i] = byteString.charCodeAt(i);
        }
        
        // Create a new File
        const file = new File([byteArray], filename, { type: "image/png" });
        
        // Create a preview link
        Object.assign(file, { preview: URL.createObjectURL(file) })
        
        return file;
        
      }
      // console.log(imgSrc);

    return (
        <>
            <div className="  fixed bg-black/40 z-[100] inset-0 flex items-center flex-col justify-center">
              {imgSrc?
                    <div className="relative h-max w-max md:ml-[200px]">
                        <img src={imgSrc.preview?imgSrc.preview :""} alt="webcam" />
                        <div className="absolute bottom-3 left-1/2 translate-x-[-50%] btn-container mt-2 z-[2]">
                            <div className="relative flex gap-x-3 [&>*]:w-[150px] z-[999]">
                                <button type="button" className="text-white bg-blue-500 py-2 px-4 rounded-md" onClick={retake}>Retake photo</button>
                                <button type="button" className="text-white bg-green-500 py-2 px-4 rounded-md" onClick={saveImage}>Save photo</button>
                            </div>
                        </div>
                    </div>
:
                    <div className="flex overflow-hidden relative w-maxh-max md:ml-[120px]">
                 <ImCancelCircle size={35} color="white" className="absolute top-1 z-[200] right-1 cursor-pointer" onClick={closeModal}/>

                        <Webcam height={"700"} width={"410"} ref={webcamRef} mirrored={true} screenshotQuality={1} screenshotFormat="image/png" />
                        <div className="absolute bottom-3 left-1/2 translate-x-[-50%] btn-container mt-2 z-[2]">
                            <button type="button" className="rounded-md text-white bg-blue-500 py-2 px-4" onClick={capture}>Capture photo</button>
                        </div>
                    </div>
}

                {/* <div className="controls mt-2">
                    <div>
                        <input
                            type="checkbox"
                            checked={mirrored}
                            onChange={(e) => setMirrored(e.target.checked)}
                        />
                        <label>Mirror</label>
                    </div>
                </div> */}
            </div>
        </>
    )
}