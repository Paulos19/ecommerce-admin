'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'
import { CategoryColumn, columns } from './columns'

interface CategoryClientProps {
  data: CategoryColumn[]
}

const CategoryClient: React.FC<CategoryClientProps> = ({
  data
}) => {

  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Categorias (${data.length})`}
          description='Ajuste as categorias da sua loja'
        />
        <Button
        onClick={() => router.push(`/${params.storeId}/categories/new`)}
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
        description='API da Categoria'
      />
      <Separator/>
      <ApiList
        entityName='categories'
        entityIdName='categoryId'
      />
    </>
  )
}

export default CategoryClient
