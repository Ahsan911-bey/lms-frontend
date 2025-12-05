"use client";

import { ChangeEvent, useState } from "react";
import { Upload, X, Check, Loader2 } from "lucide-react";

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    label?: string;
    accept?: string;
}

export default function FileUpload({ onFileSelect, label = "Upload File", accept }: FileUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            onFileSelect(file);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
    };

    return (
        <div className="w-full">
            {!selectedFile ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> {label}
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 10MB)</p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        accept={accept}
                        onChange={handleFileChange}
                    />
                </label>
            ) : (
                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <Check className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="truncate">
                            <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                                {selectedFile.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={removeFile}
                        className="p-1 hover:bg-red-100 rounded-full transition-colors text-gray-400 hover:text-red-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
