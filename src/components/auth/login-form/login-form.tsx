import { useController, useForm } from 'react-hook-form'

import s from './login-form.module.scss'

import { Button } from '../../ui/button'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const { control, handleSubmit, register } = useForm<FormValues>()

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} className={s.input} />
      <input {...register('password')} className={s.input} />
      <input {...register('rememberMe')} checked={value} onChange={onChange} type={'checkbox'} />
      <Button type={'submit'}>Submit</Button>
    </form>
  )
}
