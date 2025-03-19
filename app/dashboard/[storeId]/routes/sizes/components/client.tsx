'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'
import { SizeColumn, columns } from './columns'

interface SizeClientProps {
  data: SizeColumn[]
}

const SizeClient: React.FC<SizeClientProps> = ({
  data
}) => {

  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Tamanhos (${data.length})`}
          description='Configure os tamanhos dos seus Produtos'
        />
        <Button
        onClick={() => router.push(`/${params.storeId}/sizes/new`)}
         className='cursor-pointer'>
          <Plus className='mr-2 h-4 w-4'/>
          Add Novo
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey='name'
      />
      <Heading
        title='API'
        description='API dos Tamanhos'
      />
      <Separator/>
      <ApiList
        entityName='sizes'
        entityIdName='sizeId'
      />
    </>
  )
}

export default SizeClient
