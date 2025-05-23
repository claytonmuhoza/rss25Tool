import React from 'react'

interface TransferButtonProps {
  onClick: () => void
  loading: boolean
}

const TransferButton: React.FC<TransferButtonProps> = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full py-2 px-4 rounded-lgfont-semibold bg-blue-500 ${
        loading ? 'bg-blue-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {loading ? 'Transfert en cours...' : 'Transférer'}
    </button>
  )
}

export default TransferButton
