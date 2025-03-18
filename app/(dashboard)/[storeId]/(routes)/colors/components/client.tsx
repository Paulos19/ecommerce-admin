'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'
import { ColorColumn, columns } from './columns'

interface ColorClientProps {
  data: ColorColumn[]
}

const ColorClient: React.FC<ColorClientProps> = ({
  data
}) => {

  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Cores (${data.length})`}
          description='Configure as cores dos seus Produtos'
        />
        <Button
        onClick={() => router.push(`/${params.storeId}/colors/new`)}
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
        description='API das Cores'
      />
      <Separator/>
      <ApiList
        entityName='colors'
        entityIdName='colorId'
      />
    </>
  )
}

export default ColorClient
