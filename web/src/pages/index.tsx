import Head from 'next/head'

import { CreateAdBanner } from '../components/CreateAdBanner'
import { CreateAdModal } from '../components/CreateAdModal'

import * as Dialog from '@radix-ui/react-dialog'
import { ToastContainer } from 'react-toastify'

import Image from 'next/image'
import 'react-toastify/dist/ReactToastify.min.css'
import 'keen-slider/keen-slider.min.css'

import { ImageCarousel } from '../components/ImageCarousel'

function Home() {
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
          <ImageCarousel />
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
