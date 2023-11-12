import { TextLabel } from './text'

export default function Button({
  large,
  full,
  outlinePrimary,
  fillPrimary,
  fillFaded,
  onClick,
  children,
}: {
  children: React.ReactNode
  large?: boolean
  full?: boolean
  outlinePrimary?: boolean
  fillPrimary?: boolean
  fillFaded?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-block p-5 rounded-3xl border ${
        large && 'p-6 rounded-3xl'
      } ${full && 'w-full'} ${
        outlinePrimary && 'border-store-pri text-store-pri'
      } ${fillPrimary && 'bg-store-pri border-store-pri text-white'} ${
        fillFaded && 'bg-white text-store-faded border-store-faded'
      }`}
    >
      <TextLabel large={large}>{children}</TextLabel>
    </button>
  )
}
