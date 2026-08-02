'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
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

  // verifica se pode avançar para a próxima etapa
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
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      {/* título */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Transferir Playlist
        </h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Mova suas playlists entre plataformas de streaming.
        </p>
      </div>

      {/* indicador de etapas */}
      <StepIndicator currentStep={step} totalSteps={6} labels={STEP_LABELS} />

      {/* card do conteúdo da etapa atual */}
      <Card padding="lg">
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
      </Card>

      {/* botões de navegação — só aparecem nas etapas 1-3 */}
      {step <= 3 && (
        <div className="flex justify-between">
          <Button variant="ghost" onClick={handleBack} disabled={step === 1}>
            Voltar
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {step === 3 ? 'Iniciar análise' : 'Continuar'}
          </Button>
        </div>
      )}
    </div>
  )
}
