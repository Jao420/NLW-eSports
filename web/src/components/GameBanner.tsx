export interface GameBannerProps {
  bannerUrl: string
  title: string
  adsCount: number
}

export function GameBanner({ bannerUrl, title, adsCount }: GameBannerProps) {
  return (
    <span className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt="" />

      <div className="w-[285px] pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">
          {adsCount} anúncio(s)
        </span>
      </div>
    </span>
  )
}
