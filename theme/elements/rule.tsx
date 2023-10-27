export function HR({
  dashed,
  children,
}: {
  dashed?: boolean
  children?: React.ReactNode
}) {
  return (
    <div
      className={`border-b ${
        dashed && 'border-dashed'
      } border-store-outline-faded-max w-full ${children && 'pb-3'}`}
    >
      {children}
    </div>
  )
}
