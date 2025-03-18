import prismadb from '@/lib/prismadb'
import React from 'react'
import BillBoardForm from './components/billboard-form'

// BillboardPage is no longer async itself, but we will fetch data in a separate async function.
const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string }
}) => {
  // Fetch the billboard data
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  })

  // Return the JSX
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardForm initialData={billboard} />
      </div>
    </div>
  )
}

export default BillboardPage
