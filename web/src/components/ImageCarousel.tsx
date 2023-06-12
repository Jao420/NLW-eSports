import { useEffect, useState } from 'react'
import { GameBanner } from './GameBanner'
import { Game } from '../types'
import { useKeenSlider } from 'keen-slider/react'
import { api } from '../services/api'

export function ImageCarousel() {
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
    api('/games').then((response) => {
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
  )
}
