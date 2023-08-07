'use client'

import React,{ useState } from 'react'

const ChatInterface = () => {
    const [conversation, setConversation] = useState([])
    const [inputText, setInputText] = useState('')

    const handleSendMessage = async () => {
        console.log("handleSendMEssage")
        if (inputText.trim() === '') return;
        console.log("components - chatInterface - handleSendMEssage - inputText = ", inputText)
        setConversation(conversation => [...conversation, { text: inputText, role: 'user'}])
        console.log("handleSendMEssage initial conversation = ", conversation)
        setInputText('')
        let apikey = process.env.NEXT_PUBLIC_OPENAI_KEY
       console.log("apikey = ", apikey)
        try {
            const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
                method: 'POST',
                body: JSON.stringify({ 
                   
                    prompt: inputText,
                    max_tokens: 50
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apikey}`
                }
            })
            console.log("components - chatInterface - response = ", response)
            const data = await response.json()
            console.log("chatInterface - handleSendMessage - data = ", data)
            setConversation(conversation => [...conversation, { text: data.choices[0].text, role: 'bot '}])
            console.log("chatInterface - handleSendMEssage - conversation after bot response = ", conversation)
        } catch (error) {
            console.error('Error Sending message: ', error)
        }
    }
    console.log("conversation after sendMessage = ", conversation)
    return (
        <div>
            {conversation && conversation.map(con => (
            // eslint-disable-next-line react/jsx-key
            <div className='chat-container'>
                {/* Render the conversation history here */}
                {console.log("return conversation = ", conversation)}
                <p className='text-white'>{con.role}</p>
                <p className="text-white">{con.text}</p>
                <br />
            </div>
            ))}
            <div className="input-container">
                <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} className="text-black" />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatInterface