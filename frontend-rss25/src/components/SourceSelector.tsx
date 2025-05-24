import React from 'react'

interface SourceSelectorProps {
  selectedSource: string
  onChange: (value: string) => void
}

const SourceSelector: React.FC<SourceSelectorProps> = ({ selectedSource, onChange }) => {
  const sources = [
    {
      label: 'Le Monde (Sciences)',
      value: 'http://localhost:3001/proxy/lemonde',
    },
    {
      label: 'Le Monde (Economie)',
      value: 'http://localhost:3001/proxy/lemonde-economie',
    }
  ]

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Source RSS</label>
      <select
        value={selectedSource}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded p-2"
      >
        <option value="">-- Choisir une source --</option>
        {sources.map((source) => (
          <option key={source.value} value={source.value}>
            {source.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SourceSelector
