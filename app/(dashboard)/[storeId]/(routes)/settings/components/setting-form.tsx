'use client'

import AlertModal from '@/components/modals/alert-modal'
import { ApiAlert } from '@/components/ui/api-alert'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useOrigin } from '@/hooks/use-origin'
import { zodResolver } from '@hookform/resolvers/zod'
import { Store } from '@prisma/client'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

interface SettingFormProps {
    initialData: Store
}

const formSchema = z.object({
    name: z.string().min(1),
})

type SettingFormValues = z.infer<typeof formSchema>

const SettingForm: React.FC<SettingFormProps> = ({
    initialData
}) => {

    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<SettingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const onSubmit = async (data: SettingFormValues) => {
        try {
           setLoading(true)
           await axios.patch(`/api/stores/${params.storeId}`, data)
           router.refresh()
           toast.success('Loja Atualizada')
        } catch {
            toast.error('Algo deu errado...')
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push('/')
            toast.success('Loja exluída com Sucesso')
        } catch {
            toast.error('Tenha certeza de que removeu todos os produtos e categorias primeiro')
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className='flex items-center justify-between'>
                <Heading
                    title='Configurações'
                    description='Altere as preferências da sua Loja'
                />
                <Button
                    disabled={loading}
                    className='cursor-pointer'
                    variant='destructive'
                    size='icon'
                    onClick={() => setOpen(true)}
                >
                    <Trash className='h-4 w-4' />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid grid-cols-3 gap-8'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Nome da Loja'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className='ml-auto' type='submit'>
                        Salvar
                    </Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert
                title='NEXT_PUBLIC_API_URL'
                description={`${origin}/api/${params.storeId}`}
                variant='public'            
            />
        </>
    )
}

export default SettingForm
