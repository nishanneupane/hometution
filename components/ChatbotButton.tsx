"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"

const faqData = [
    {
        question: "HR Home Tuition के हो?",
        answer:
            "HR Home Tuition नेपालकै नम्बर १ घरमै ट्यूटर सेवा हो, जहाँ तपाईं आफ्नो बच्चाको लागि अनुभवी र योग्य ट्यूटरहरू सजिलै पाउन सक्नुहुन्छ। थप जानकारीका लागि हाम्रो कार्यालय, दिल्लीबजार काठमाडौंमा आउन सक्नुहुन्छ वा +977 9767482282 मा कल गर्न सक्नुहुन्छ।",
    },
    {
        question: "मेरो बच्चाले के के सुविधाहरू पाउछन्?",
        answer:
            "यहाँ व्यक्तिगत सिकाइको वातावरण, अनुभवी ट्यूटरहरूको सहयोग, र घरमै सिक्न सकिने सहज व्यवस्था उपलब्ध छ। कुनै प्रश्न भएमा हामीलाई +977 9767482282 मा सम्पर्क गर्नुहोस्।",
    },
    {
        question: "अहिले सम्मको सफलता दर कस्तो छ?",
        answer:
            "हामीसँग ९०% भन्दा बढी विद्यार्थीहरूले आफ्नो नतिजामा महत्वपूर्ण सुधार गरेका छन् र आमाबाबुहरू हाम्रो सेवाबाट पूर्णरूपमा सन्तुष्ट छन्। थप जानकारीका लागि कार्यालयमा आउन सक्नुहुन्छ वा +977 9767482282 मा सम्पर्क गर्नुहोस्।",
    },
    {
        question: "अनलाइन कक्षा पनि उपलब्ध छ?",
        answer:
            "हो, हामीले अनलाइन ट्यूटरिङ सेवा पनि उपलब्ध गराएका छौं जसले टाढाबाट पनि सजिलो पहुँच दिन्छ। थप जानकारीका लागि कार्यालयमा आउनुहोस् वा +977 9767482282 मा कल गर्नुहोस्।",
    },
    {
        question: "ट्यूटर कसरी छनोट गर्ने?",
        answer:
            "तपाईंको आवश्यकताअनुसार हामीले ट्यूटरहरूको सिफारिस गर्छौं। तपाईं आफैं पनि प्रोफाइल हेरेर छनोट गर्न सक्नुहुन्छ। थप सहायता चाहिएमा कार्यालयमा आउनुहोस् वा +977 9767482282 मा सम्पर्क गर्नुहोस्।",
    },
    {
        question: "फीस कति पर्छ?",
        answer: (
            <>
                फीस तपाईंले आफैं तोक्न सक्नुहुन्छ। थप जानकारीका लागि{" "}
                <a
                    href="https://hrhometuition.com/student"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                >
                    hrhometuition.com/student
                </a>{" "}
                मा हेर्नुहोस् वा हाम्रो कार्यालयमा आउनुहोस् वा{" "}
                <a href="tel:+9779767482282" className="text-blue-600 underline">
                    +977 9767482282
                </a>{" "}
                मा सम्पर्क गर्नुहोस्।
            </>
        ),
    }
]

type Message = {
    from: "user" | "bot"
    text: React.ReactNode
}

export default function Chatbot() {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            from: "bot",
            text:
                "नमस्ते! के म तपाईंलाई केहि प्रश्नहरूको जवाफ दिन सक्छु? तलका प्रश्नहरूबाट छनोट गर्नुहोस् वा आफ्नो प्रश्न लेख्नुहोस्।",
        },
    ])
    const [input, setInput] = useState("")
    const chatEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleFaqClick = (q: string, a: React.ReactNode) => {
        setMessages((prev) => [...prev, { from: "user", text: q }, { from: "bot", text: a }])
    }

    const handleSend = () => {
        if (!input.trim()) return

        const userMsg = input.trim()
        setMessages((prev) => [
            ...prev,
            { from: "user", text: userMsg },
            {
                from: "bot",
                text: (
                    <>
                        जवाफ दिनमा असमर्थ भएकोमा माफी चाहन्छु। कृपया हाम्रो कार्यालय, दिल्लीबजार काठमाडौंमा आउनुहोस् वा{" "}
                        <a href="tel:+9779767482282" className="text-blue-600 underline">
                            +977 9767482282
                        </a>{" "}
                        मा कल गर्नुहोस्।
                    </>
                ),
            },
        ])
        setInput("")
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <>
            {/* Chat toggle button */}
            <button
                aria-label={open ? "Close chatbot" : "Open chatbot"}
                onClick={() => setOpen((o) => !o)}
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <MessageCircle className="h-6 w-6" />
            </button>

            {open && (
                <section
                    role="dialog"
                    aria-modal="true"
                    aria-label="Chatbot assistance window"
                    className="fixed bottom-20 right-6 bg-white rounded-lg shadow-lg w-[480px] max-h-[480px] flex flex-col z-50"
                    style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                >
                    <header className="flex items-center justify-between p-3 border-b">
                        <h2 className="text-lg font-bold">हाम्रो सहायता केन्द्र</h2>
                        <button
                            aria-label="Close Chatbot"
                            onClick={() => setOpen(false)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </header>

                    {/* Chat messages */}
                    <div
                        aria-live="polite"
                        className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-gray-50 flex flex-col"
                        style={{ scrollBehavior: "smooth" }}
                    >
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`max-w-[85%] p-4 rounded-lg break-words ${msg.from === "user"
                                        ? "bg-blue-600 text-white self-end rounded-br-none"
                                        : "bg-white border border-gray-300 text-gray-800 self-start rounded-bl-none"
                                    }`}
                                aria-label={msg.from === "user" ? "User message" : "Bot response"}
                            >
                                {msg.text}
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input + FAQ wrapper */}
                    <div className="border-t flex flex-col bg-white">
                        {/* User input */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSend()
                            }}
                            className="flex items-center p-3"
                        >
                            <input
                                type="text"
                                aria-label="Type your message"
                                placeholder="तपाईंको प्रश्न यहाँ लेख्नुहोस्..."
                                className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                type="submit"
                                aria-label="Send message"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md flex items-center justify-center transition"
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </form>

                        {/* FAQ quick select */}
                        <nav
                            aria-label="Frequently asked questions"
                            className="flex overflow-x-auto space-x-2 px-3 pb-3"
                        >
                            {faqData.map(({ question, answer }, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleFaqClick(question, answer)}
                                    className="flex-shrink-0 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    {question}
                                </button>
                            ))}
                        </nav>
                    </div>
                </section>
            )}
        </>
    )
}
