'use client'

import { Monitor, Moon, Sun, User, Palette, Bell } from 'lucide-react'
import { usePreferencesStore } from '@/stores/preferencesStore'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import { cn } from '@/utils/cn'
import { mockUser } from '@/mocks/user'
import Image from 'next/image'

type Theme = 'dark' | 'light' | 'system'

const THEMES: { id: Theme; label: string; icon: typeof Sun }[] = [
  { id: 'dark', label: 'Escuro', icon: Moon },
  { id: 'light', label: 'Claro', icon: Sun },
  { id: 'system', label: 'Sistema', icon: Monitor },
]

export default function SettingsPage() {
  const { theme, setTheme } = usePreferencesStore()

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      {/* título */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Configurações
        </h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Personalize sua experiência no Harmonia.
        </p>
      </div>

      {/* seção: perfil */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User size={16} className="text-[var(--color-text-muted)]" />
            <CardTitle>Perfil</CardTitle>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex items-center gap-4">
            <Image
              src={mockUser.avatarUrl}
              alt={mockUser.name}
              width={56}
              height={56}
              unoptimized
              className="rounded-full bg-[var(--color-surface-600)]"
            />
            <div>
              <p className="font-semibold text-[var(--color-text-primary)]">
                {mockUser.name}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                @{mockUser.username}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* seção: aparência */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette size={16} className="text-[var(--color-text-muted)]" />
            <CardTitle>Aparência</CardTitle>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-3">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Tema da interface
            </p>

            {/* seletor de tema */}
            <div className="grid grid-cols-3 gap-3">
              {THEMES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTheme(id)}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-xl border p-4 transition-all',
                    theme === id
                      ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)]/10'
                      : 'border-[var(--color-surface-600)] bg-[var(--color-surface-700)] hover:bg-[var(--color-surface-600)]'
                  )}
                >
                  <Icon
                    size={20}
                    className={
                      theme === id
                        ? 'text-[var(--color-brand-400)]'
                        : 'text-[var(--color-text-muted)]'
                    }
                  />
                  <span
                    className={cn(
                      'text-xs font-medium',
                      theme === id
                        ? 'text-[var(--color-brand-400)]'
                        : 'text-[var(--color-text-secondary)]'
                    )}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* seção: notificações — placeholder */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-[var(--color-text-muted)]" />
            <CardTitle>Notificações</CardTitle>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                Notificações de transferência
              </p>
              <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                Avisar quando uma transferência for concluída
              </p>
            </div>
            {/* toggle visual — sem lógica por enquanto */}
            <div className="flex h-6 w-10 cursor-pointer items-center rounded-full bg-[var(--color-brand-500)] px-1">
              <div className="ml-auto h-4 w-4 rounded-full bg-white" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* versão do app */}
      <p className="text-center text-xs text-[var(--color-text-muted)]">
        Harmonia v1.0.0 · Feito com 💜 por Nathan Lucca
      </p>
    </div>
  )
}
