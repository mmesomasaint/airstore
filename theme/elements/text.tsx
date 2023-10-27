export function TextHeadline({
  primary,
  faded,
  fadedMax,
  children,
  copy,
}: {
  children: React.ReactNode
  primary?: boolean
  faded?: boolean
  fadedMax?: boolean
  copy?: boolean
}) {
  return (
    <p
      className={`${
        copy ? 'leading-snug' : 'leading-none'
      } text-3xl font-semibold ${primary && 'text-store-pri'} ${
        faded && 'text-store-faded'
      } ${fadedMax && 'text-store-faded-max'}`}
    >
      {children}
    </p>
  )
}

export function TextIntro({
  primary,
  faded,
  fadedMax,
  children,
  copy,
}: {
  children: React.ReactNode
  primary?: boolean
  faded?: boolean
  fadedMax?: boolean
  copy?: boolean
}) {
  return (
    <p
      className={`${
        copy ? 'leading-snug' : 'leading-none'
      } text-2xl font-semibold ${primary && 'text-store-pri'} ${
        faded && 'text-store-faded'
      } ${fadedMax && 'text-store-faded-max'}`}
    >
      {children}
    </p>
  )
}

export function TextMid({
  primary,
  faded,
  fadedMax,
  children,
  copy,
}: {
  children: React.ReactNode
  primary?: boolean
  faded?: boolean
  fadedMax?: boolean
  copy?: boolean
}) {
  return (
    <p
      className={`${
        copy ? 'leading-snug' : 'leading-none'
      } text-xl font-semibold ${primary && 'text-store-pri'} ${
        faded && 'text-store-faded'
      } ${fadedMax && 'text-store-faded-max'}`}
    >
      {children}
    </p>
  )
}

export function TextBase({
  primary,
  faded,
  fadedMax,
  children,
  copy,
}: {
  children: React.ReactNode
  primary?: boolean
  faded?: boolean
  fadedMax?: boolean
  copy?: boolean
}) {
  return (
    <p
      className={`${
        copy ? 'leading-snug' : 'leading-none'
      } text-lg font-semibold ${primary && 'text-store-pri'} ${
        faded && 'text-store-faded'
      } ${fadedMax && 'text-store-faded-max'}`}
    >
      {children}
    </p>
  )
}

export function TextSmall({
  primary,
  faded,
  fadedMax,
  children,
  copy,
}: {
  children: React.ReactNode
  primary?: boolean
  faded?: boolean
  fadedMax?: boolean
  copy?: boolean
}) {
  return (
    <p
      className={`${
        copy ? 'leading-snug' : 'leading-none'
      } text-base font-semibold ${primary && 'text-store-pri'} ${
        faded && 'text-store-faded'
      } ${fadedMax && 'text-store-faded-max'}`}
    >
      {children}
    </p>
  )
}

export function TextXSmall({
  primary,
  faded,
  fadedMax,
  children,
  copy,
}: {
  children: React.ReactNode
  primary?: boolean
  faded?: boolean
  fadedMax?: boolean
  copy?: boolean
}) {
  return (
    <p
      className={`${
        copy ? 'leading-snug' : 'leading-none'
      } text-sm font-semibold ${primary && 'text-store-pri'} ${
        faded && 'text-store-faded'
      } ${fadedMax && 'text-store-faded-max'}`}
    >
      {children}
    </p>
  )
}

export function TextTiny({
  primary,
  faded,
  fadedMax,
  children,
  copy,
}: {
  children: React.ReactNode
  primary?: boolean
  faded?: boolean
  fadedMax?: boolean
  copy?: boolean
}) {
  return (
    <p
      className={`${
        copy ? 'leading-snug' : 'leading-none'
      } text-xs font-semibold ${primary && 'text-store-pri'} ${
        faded && 'text-store-faded'
      } ${fadedMax && 'text-store-faded-max'}`}
    >
      {children}
    </p>
  )
}

export function TextLabel({
  large,
  primary,
  faded,
  fadedMax,
  children,
}: {
  children: React.ReactNode
  large?: boolean
  primary?: boolean
  faded?: boolean
  fadedMax?: boolean
}) {
  return (
    <p
      className={`leading-[0] font-semibold ${
        large ? 'text-base' : 'text-sm'
      } ${primary && 'text-store-pri'} ${faded && 'text-store-faded'} ${
        fadedMax && 'text-store-faded-max'
      }`}
    >
      {children}
    </p>
  )
}
