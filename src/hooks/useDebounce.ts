import { useState, useEffect } from 'react'

// recebe um valor e um delay em ms
// retorna o valor atrasado — só atualiza quando o valor para de mudar
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // cria um timer que atualiza o valor após o delay
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // se o valor mudar antes do timer disparar, cancela e recomeça
    // isso é o debounce: só executa quando o valor "estabiliza"
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
