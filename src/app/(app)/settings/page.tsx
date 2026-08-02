'use client'

import { Monitor, Moon, Sun, User, Palette, Bell } from 'lucide-react'
import { usePreferencesStore } from '@/stores/preferencesStore'
import Image from 'next/image'
import { mockUser } from '@/mocks/user'

type Theme = 'dark' | 'light' | 'system'

const THEMES: {
  id: Theme
  label: string
  icon: typeof Sun
  description: string
}[] = [
  {
    id: 'dark',
    label: 'Escuro',
    icon: Moon,
    description: 'Fundo escuro para ambientes com pouca luz',
  },
  {
    id: 'light',
    label: 'Claro',
    icon: Sun,
    description: 'Fundo claro para ambientes iluminados',
  },
  {
    id: 'system',
    label: 'Sistema',
    icon: Monitor,
    description: 'Segue a preferência do seu sistema',
  },
]

export default function SettingsPage() {
  const { theme, setTheme } = usePreferencesStore()

  return (
    <div
      style={{
        maxWidth: '640px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* título */}
      <div>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          Configurações
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            marginTop: '4px',
          }}
        >
          Personalize sua experiência no Harmonia.
        </p>
      </div>

      {/* seção: perfil */}
      <div
        style={{
          borderRadius: '16px',
          border: '1px solid var(--color-surface-600)',
          background: 'var(--color-surface-800)',
          overflow: 'hidden',
        }}
      >
        {/* header da seção */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 20px',
            borderBottom: '1px solid var(--color-surface-600)',
          }}
        >
          <User size={16} style={{ color: 'var(--color-text-muted)' }} />
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            Perfil
          </span>
        </div>

        {/* conteúdo */}
        <div
          style={{
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <Image
            src={mockUser.avatarUrl}
            alt={mockUser.name}
            width={56}
            height={56}
            unoptimized
            style={{
              borderRadius: '50%',
              background: 'var(--color-surface-600)',
              flexShrink: 0,
            }}
          />
          <div>
            <p
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
              }}
            >
              {mockUser.name}
            </p>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                marginTop: '2px',
              }}
            >
              @{mockUser.username}
            </p>
          </div>
        </div>
      </div>

      {/* seção: aparência */}
      <div
        style={{
          borderRadius: '16px',
          border: '1px solid var(--color-surface-600)',
          background: 'var(--color-surface-800)',
          overflow: 'hidden',
        }}
      >
        {/* header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 20px',
            borderBottom: '1px solid var(--color-surface-600)',
          }}
        >
          <Palette size={16} style={{ color: 'var(--color-text-muted)' }} />
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            Aparência
          </span>
        </div>

        {/* conteúdo */}
        <div
          style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Tema da interface
          </p>

          <div
            style={{
              display: 'grid',
              gap: '10px',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            }}
          >
            {THEMES.map(({ id, label, icon: Icon, description }) => (
              <button
                key={id}
                onClick={() => setTheme(id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '16px',
                  borderRadius: '12px',
                  border:
                    theme === id
                      ? '2px solid var(--color-brand-500)'
                      : '1px solid var(--color-surface-600)',
                  background:
                    theme === id
                      ? 'color-mix(in srgb, var(--color-brand-500) 10%, transparent)'
                      : 'var(--color-surface-700)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                <Icon
                  size={20}
                  style={{
                    color:
                      theme === id
                        ? 'var(--color-brand-400)'
                        : 'var(--color-text-muted)',
                  }}
                />
                <div>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color:
                        theme === id
                          ? 'var(--color-brand-400)'
                          : 'var(--color-text-primary)',
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-text-muted)',
                      marginTop: '2px',
                      lineHeight: 1.4,
                    }}
                  >
                    {description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* seção: notificações */}
      <div
        style={{
          borderRadius: '16px',
          border: '1px solid var(--color-surface-600)',
          background: 'var(--color-surface-800)',
          overflow: 'hidden',
        }}
      >
        {/* header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 20px',
            borderBottom: '1px solid var(--color-surface-600)',
          }}
        >
          <Bell size={16} style={{ color: 'var(--color-text-muted)' }} />
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            Notificações
          </span>
        </div>

        {/* conteúdo */}
        <div style={{ padding: '20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                }}
              >
                Transferências concluídas
              </p>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-muted)',
                  marginTop: '2px',
                }}
              >
                Avisar quando uma transferência for concluída
              </p>
            </div>
            {/* toggle visual */}
            <div
              style={{
                width: '44px',
                height: '24px',
                borderRadius: '9999px',
                background: 'var(--color-brand-500)',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'white',
                  marginLeft: 'auto',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* versão */}
      <p
        style={{
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
        }}
      >
        Harmonia v1.0.0 · Feito com 💜 por Nathan Lucca
      </p>
    </div>
  )
}
