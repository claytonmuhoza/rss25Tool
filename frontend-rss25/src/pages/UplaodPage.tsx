// src/pages/UploadPage.tsx
import React, { useState } from 'react'
import type { TransferResult } from '../types/TransfertResult'
import ServerUrlInput from '../components/ServerUrlInput'
import FileUploader from '../components/FileUploader'
import TransferButton from '../components/TransferButton'
const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [serverUrl, setServerUrl] = useState<string>('http://localhost:8080/rss25SB/insert')
  const [result, setResult] = useState<TransferResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTransfer = async () => {
    if (!file || !serverUrl) {
      alert('Veuillez sélectionner un fichier et renseigner l’URL du serveur.')
      return
    }

    setIsLoading(true)
    try {
      const formData = await file.text()
      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: formData
      })

      const text = await response.text()
      const parser = new DOMParser()
      const xml = parser.parseFromString(text, 'application/xml')
      const status = xml.querySelector('status')?.textContent || 'ERROR'
      const id = xml.querySelector('id')?.textContent || null
      const description = xml.querySelector('description')?.textContent || null

      setResult({ status, id, description })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        console.log(error)
      setResult({ status: 'ERROR', description: 'Erreur lors du transfert.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Transfert de flux RSS25SB</h1>

        <ServerUrlInput serverUrl={serverUrl} onChange={setServerUrl} />
        <FileUploader file={file} onFileSelect={setFile} />
        <TransferButton onClick={handleTransfer} loading={isLoading} />

        {result && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <p className="font-semibold">Statut : <span className="text-blue-600">{result.status}</span></p>
            {result.id && <p>ID inséré : <span className="text-green-700">{result.id}</span></p>}
            {result.description && <p>Description : {result.description}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadPage
