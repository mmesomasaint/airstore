import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href='/search/' className="bg-store-pri rounded-md shadow-sm text-white text-lg font-semibold tracking-wider px-4 py-2">
        Search
      </Link>
    </main>
  )
}
