import { client } from '@/sanity/lib/client'

export async function POST(req: Request) {
  const data = await req.json()

  console.log(data)

  // return new Response(JSON.stringify({ _type: 'formBuilder', ...data }), {
  //   status: 200,
  // })

  /* const test = await client.config()
    return new Response(JSON.stringify(test), { status: 200 }) */

  /* if (!name || !email || !message) {
        return new Response(
            JSON.stringify({ message: 'Missing required fields' }),
            { status: 400 },
        )
    } */

  try {
    const result = await client.patch({
      _type: 'form',
      ...data,
    })

    return new Response(JSON.stringify({ result }), { status: 200 })
  } catch (error) {
    console.error('Sanity submission error: ', error)
    return new Response(
      JSON.stringify({ message: `Failed to submit: ${error}` }),
      {
        status: 500,
      },
    )
  }
}
