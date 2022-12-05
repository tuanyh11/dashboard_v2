import { useEffect, useState } from "react"

const usePreviewFile = (file) => {

    const [imgSrc, setImgSrc] = useState()

    useEffect(() => {
        if(file && file[0]) {
            setImgSrc(URL.createObjectURL(file))
        }
        return () => URL.revokeObjectURL(imgSrc)
    }, [file])

    return 
}

export default usePreviewFile