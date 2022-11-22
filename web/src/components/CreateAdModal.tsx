import { Check, GameController } from 'phosphor-react'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { Input } from './form/input'
import { FormEvent, useEffect, useState } from 'react'
import { Game } from '../types'

import { toast } from 'react-toastify'
import { Select } from './form/select'
import { api } from '../services/api'

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    api('/games').then((response) => {
      setGames(response.data)
    })
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (!data.name) {
      return toast.error('Nome é obrigatório')
    } else if (!data.discord) {
      return toast.error('Discord é obrigatório')
    } else if (weekDays.length === 0) {
      return toast.error('Selecione pelo menos um dia')
    } else if (data.hourStart === '' || data.hourEnd === ' ') {
      return toast.error('Informe o horário')
    }
    try {
      const response = await api.post(`/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })
      setTimeout(() => window.location.reload(), 3100)
      toast.success('Anúncio criado com sucesso!')
    } catch (err) {
      console.log(err)
      toast.error('Erro ao criar anúncio!')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="bg-[#2a2634] shadow-2xl shadow-black/50 fixed py-6 max-w-[480px] w-full rounded-lg px-6 md:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <main className="flex flex-col max-h-[60vh] gap-4 sm:overflow-visible overflow-auto">
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>

            <div className="sm:mr-0 ">
              <div className="flex flex-col gap-2 ">
                <label htmlFor="game" className="font-semibold">
                  Qual o game?
                </label>
                <Select />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input
                  name="name"
                  id="name"
                  placeholder="Como te chamam dentro do game?"
                />
              </div>

              <div className="sm:grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                  <Input
                    name="yearsPlaying"
                    id="yearsPlaying"
                    type="number"
                    min="0"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual o seu Discord?</label>
                  <Input
                    name="discord"
                    id="discord"
                    type="text"
                    placeholder="Usuario#0000"
                  />
                </div>
              </div>

              <div className="sm:flex sm:gap-6">
                <div className="flex flex-col gap-2  ">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <ToggleGroup.Root
                    type="multiple"
                    className="sm:grid sm:grid-cols-4 gap-2 sm:mb-0 mb-4 "
                    value={weekDays}
                    onValueChange={setWeekDays}
                  >
                    <ToggleGroup.Item
                      value="0"
                      title="Domingo"
                      className={`sm:mr-0 mr-2 w-8 h-8 rounded ${
                        weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                    >
                      D
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="1"
                      title="Segunda"
                      className={`sm:mr-0 mr-2 w-8 h-8 rounded ${
                        weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="2"
                      title="Terça"
                      className={`sm:mr-0 mr-2 w-8 h-8 rounded ${
                        weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                    >
                      T
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="3"
                      title="Quarta"
                      className={`sm:mr-0 mr-2 w-8 h-8 rounded ${
                        weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="4"
                      title="Quinta"
                      className={`sm:mr-0 mr-2 w-8 h-8 rounded ${
                        weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="5"
                      title="Sexta"
                      className={`sm:mr-0 mr-2 w-8 h-8 rounded ${
                        weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="6"
                      title="Sábado"
                      className={`sm:mr-0 mr-2 w-8 h-8 rounded ${
                        weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                    >
                      S
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
                </div>
                <div className="sm:flex flex-col gap-2 flex-1 relative w-[10rem]">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2 ">
                    <Input
                      name="hourStart"
                      id="hourStart"
                      type="time"
                      placeholder="De"
                    />
                    <Input
                      name="hourEnd"
                      id="hourEnd"
                      type="time"
                      placeholder="Até"
                    />
                  </div>
                </div>
              </div>

              <label className="sm:mt-2 mt-11 flex items-center gap-2 text-sm">
                <Checkbox.Root
                  checked={useVoiceChannel}
                  onCheckedChange={(checked) => {
                    if (checked === true) {
                      setUseVoiceChannel(true)
                    } else {
                      setUseVoiceChannel(false)
                    }
                  }}
                  className="w-6 h-6 p-1 rounded bg-zinc-900"
                >
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </label>
            </div>
          </main>
          <footer className="sm:mt-4 mt-10 flex sm:justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController className="sm:w-6 h-6" />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
