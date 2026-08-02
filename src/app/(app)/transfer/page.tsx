'use client'

import { Button } from '@/components/ui/Button'
import { StepIndicator } from '@/features/transfer/components/StepIndicator'
import { PlatformSelector } from '@/features/transfer/components/PlatformSelector'
import { PlaylistSelector } from '@/features/transfer/components/PlaylistSelector'
import { AnalysisStep } from '@/features/transfer/components/AnalysisStep'
import { ResultsStep } from '@/features/transfer/components/ResultsStep'
import { SummaryStep } from '@/features/transfer/components/SummaryStep'
import { useTransferStore } from '@/features/transfer/store/transferStore'

const STEP_LABELS = [
  'Origem',
  'Playlist',
  'Destino',
  'Análise',
  'Resultado',
  'Conclusão',
]

export default function TransferPage() {
  const {
    step,
    sourcePlatform,
    selectedPlaylist,
    targetPlatform,
    setStep,
    setSourcePlatform,
    setSelectedPlaylist,
    setTargetPlatform,
  } = useTransferStore()

  function canProceed() {
    if (step === 1) return !!sourcePlatform
    if (step === 2) return !!selectedPlaylist
    if (step === 3) return !!targetPlatform
    return false
  }

  function handleNext() {
    if (canProceed()) setStep(step + 1)
  }

  function handleBack() {
    if (step > 1) setStep(step - 1)
  }

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
          Transferir Playlist
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            marginTop: '4px',
          }}
        >
          Mova suas playlists entre plataformas de streaming.
        </p>
      </div>

      {/* indicador de etapas */}
      <StepIndicator currentStep={step} totalSteps={6} labels={STEP_LABELS} />

      {/* card do conteúdo */}
      <div
        style={{
          borderRadius: '16px',
          border: '1px solid var(--color-surface-600)',
          background: 'var(--color-surface-800)',
          padding: '24px',
        }}
      >
        {step === 1 && (
          <PlatformSelector
            title="Plataforma de origem"
            subtitle="De qual plataforma você quer transferir?"
            selected={sourcePlatform}
            onSelect={setSourcePlatform}
          />
        )}
        {step === 2 && (
          <PlaylistSelector
            selected={selectedPlaylist}
            onSelect={setSelectedPlaylist}
          />
        )}
        {step === 3 && (
          <PlatformSelector
            title="Plataforma de destino"
            subtitle="Para qual plataforma você quer transferir?"
            selected={targetPlatform}
            excluded={sourcePlatform}
            onSelect={setTargetPlatform}
          />
        )}
        {step === 4 && <AnalysisStep />}
        {step === 5 && <ResultsStep />}
        {step === 6 && <SummaryStep />}
      </div>

      {/* botões de navegação — só nas etapas 1-3 */}
      {step <= 3 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            onClick={handleBack}
            disabled={step === 1}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              background: 'transparent',
              border: 'none',
              color:
                step === 1
                  ? 'var(--color-text-muted)'
                  : 'var(--color-text-secondary)',
              cursor: step === 1 ? 'not-allowed' : 'pointer',
              opacity: step === 1 ? 0.4 : 1,
            }}
          >
            Voltar
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            style={{
              padding: '10px 24px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              background: canProceed()
                ? 'var(--color-brand-500)'
                : 'var(--color-surface-600)',
              border: 'none',
              color: canProceed() ? 'white' : 'var(--color-text-muted)',
              cursor: canProceed() ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
            }}
          >
            {step === 3 ? 'Iniciar análise' : 'Continuar'}
          </button>
        </div>
      )}
    </div>
  )
}
