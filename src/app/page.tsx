import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Music, Users, Clock } from 'lucide-react'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col gap-6 bg-[var(--color-surface-900)] p-8">
      {/* Botões */}
      <div className="flex flex-wrap gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button isLoading>Carregando</Button>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge>Pop</Badge>
        <Badge variant="brand">Rock</Badge>
        <Badge variant="success">Encontrada</Badge>
        <Badge variant="warning">Baixa confiança</Badge>
        <Badge variant="error">Não encontrada</Badge>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Minutos ouvidos</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-4xl font-bold text-[var(--color-text-primary)]">
              2.847
            </p>
            <p className="mt-1 text-sm">esse mês</p>
          </CardBody>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Artistas únicos</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-4xl font-bold text-[var(--color-brand-400)]">
              143
            </p>
            <p className="mt-1 text-sm">+12 vs mês anterior</p>
          </CardBody>
        </Card>

        <Card variant="ghost">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top Gênero</CardTitle>
              <Badge variant="brand">Novo</Badge>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">
              Indie Rock
            </p>
            <p className="mt-1 text-sm">38% das reproduções</p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
