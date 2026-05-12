import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send, ChevronDown, ChevronRight, Brain, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useWllama, type ChatMessage } from '@/hooks/useWllama'
import { portfolioContext } from '@/lib/portfolio-context'
import { logChat } from '@/lib/supabase'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ThinkBlock {
  type: 'think' | 'text'
  content: string
}

function parseThinkBlocks(text: string): ThinkBlock[] {
  const blocks: ThinkBlock[] = []
  const regex = /<think>([\s\S]*?)<\/think>/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      blocks.push({ type: 'text', content: text.slice(lastIndex, match.index) })
    }
    blocks.push({ type: 'think', content: match[1].trim() })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    blocks.push({ type: 'text', content: text.slice(lastIndex) })
  }
  // If still generating and an unclosed <think> block exists, capture it
  if (blocks.length === 0 && text.startsWith('<think>')) {
    blocks.push({ type: 'think', content: text.slice(7) })
  }
  return blocks.length > 0 ? blocks : [{ type: 'text', content: text }]
}

function ThinkingBlock({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="mt-1 rounded border border-[hsl(var(--border))] text-xs text-[hsl(var(--muted-foreground))]">
      <button
        onClick={() => setExpanded(v => !v)}
        className="flex w-full items-center gap-1 px-2 py-1 hover:bg-[hsl(var(--muted)/0.3)] transition-colors"
      >
        {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        <Brain className="h-3 w-3" />
        <span>Thinking</span>
      </button>
      {expanded && (
        <div className="border-t border-[hsl(var(--border))] px-2 py-1.5 whitespace-pre-wrap leading-relaxed">
          {content}
        </div>
      )}
    </div>
  )
}

function MessageBubble({ message, thinkingMode }: { message: Message; thinkingMode: boolean }) {
  const isUser = message.role === 'user'
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-[hsl(var(--primary))] px-3 py-2 text-sm text-[hsl(var(--primary-foreground))]">
          {message.content}
        </div>
      </div>
    )
  }

  const blocks = parseThinkBlocks(message.content)
  const hasText = blocks.some(b => b.type === 'text' && b.content.trim())

  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] space-y-1">
        {thinkingMode && blocks.map((block, i) =>
          block.type === 'think' ? (
            <ThinkingBlock key={i} content={block.content} />
          ) : block.content.trim() ? (
            <div
              key={i}
              className="rounded-2xl rounded-tl-sm bg-[hsl(var(--muted))] px-3 py-2 text-sm text-[hsl(var(--foreground))] whitespace-pre-wrap leading-relaxed"
            >
              {block.content.trim()}
            </div>
          ) : null
        )}
        {!thinkingMode && (
          <div className={cn(
            "rounded-2xl rounded-tl-sm bg-[hsl(var(--muted))] px-3 py-2 text-sm text-[hsl(var(--foreground))] whitespace-pre-wrap leading-relaxed",
            !hasText && message.content && "italic text-[hsl(var(--muted-foreground))]"
          )}>
            {hasText
              ? blocks.filter(b => b.type === 'text').map(b => b.content).join('').trim()
              : message.content
                ? '...'
                : ''}
          </div>
        )}
        {!message.content && (
          <div className="flex gap-1 px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--muted-foreground))] animate-bounce [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--muted-foreground))] animate-bounce [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--muted-foreground))] animate-bounce [animation-delay:300ms]" />
          </div>
        )}
      </div>
    </div>
  )
}

function ThinkingModeToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean
  onToggle: () => void
}) {
  const [showTooltip, setShowTooltip] = useState(false)
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={onToggle}
        className={cn(
          'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-colors',
          enabled
            ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
            : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted)/0.8)]'
        )}
      >
        <Brain className="h-3 w-3" />
        Think
      </button>
      <div className="relative">
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
        >
          <HelpCircle className="h-3.5 w-3.5" />
        </button>
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-1 w-52 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-2 text-xs text-[hsl(var(--muted-foreground))] shadow-lg z-50">
            <strong className="text-[hsl(var(--foreground))]">Thinking mode</strong> lets the model
            reason step-by-step before responding. Answers are more thorough but slower.
          </div>
        )}
      </div>
    </div>
  )
}

function ConsentScreen({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-5 py-8 text-center gap-4">
      <div className="rounded-full bg-[hsl(var(--muted))] p-3">
        <Brain className="h-6 w-6 text-[hsl(var(--primary))]" />
      </div>
      <div className="space-y-2">
        <p className="font-semibold text-[hsl(var(--foreground))]">Locally-run AI assistant</p>
        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
          This chatbot runs a <strong className="text-[hsl(var(--foreground))]">Qwen3 0.6B</strong> model
          directly in your browser. Your conversation is never sent to any third-party AI vendor.
        </p>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          One-time download: ~397 MB. Cached after the first load — return visits are instant.
        </p>
      </div>
      <button
        onClick={onAccept}
        className="mt-1 rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:opacity-90 transition-opacity"
      >
        Download &amp; start chatting
      </button>
    </div>
  )
}

function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 gap-4">
      <Brain className="h-8 w-8 text-[hsl(var(--primary))] animate-pulse" />
      <p className="text-sm font-medium text-[hsl(var(--foreground))]">Loading model…</p>
      <div className="w-full">
        <div className="mb-1 flex justify-between text-xs text-[hsl(var(--muted-foreground))]">
          <span>Downloading Qwen3-0.6B</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-[hsl(var(--muted))]">
          <div
            className="h-1.5 rounded-full bg-[hsl(var(--primary))] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <p className="text-xs text-[hsl(var(--muted-foreground))] text-center">
        Cached after this download — instant on return visits.
      </p>
    </div>
  )
}

const SESSION_KEY = 'chatbot-consented'

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasConsented, setHasConsented] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true')
  const [thinkingMode, setThinkingMode] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const { status, progress, error, loadModel, generate } = useWllama()
  const abortRef = useRef<AbortController | null>(null)
  const sessionId = useRef(crypto.randomUUID())
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && hasConsented && status === 'idle') {
      loadModel()
    }
  }, [isOpen, hasConsented, status, loadModel])

  const handleConsent = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, 'true')
    setHasConsented(true)
    loadModel()
  }, [loadModel])

  const handleSend = useCallback(async () => {
    if (!input.trim() || status !== 'ready') return
    const userText = input.trim()
    setInput('')

    const userMsg: Message = { role: 'user', content: userText }
    const updatedHistory = [...messages, userMsg]
    setMessages([...updatedHistory, { role: 'assistant', content: '' }])

    const systemContent = portfolioContext + (thinkingMode ? '' : '\n/no_think')
    const fullMessages: ChatMessage[] = [
      { role: 'system', content: systemContent },
      ...updatedHistory,
    ]

    abortRef.current = new AbortController()
    try {
      const result = await generate(
        fullMessages,
        currentText => {
          setMessages(prev => [
            ...prev.slice(0, -1),
            { role: 'assistant', content: currentText },
          ])
        },
        abortRef.current.signal
      )
      logChat(sessionId.current, userText, result)
    } catch {
      // aborted or error — leave last message as-is
    }
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [input, status, messages, thinkingMode, generate])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const isGenerating = status === 'generating'
  const isReady = status === 'ready'
  const isLoading = status === 'loading'
  const isError = status === 'error'
  const showConsent = !hasConsented
  const showLoading = hasConsented && isLoading
  const showChat = hasConsented && (isReady || isGenerating || isError)

  return (
    <>
      {/* Floating action button */}
      <button
        onClick={() => setIsOpen(v => !v)}
        className={cn(
          'fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all',
          'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90',
          isOpen && 'rotate-0'
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className={cn(
          'fixed bottom-20 right-5 z-40 flex flex-col',
          'w-[min(380px,calc(100vw-2.5rem))] h-[min(520px,calc(100vh-6rem))]',
          'rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xl',
          'transition-all animate-in fade-in slide-in-from-bottom-4 duration-200'
        )}>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-4 py-3">
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Ask me anything</p>
            <div className="flex items-center gap-2">
              {showChat && (
                <ThinkingModeToggle
                  enabled={thinkingMode}
                  onToggle={() => setThinkingMode(v => !v)}
                />
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {showConsent && <ConsentScreen onAccept={handleConsent} />}
            {showLoading && <LoadingScreen progress={progress} />}
            {isError && (
              <div className="flex flex-col items-center justify-center h-full px-6 text-center gap-3">
                <p className="text-sm text-[hsl(var(--destructive))]">
                  Failed to load model.
                </p>
                <button
                  onClick={() => loadModel()}
                  className="rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:opacity-90 transition-opacity"
                >
                  Retry
                </button>
              </div>
            )}
            {showChat && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {messages.length === 0 && (
                    <p className="text-center text-xs text-[hsl(var(--muted-foreground))] mt-8">
                      Ask about Richard's background, projects, or skills.
                    </p>
                  )}
                  {messages.map((msg, i) => (
                    <MessageBubble key={i} message={msg} thinkingMode={thinkingMode} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-[hsl(var(--border))] p-3">
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={inputRef}
                      rows={1}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={!isReady}
                      placeholder={isGenerating ? 'Generating…' : 'Ask a question…'}
                      className={cn(
                        'flex-1 resize-none rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]',
                        'px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]',
                        'focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]',
                        'max-h-24 scrollbar-thin disabled:opacity-50'
                      )}
                      style={{ fieldSizing: 'content' } as React.CSSProperties}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!isReady || !input.trim()}
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors',
                        'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]',
                        'disabled:opacity-40 hover:opacity-90'
                      )}
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
