"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PaperAirplaneIcon, UserCircleIcon, CpuChipIcon } from "@heroicons/react/24/outline";

type Message = {
  role: "user" | "bot";
  content: string;
};

type ConversationSummary = {
  _id: string;
  title: string;
  provider: "ollama" | "openai" | "gemini";
  createdAt: string;
  updatedAt: string;
};

export default function ChatPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I am your AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreamingEnabled, setIsStreamingEnabled] = useState(false);
  const [provider, setProvider] = useState<"ollama" | "openai" | "gemini">("ollama");
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [conversationsLoading, setConversationsLoading] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    // Use "nearest" so the viewport doesn't jump to the extreme bottom
    // but still keeps the latest message in view.
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversation list on mount
  useEffect(() => {
    const loadConversations = async () => {
      try {
        setConversationsLoading(true);
        const res = await fetch("/api/conversations");
        if (!res.ok) return;
        const data = await res.json();
        setConversations(data.conversations || []);
      } catch (e) {
        console.error("Failed to load conversations", e);
      } finally {
        setConversationsLoading(false);
      }
    };

    loadConversations();
  }, []);

  const handleSelectConversation = async (id: string) => {
    if (id === selectedConversationId) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/conversations/${id}`);
      if (!res.ok) return;
      const data = await res.json();
      const convMessages: Message[] = data.conversation?.messages || [];
      setMessages(
        convMessages.length
          ? convMessages
          : [{ role: "bot", content: "Hello! I am your AI assistant. How can I help you today?" }]
      );
      setSelectedConversationId(id);
    } catch (e) {
      console.error("Failed to load conversation", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setSelectedConversationId(null);
    setMessages([
      { role: "bot", content: "Hello! I am your AI assistant. How can I help you today?" },
    ]);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`/api/chat/${provider}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMsg, stream: isStreamingEnabled }),
      });

      if (!res.ok) {
        let errStr = "Unknown error.";
        try {
          const errData = await res.json();
          errStr = errData.error || errStr;
        } catch(e) {}
        setMessages((prev) => [...prev, { role: "bot", content: "Sorry, I encountered an error: " + errStr }]);
        setIsLoading(false);
        return;
      }

      if (isStreamingEnabled && res.body) {
        setMessages((prev) => [...prev, { role: "bot", content: "" }]);
        setIsLoading(false);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let currentBotMessage = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split('\n');
          buffer = parts.pop() || ''; // Keep the last partial chunk

          for (const part of parts) {
            if (!part.trim()) continue;
            try {
              const parsed = JSON.parse(part);
              if (parsed.response) {
                currentBotMessage += parsed.response;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].content = currentBotMessage;
                  return newMessages;
                });
              }
            } catch (e) {
              // Ignore partial JSON parse errors
            }
          }
        }

        // After streaming completes, persist conversation
        try {
          await fetch("/api/conversations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              conversationId: selectedConversationId,
              provider,
              userMessage: userMsg,
              botMessage: currentBotMessage,
            }),
          }).then(async (convRes) => {
            if (!convRes.ok) return;
            const convData = await convRes.json();
            if (convData.conversation) {
              const conv: ConversationSummary = convData.conversation;
              setSelectedConversationId(conv._id);
              setConversations((prev) => {
                const existingIndex = prev.findIndex((c) => c._id === conv._id);
                if (existingIndex !== -1) {
                  const updated = [...prev];
                  updated[existingIndex] = conv;
                  return updated.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
                }
                return [conv, ...prev];
              });
            }
          });
        } catch (e) {
          console.error("Failed to save streamed conversation", e);
        }
      } else {
        const data = await res.json();
        setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);

        // Persist conversation (non-streaming)
        try {
          await fetch("/api/conversations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              conversationId: selectedConversationId,
              provider,
              userMessage: userMsg,
              botMessage: data.reply,
            }),
          }).then(async (convRes) => {
            if (!convRes.ok) return;
            const convData = await convRes.json();
            if (convData.conversation) {
              const conv: ConversationSummary = convData.conversation;
              setSelectedConversationId(conv._id);
              setConversations((prev) => {
                const existingIndex = prev.findIndex((c) => c._id === conv._id);
                if (existingIndex !== -1) {
                  const updated = [...prev];
                  updated[existingIndex] = conv;
                  return updated.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
                }
                return [conv, ...prev];
              });
            }
          });
        } catch (e) {
          console.error("Failed to save conversation", e);
        }
        setIsLoading(false);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Failed to reach the server. Make sure Ollama is running locally." },
      ]);
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-600 dark:text-gray-300 text-sm">Checking authentication...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    // Redirect effect is already in progress; just show nothing here.
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto h-[80vh] flex gap-4">
      {/* Sidebar - Conversation history */}
      <aside className="w-64 hidden md:flex flex-col bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-xl dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/70 dark:bg-gray-950/70">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Conversations</h2>
          <button
            onClick={handleNewChat}
            className="text-xs px-2 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            New
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 text-sm">
          {conversationsLoading && (
            <p className="text-xs text-gray-500 px-2 py-1">Loading...</p>
          )}
          {conversations.length === 0 && !conversationsLoading && (
            <p className="text-xs text-gray-500 px-2 py-1">No conversations yet.</p>
          )}
          {conversations.map((conv) => (
            <button
              key={conv._id}
              onClick={() => handleSelectConversation(conv._id)}
              className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-colors truncate ${
                conv._id === selectedConversationId
                  ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-200"
                  : "bg-white/70 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <span className="block truncate">{conv.title}</span>
              <span className="mt-1 block text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                {conv.provider}
              </span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main chat panel */}
      <div className="flex-1 flex flex-col bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-xl dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
            <CpuChipIcon className="w-6 h-6 mr-2 text-indigo-500" />
            AI Medical Assistant
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {provider === "ollama" ? "Running locally on your machine for complete privacy." : `Powered by ${provider === "openai" ? "OpenAI" : "Google Gemini"}.`}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value as "ollama" | "openai" | "gemini")}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-1.5 outline-none shadow-sm cursor-pointer"
          >
            <option value="ollama">Ollama (Local)</option>
            <option value="gemini">Google Gemini</option>
            <option value="openai">OpenAI</option>
          </select>
          <div className="flex items-center gap-2 border-l border-gray-200 dark:border-gray-700 pl-4">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Stream</span>
            <button
              onClick={() => setIsStreamingEnabled(!isStreamingEnabled)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                isStreamingEnabled ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              role="switch"
              aria-checked={isStreamingEnabled}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isStreamingEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start max-w-[80%] ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                {msg.role === "user" ? (
                  <UserCircleIcon className="w-8 h-8 text-indigo-500 ml-3" />
                ) : (
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mr-3">
                    <CpuChipIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                )}
              </div>
              <div
                className={`p-4 rounded-2xl shadow-sm ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white rounded-tr-sm"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.content}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start max-w-[80%]">
              <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mr-3 mt-1">
                <CpuChipIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
              </div>
              <div className="p-4 rounded-2xl shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 bg-white/80 dark:bg-gray-900/80 border-t border-gray-100 dark:border-gray-800">
        <form onSubmit={sendMessage} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a medical or application-related question..."
            disabled={isLoading}
            className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full p-4 disabled:opacity-50 transition placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 text-white font-medium rounded-xl text-sm p-4 text-center items-center justify-center transition-colors shadow-sm"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
