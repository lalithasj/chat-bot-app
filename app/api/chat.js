//import { NextApiRequest, NextApiResponse } from "next";
'use server'
export default async function handler(req, res) {
    console.log("chat handler")
    if (req.method !== 'POST') {
        return res.status(405).end()
    }
    console.log("chat - handler - req.body = ", req.body)
    const input = req.body;
    console.log("api - input = ", input)
    let apikey = process.env.NEXT_PUBLIC_OPENAI_KEY
    console.log("apikey = ", apikey)
    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            methos: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer: ${apikey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: [{"role": "user", "content": input }],
                max_tokens: 50
            })
            
        })
        const data = await response.json()
        console.log("api - chat - data = ", data)
        return res.status(200).json({ response: data.choices[0].text })
    } catch (error) {
        console.error('Error from OPENAI api: error')
        return res.status(500).json({ error: 'An error occured '})
    }
}