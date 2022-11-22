import { useEffect, useState } from 'react'
import * as PrimitiveSelect from '@radix-ui/react-select'
import { CaretDown, Check } from 'phosphor-react'
import { Game } from '../../types'

import { api } from '../../services/api'

export function Select() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    api('/games').then((response) => {
      setGames(response.data)
    })
  }, [])

  return (
    <PrimitiveSelect.Root name="game">
      <PrimitiveSelect.Trigger
        className={
          'bg-zinc-900 py-3 px-4 rounded flex items-center justify-between text-md'
        }
      >
        <PrimitiveSelect.Value placeholder="Selecione um jogo" />

        <PrimitiveSelect.Icon>
          <CaretDown className="w-6" />
        </PrimitiveSelect.Icon>
      </PrimitiveSelect.Trigger>

      <PrimitiveSelect.Portal>
        <PrimitiveSelect.Content className="overflow-auto bg-zinc-900 rounded relative ">
          <PrimitiveSelect.Viewport className="p-1">
            {games.map(({ title, id }) => {
              return (
                <div key={id}>
                  <PrimitiveSelect.Item
                    key={id}
                    value={id}
                    className="flex items-center py-2 px-4 text-white cursor-pointer hover:bg-zinc-500"
                  >
                    <PrimitiveSelect.ItemText>{title}</PrimitiveSelect.ItemText>

                    <PrimitiveSelect.ItemIndicator>
                      <Check className="text-emerald-400 w-6 h-4" />
                    </PrimitiveSelect.ItemIndicator>
                  </PrimitiveSelect.Item>
                  <PrimitiveSelect.Separator className="h-px bg-zinc-600 " />
                </div>
              )
            })}
          </PrimitiveSelect.Viewport>
        </PrimitiveSelect.Content>
      </PrimitiveSelect.Portal>
    </PrimitiveSelect.Root>
  )
}
