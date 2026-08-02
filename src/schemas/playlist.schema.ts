import { z } from 'zod'

// z.object define a forma do dado e as regras de validação
// cada campo tem suas próprias regras encadeadas
export const playlistSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(50, 'O nome deve ter no máximo 50 caracteres'),

  description: z
    .string()
    .max(200, 'A descrição deve ter no máximo 200 caracteres')
    .optional(),
})

// TypeScript infere o tipo automaticamente do schema
// Não precisamos definir a interface manualmente
export type PlaylistFormData = z.infer<typeof playlistSchema>
