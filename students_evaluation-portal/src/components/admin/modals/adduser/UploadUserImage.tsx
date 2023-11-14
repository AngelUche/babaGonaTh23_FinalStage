// jshint esversion:6
import { EditSVG } from "../../../../assets/admin";
import defaultAvatar from "../../../../assets/admin/defaultUserProfile.webp";



interface UploadImageProps {
  setPreviewImage:any,
   previewImage:string
}

export function UploadUserImage({  setPreviewImage,previewImage}:UploadImageProps) {


    // Submit Image
    function handleImageFileUpload(event: any) {
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        // submitImage(event);
    }

    return (
        <div className="relative w-full h-full">
            <img className="w-full h-full" src={previewImage?previewImage:defaultAvatar} alt="" />
            <div className="absolute inset-0">
                {/* Image  */}
                <div className="relative w-full h-full overflow-hidden">
                    <label className="absolute top-2 right-2" htmlFor="imageFileUpload"> <span className="text-[#ffffff]"><EditSVG size={20} /></span></label>
                    <input className="absolute inset-0 cursor-pointer opacity-0 " type="file" id="imageFileUpload" onChange={handleImageFileUpload} />
                </div>
            </div>
        </div>
    );
}
