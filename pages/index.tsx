import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { useCallback, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { AiOutlineLogout, AiFillLock } from 'react-icons/ai'

// Web3 connectors
import { connector } from '../src/config/web3'

import styles from '../styles/Home.module.scss'
import Button from '../src/components/atoms/button'

export default function Home() {
  const { active, activate, deactivate, account, error } = useWeb3React()
  const isUnsupportedChain = error instanceof UnsupportedChainIdError

  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previouslyConnected', 'true')
  }, [activate])

  const disconnect = () => {
    deactivate()
    localStorage.removeItem('previouslyConnected')
  }

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') connect()
  }, [connect])

  return (
    <div className={styles.container}>
      <Head>
        <title>Apuestas - Platzi</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className='text-5xl font-bold underline'>
          !Apuestas Platzi¡
        </h1>
        <section className=' my-4'>
          {active
            ? <div className='flex justify-between gap-4'>
                {account}
                <AiOutlineLogout
                  size='25'
                  className='cursor-pointer hover:opacity-50'
                  onClick={disconnect}
                  title='Desconectarse' />
              </div>
            : <Button
              disabled={isUnsupportedChain}
              icon={<AiFillLock size='25' />}
              onClick={connect}>
                {isUnsupportedChain ? 'Red no soportada' : 'Conectar Wallet'}
              </Button>
          }
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
