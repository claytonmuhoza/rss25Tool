import React from 'react'

interface FileUploaderProps {
  file: File | null
  onFileSelect: (file: File | null) => void
}

const FileUploader: React.FC<FileUploaderProps> = ({ file, onFileSelect }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    onFileSelect(selectedFile)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Fichier XML à transférer</label>
      <input
        type="file"
        accept=".xml"
        onChange={handleChange}
        className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none"
      />
      {file && <p className="text-sm text-gray-600 mt-2">Fichier sélectionné : {file.name}</p>}
    </div>
  )
}

export default FileUploader
