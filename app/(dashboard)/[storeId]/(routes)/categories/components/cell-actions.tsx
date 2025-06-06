'use client'

import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import AlertModal from '@/components/modals/alert-modal'
import { CategoryColumn } from './columns'

interface CellActionProps {
    data: CategoryColumn
}

const CellAction: React.FC<CellActionProps> = ({
    data
}) => {

    const router = useRouter()
    const params = useParams()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("ID Copiado")
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/categories/${data.id}`)
            router.refresh()
            toast.success('Categoria exluída com Sucesso')
        } catch {
            toast.error('Tenha certeza de que removeu todos os produtos dessa categoria')
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
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className='h-8 w-8 p-0 cursor-pointer'>
                <span className='sr-only'>Abrir menu</span>
                <MoreHorizontal className='h-4 w-4' />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
            <DropdownMenuLabel>
                Ações
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onCopy(data.id)} className='cursor-pointer'>
                <Copy className='mr-2 h-4 w-4'/>
                Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/categories/${data.id}`)} className='cursor-pointer'>
                <Edit className='mr-2 h-4 w-4'/>
                Atualizar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)} className='cursor-pointer'>
                <Trash className='mr-2 h-4 w-4'/>
                Excluir
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}

export default CellAction
