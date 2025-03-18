'use client'

import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { OrderColumn, columns } from './columns'

interface OrderClientProps {
  data: OrderColumn[]
}

const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {

  return (
    <>
      <Heading
          title={`Pedidos (${data.length})`}
          description='Pedidos da sua Loja'
        />
      <Separator/>
      <DataTable searchKey='products' columns={columns} data={data}/>
    </>
  )
}

export default OrderClient
