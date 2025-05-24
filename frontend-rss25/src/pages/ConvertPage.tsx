import React, { useState } from 'react'
import type { TransferResult } from '../types/TransfertResult'
import SourceSelector from '../components/SourceSelector'
import {  convertLeMondeRssToRss25SB } from '../utils/convert'
import ServerUrlInput from '../components/ServerUrlInput'

const ConvertPage: React.FC = () => {
    const [sourceUrl, setSourceUrl] = useState('')
    const [result, setResult] = useState<TransferResult | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [fluxRSS, setFluxRSS] = useState("");
    const [serverUrl, setServerUrl] = useState<string>('http://localhost:8080/rss25SB/insert')
    const handleConvertAndTransfer = async () => {
    if (!sourceUrl) return
    setIsLoading(true)
    setResult(null)

    try {
      const res = await fetch(sourceUrl)
      
      if (!res.ok) throw new Error('Erreur lors du chargement du flux')
      const xmlText = await res.text()

      const rss25SBXml = convertLeMondeRssToRss25SB(xmlText)
    setFluxRSS(await rss25SBXml);
      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: rss25SBXml
      })

      const text = await response.text()
      const parser = new DOMParser()
      const xml = parser.parseFromString(text, 'application/xml')
      const status = xml.querySelector('status')?.textContent || 'ERROR'
      const id = xml.querySelector('id')?.textContent || null
      const description = xml.querySelector('description')?.textContent || null

      setResult({ status, id, description })
    } catch (error) {
      setResult({ status: "ERROR", description: (error as Error).message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Convertisseur de Flux RSS vers rss25SB</h1>
      <ServerUrlInput serverUrl={serverUrl} onChange={setServerUrl}/>
      <SourceSelector selectedSource={sourceUrl} onChange={setSourceUrl} />
      <button
        onClick={handleConvertAndTransfer}
        disabled={!sourceUrl || isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Transfert...' : 'Convertir et Transférer'}
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
            
          <h2 className="text-sm font-medium text-gray-700 mb-1">Résultat :</h2>
          <div className='p-2'>
            <h3 className='text-sm font-medium text-gray-700 mb-1'>Réponse backend</h3>
            <p className="font-semibold">Statut : <span className="text-blue-600">{result.status}</span></p>
            {result.id && <p>ID inséré : <span className="text-green-700">{result.id}</span></p>}
            {result.description && <p>Description : {result.description}</p>
          }
          </div>
          {result.status!="ERROR"&&
            <div>
              <h3 className='font-semibold'>Flux RSS convertie</h3>
              <pre className="whitespace-pre-wrap break-words text-sm">
                {fluxRSS}
              </pre>
            </div>
          }
        </div>
      )}
    </div>
  )
}

export default ConvertPage
