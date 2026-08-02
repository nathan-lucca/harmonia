import { Button } from '@/components/ui/Button'
import { Plus, Trash2 } from 'lucide-react'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col gap-4 bg-[var(--color-surface-900)] p-8">
      <div className="flex flex-wrap gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button size="sm">Pequeno</Button>
        <Button size="md">Médio</Button>
        <Button size="lg">Grande</Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button leftIcon={<Plus size={16}></Plus>}>Criar Playlist</Button>
        <Button variant="danger" leftIcon={<Trash2 size={16}></Trash2>}>
          Excluir
        </Button>
        <Button isLoading>Salvando...</Button>
        <Button disabled>Desabilitado</Button>
      </div>
    </div>
  )
}
