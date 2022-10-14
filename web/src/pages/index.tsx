import { useState, useEffect } from 'react'
import { Game } from '../types'
import axios from 'axios'
import Head from 'next/head'

import { CreateAdBanner } from '../components/CreteAdBanner'
import { CreateAdModal } from '../components/CreateAdModal'
import { GameBanner } from '../components/GameBanner'
import * as Dialog from '@radix-ui/react-dialog'
import { ToastContainer } from 'react-toastify'
import { useKeenSlider } from 'keen-slider/react'

import Image from 'next/image'
import 'react-toastify/dist/ReactToastify.min.css'
import 'keen-slider/keen-slider.min.css'

function Home() {
  const [games, setGames] = useState<Game[]>([])

  const sliderOptions = {
    loop: true,
    breakpoints: {
      '(max-width: 400px)': {
        slides: {
          perView: 1.5,
          spacing: 24
        }
      },
      '(min-width: 400px)': {
        slides: {
          perView: 2,
          spacing: 24
        }
      },
      '(min-width: 685px)': {
        slides: {
          perView: 3.3,
          spacing: 24
        }
      },
      '(min-width: 970px)': {
        slides: {
          perView: 4.3,
          spacing: 24
        }
      },
      '(min-width: 1255px)': {
        slides: {
          perView: 5.3,
          spacing: 24
        }
      },
      '(min-width: 1550px)': {
        slides: {
          perView: 6.3,
          spacing: 24
        }
      }
    }
  }

  useEffect(() => {
    axios('http://localhost:3333/games').then((response) => {
      setGames(response.data)
    })
  }, [])

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(sliderOptions)
  useEffect(() => {
    instanceRef.current?.update({
      ...sliderOptions
    })
  }, [instanceRef, sliderOptions])
  return (
    <>
      <Head>
        <title>Nlw eSports</title>
        <link rel="shortcut icon" href="/assets/icon.png" type="image/png" />
        <link rel="icon" href="/assets/icon.png" />
      </Head>

      <div className="bg-[#121214] bg-galaxy bg-[length:100%] md:bg-cover bg-no-repeat bg-top w-full min-h-screen">
        <div
          className="min-w-screen  max-w-screen-xl mx-auto flex flex-col items-center my-20
 sm:px-8 md:px-10 
    "
        >
          <ToastContainer
            theme={'dark'}
            position="top-right"
            autoClose={3000}
          />

          <Image
            src="/assets/logo.svg"
            width={300}
            height={200}
            objectFit="contain"
            alt=""
          />

          <h1 className="mt-4 mb-8 text-3xl font-black text-white md:text-5xl lg:text-6xl">
            Seu{' '}
            <span className="text-transparent bg-nlw-gradient  bg-clip-text ">
              duo{' '}
            </span>{' '}
            está aqui.
          </h1>
          <div ref={sliderRef} className="keen-slider">
            {games.map((game) => (
              <div key={game.id} className="keen-slider__slide">
                <GameBanner
                  bannerUrl={game.bannerUrl}
                  title={game.title}
                  adsCount={game._count.ads}
                />
              </div>
            ))}
          </div>
          <Dialog.Root>
            <CreateAdBanner />
            <CreateAdModal />
          </Dialog.Root>
        </div>
      </div>
    </>
  )
}
export default Home
