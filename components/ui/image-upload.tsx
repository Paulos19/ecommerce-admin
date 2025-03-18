'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary'

interface ImageUploadProps {
    disabled?: boolean
    onChange: (value: string[]) => void
    onRemove: (value: string) => void
    value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Update the onUpload function to use the correct type
    const onUpload = (result: CloudinaryUploadWidgetResults) => {
        console.log("Upload Result:", result);

        // Handle the case where info may be a string or CloudinaryUploadWidgetInfo
        if (result?.info) {
            const secureUrl = typeof result.info === "string" ? result.info : result.info?.secure_url;
            if (secureUrl) {
                onChange([...value, secureUrl]);
            }
        }
    };
    
    if (!isMounted) {
        return null
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                className="cursor-pointer"
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onSuccess={onUpload} uploadPreset="q1jqucpt">
                {({ open }) => {
                    const onClick = () => {
                        open()
                    }

                    return (
                        <Button
                            className="cursor-pointer"
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className="h-4 w-4 mr-2"/>
                            Upload da Imagem
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload
