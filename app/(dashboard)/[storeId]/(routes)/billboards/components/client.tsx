'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { BillboardColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'

interface BillboardClientProps {
  data: BillboardColumn[]
}

const BillboardClient: React.FC<BillboardClientProps> = ({
  data
}) => {

  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Painel (${data.length})`}
          description='Configure as Billboards da sua Loja'
        />
        <Button
        onClick={() => router.push(`/${params.storeId}/billboards/new`)}
         className='cursor-pointer'>
          <Plus className='mr-2 h-4 w-4'/>
          Add Novo
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey='label'
      />
      <Heading
        title='API'
        description='API do Painel'
      />
      <Separator/>
      <ApiList
        entityName='billboards'
        entityIdName='billboardId'
      />
    </>
  )
}

export default BillboardClient
