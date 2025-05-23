import React from 'react'

interface ServerUrlInputProps {
  serverUrl: string
  onChange: (url: string) => void
}

const ServerUrlInput: React.FC<ServerUrlInputProps> = ({ serverUrl, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">URL du serveur REST</label>
      <input
        type="text"
        value={serverUrl}
        onChange={(e) => onChange(e.target.value)}
        placeholder="http://localhost:8080/rss25SB/insert"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  )
}

export default ServerUrlInput
