'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void; // Aceita uma única string
    onRemove: () => void; // Remove a URL
    value: string; // Uma única string
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onUpload = (result: any) => {
        console.log("Upload Result:", result);
        if (result?.info?.secure_url) {
            onChange(result.info.secure_url); // Passa uma única string
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value && ( // Verifica se há uma URL
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                className="cursor-pointer"
                                type="button"
                                onClick={onRemove} // Chama onRemove sem argumentos
                                variant="destructive"
                                size="icon"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="image"
                            src={value} // Usa a única URL
                        />
                    </div>
                )}
            </div>
            <CldUploadWidget onSuccess={onUpload} uploadPreset="q1jqucpt">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };

                    return (
                        <Button
                            className="cursor-pointer"
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            Upload da Imagem
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;