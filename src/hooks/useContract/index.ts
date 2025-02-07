import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'

// Arifacts
import BetWei from '../../config/web3/artifacts/BetWei'

const { address, abi } = BetWei

const usePlatziPunks = () => {
  const { active, library, chainId } = useWeb3React()

  const contract = useMemo(() => {
    if (active && chainId) return new library.eth.Contract(abi, (address as any)[chainId])
  }, [active, chainId, library?.eth?.Contract])

  return contract
}

export default usePlatziPunks
