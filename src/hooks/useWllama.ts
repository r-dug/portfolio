import { useRef, useState, useCallback } from 'react'
import { Wllama } from '@wllama/wllama'
import WasmFromCDN from '@wllama/wllama/src/wasm-from-cdn'

const MODEL_URL =
  'https://huggingface.co/bartowski/Qwen_Qwen3-0.6B-GGUF/resolve/main/Qwen_Qwen3-0.6B-Q4_K_M.gguf'

export type ModelStatus = 'idle' | 'loading' | 'ready' | 'generating' | 'error'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface WllamaHook {
  status: ModelStatus
  progress: number
  error: string | null
  loadModel: () => Promise<void>
  generate: (
    messages: ChatMessage[],
    onToken: (currentText: string) => void,
    abortSignal?: AbortSignal
  ) => Promise<string>
}

export function useWllama(): WllamaHook {
  const [status, setStatus] = useState<ModelStatus>('idle')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const wllamaRef = useRef<Wllama | null>(null)

  const loadModel = useCallback(async () => {
    if (status === 'ready' || status === 'loading') return
    setStatus('loading')
    setProgress(0)
    setError(null)
    try {
      const wllama = new Wllama(WasmFromCDN)
      await wllama.loadModelFromUrl(MODEL_URL, {
        n_ctx: 4096,
        progressCallback: ({ loaded, total }) => {
          if (total > 0) setProgress(Math.round((loaded / total) * 100))
        },
      })
      wllamaRef.current = wllama
      setStatus('ready')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to load model'
      setError(msg)
      setStatus('error')
    }
  }, [status])

  const generate = useCallback(
    async (
      messages: ChatMessage[],
      onToken: (currentText: string) => void,
      abortSignal?: AbortSignal
    ): Promise<string> => {
      if (!wllamaRef.current) throw new Error('Model not loaded')
      setStatus('generating')
      try {
        const result = await wllamaRef.current.createChatCompletion(messages, {
          nPredict: 768,
          temperature: 0.7,
          onNewToken: (_token, _piece, currentText) => {
            onToken(currentText)
          },
          abortSignal,
        })
        setStatus('ready')
        return result
      } catch (e) {
        setStatus('ready')
        throw e
      }
    },
    []
  )

  return { status, progress, error, loadModel, generate }
}
