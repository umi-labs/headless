import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center space-y-4">
        <h2 className="text-6xl italic font-semibold">Not Found</h2>
        <p className="md:w-1/2 text-wrap text-center">
          Something seems to have gone wrong, refresh your browser or return
          home if issue persists.
        </p>
        <Link
          href="/"
          className="hover:italic transition-all duration-300 ease-in-out text-2xl"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
