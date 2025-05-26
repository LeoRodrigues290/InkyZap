// src/views/auth/authforms/AuthLogin.tsx
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'src/firebase/config'
import { toast } from 'react-toastify'

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type FormData = z.infer<typeof schema>

const AuthLogin = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      toast.success('Login realizado com sucesso!')
      navigate('/produtos')
    } catch {
      toast.error('Credenciais inválidas. Tente novamente.')
    }
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* E-mail */}
        <div>
          <Label htmlFor="email" value="E-mail" className="text-gray-300" />
          <TextInput
              id="email"
              type="email"
              sizing="md"
              required
              className="rounded-xl mt-2"
              {...register('email')}
          />
          {formState.errors.email && (
              <p className="mt-1 text-red-500 text-sm">
                {formState.errors.email.message}
              </p>
          )}
        </div>

        {/* Senha */}
        <div>
          <Label htmlFor="password" value="Senha" className="text-gray-300" />
          <TextInput
              id="password"
              type="password"
              sizing="md"
              required
              className="rounded-xl mt-2"
              {...register('password')}
          />
          {formState.errors.password && (
              <p className="mt-1 text-red-500 text-sm">
                {formState.errors.password.message}
              </p>
          )}
        </div>

        {/* Lembrar dispositivo */}
        <div className="flex items-center">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="ml-2 font-normal text-gray-400 dark:text-gray-300 cursor-pointer">
            Lembrar dispositivo
          </Label>
        </div>

        {/* Botão de submit */}
        <Button
            type="submit"
            color="primary"
            className="w-full rounded-xl"
            disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
  )
}

export default AuthLogin
