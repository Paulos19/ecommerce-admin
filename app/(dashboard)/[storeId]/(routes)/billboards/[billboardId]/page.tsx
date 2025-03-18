import prismadb from '@/lib/prismadb'
import React from 'react'
import BillBoardForm from './components/billboard-form'
import { Billboard } from '@prisma/client'
import { GetServerSideProps } from 'next'

type BillboardPageProps = {
  billboard: Billboard | null  // Aqui você usa o tipo 'Billboard' gerado pelo Prisma
}

const BillboardPage = ({ billboard }: BillboardPageProps) => {
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillBoardForm initialData={billboard} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params?.billboardId as string
    }
  })

  return {
    props: {
      billboard
    }
  }
}

export default BillboardPage
