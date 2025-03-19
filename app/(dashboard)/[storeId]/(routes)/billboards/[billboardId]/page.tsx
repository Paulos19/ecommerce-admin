import prismadb from "@/lib/prismadb";
import BillBoardForm from "./components/billboard-form";

const BillboardPage = async ({
  params
}: {
  params: { storeId?: string; billboardId: string }
}) => {

  const { billboardId, storeId } = params || {}; // Safely destructure params

  const billboard = billboardId 
      ? await prismadb.billboard.findUnique({
          where: { id: billboardId }
      })
      : null; // Handle scenario where billboardId is missing

  return (
      <div className='flex-col'>
          <div className='flex-1 space-y-4 p-8 pt-6'>
              <BillBoardForm initialData={billboard} />
          </div>
      </div>
  );
};

export default BillboardPage;
