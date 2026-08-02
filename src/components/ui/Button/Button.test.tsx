import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

// 'describe' agrupa testes relacionados ao mesmo componente
describe('Button', () => {
  it('renderiza o texto corretamente', () => {
    render(<Button>Clique aqui</Button>)

    // 'getByRole' é a forma preferida, testa como o usuário enxerga
    expect(
      screen.getByRole('button', { name: 'Clique aqui' })
    ).toBeInTheDocument()
  })

  it('chama onClick ao ser clicado', async () => {
    const handleClick = vi.fn() // função falsa que registra chamadas
    render(<Button onClick={handleClick}>Clique</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('não chama onClick quando desabilitado', async () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Clique
      </Button>
    )

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('mostra spinner e sabilita quando isLoading', () => {
    render(<Button isLoading>Salvar</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()

    // o SVG do spinner tem aria-hidden, então não aparece no nome acessível
    expect(button).toBeDisabled()
  })

  it('aplica variante danger corretamente', () => {
    render(<Button variant="danger">Excluir</Button>)

    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-[var(--color-error)]')
  })
})
