import { TextLabel } from './text'

export default function Button({
  large,
  full,
  outlinePrimary,
  fillPrimary,
  fillFaded,
  children,
}: {
  children: React.ReactNode
  large?: boolean
  full?: boolean
  outlinePrimary?: boolean
  fillPrimary?: boolean
  fillFaded?: boolean
}) {
  return (
    <button
      className={`inline-block p-5 rounded-3xl border ${
        large && 'p-6 rounded-3xl'
      } ${full && 'w-full'} ${
        outlinePrimary && 'border-apple-store-pri text-apple-store-pri'
      } ${
        fillPrimary && 'bg-apple-store-pri border-apple-store-pri text-white'
      } ${
        fillFaded && 'bg-white text-apple-store-faded border-apple-store-faded'
      }`}
    >
      <TextLabel large={large}>{children}</TextLabel>
    </button>
  )
}
