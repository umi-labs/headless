import { client } from '@/sanity/lib/client'

export async function POST(req: Request) {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
        return new Response(
            JSON.stringify({ message: 'Missing required fields' }),
            { status: 400 },
        )
    }

    try {
        const result = await client.create({
            _type: 'contactForm',
            name,
            email,
            message,
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
