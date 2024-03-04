import { useController, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './login-form.module.scss'

import { Button } from '../../ui/button'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue: false,
    name: 'rememberMe',
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  // const emailRegex =
  //   /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} className={s.input} />
      {errors.email?.message}
      <input {...register('password')} className={s.input} />
      {errors.password?.message}
      <input {...register('rememberMe')} checked={value} onChange={onChange} type={'checkbox'} />
      {errors.rememberMe?.message}
      <Button type={'submit'}>Submit</Button>
    </form>
  )
}
