'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ProductsColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'

interface ProductsClientProps {
  data: ProductsColumn[]
}

const ProductClient: React.FC<ProductsClientProps> = ({
  data
}) => {

  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Produtos (${data.length})`}
          description='Configure os Produtos da sua Loja'
        />
        <Button
        onClick={() => router.push(`/${params.storeId}/products/new`)}
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
        description='API do Produto'
      />
      <Separator/>
      <ApiList
        entityName='products'
        entityIdName='productId'
      />
    </>
  )
}

export default ProductClient
