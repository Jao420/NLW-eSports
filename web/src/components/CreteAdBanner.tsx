import { MagnifyingGlassPlus } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden">
      <div className="bg-[#2A2634] sm:px-8 px-4 sm:py-6 py-4 sm:flex grid sm:justify-between items-center">
        <div>
          <strong className="sm:text-2xl text-xl text-white font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block sm:py-0 py-2">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <Dialog.Trigger className=" flex items-center justify-center h-10 gap-3 px-2 text-white rounded-md w-36 hover:bg-violet-500 bg-violet-600 ">
          <MagnifyingGlassPlus size={24} />
          Anúnciar
        </Dialog.Trigger>
      </div>
    </div>
  )
}
