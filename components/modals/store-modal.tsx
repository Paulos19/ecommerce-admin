'use client'

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from 'axios'
import toast from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(1),
})

export const StoreModal = () => {

    const [loading, setLoading] = useState(false)

    const storeModal = useStoreModal()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)

            const response = await axios.post('/api/stores', values)

            window.location.assign(`/${response.data.id}`)
            
        } catch {
            toast.error('Algo deu errado')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title="Criar Loja"
            description="Adicione uma nova loja para gerenciar seus Produtos"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="E-commerce"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    className="cursor-pointer"
                                    disabled={loading}
                                    variant={"outline"}
                                    onClick={storeModal.onClose}
                                >
                                    Cancelar
                                </Button>

                                <Button disabled={loading} type="submit" className="cursor-pointer">
                                    Continuar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )

}