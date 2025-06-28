import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils/cn"

const FileInput = forwardRef(
    ({ className, error = false, multiple = false, accept, onFileChange, children, ...props }, ref) => {
        const [dragActive, setDragActive] = useState(false)
        const [files, setFiles] = useState([])

        const handleFiles = (fileList) => {
            const newFiles = Array.from(fileList)
            setFiles(multiple ? [...files, ...newFiles] : newFiles)
            onFileChange?.(multiple ? [...files, ...newFiles] : newFiles)
        }

        const handleDrag = (e) => {
            e.preventDefault()
            e.stopPropagation()
            if (e.type === "dragenter" || e.type === "dragover") {
                setDragActive(true)
            } else if (e.type === "dragleave") {
                setDragActive(false)
            }
        }

        const handleDrop = (e) => {
            e.preventDefault()
            e.stopPropagation()
            setDragActive(false)
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFiles(e.dataTransfer.files)
            }
        }

        const handleChange = (e) => {
            e.preventDefault()
            if (e.target.files && e.target.files[0]) {
                handleFiles(e.target.files)
            }
        }

        const removeFile = (index) => {
            const newFiles = files.filter((_, i) => i !== index)
            setFiles(newFiles)
            onFileChange?.(newFiles)
        }

        return (
            <div className="space-y-2">
                <div
                    className={cn(
                        "relative border-2 border-dashed rounded-lg p-6 transition-colors",
                        dragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400",
                        error && "border-red-500",
                        className,
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        ref={ref}
                        type="file"
                        multiple={multiple}
                        accept={accept}
                        onChange={handleChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        aria-invalid={error}
                        {...props}
                    />
                    <div className="text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-primary">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{accept ? `Accepted formats: ${accept}` : "Any file type"}</p>
                        </div>
                    </div>
                </div>

                {/* File List */}
                {files.length > 0 && (
                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md border">
                                <div className="flex items-center space-x-2">
                                    <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-700">{file.name}</span>
                                    <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    },
)
FileInput.displayName = "FileInput"

export { FileInput }
