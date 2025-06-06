import prismadb from "@/lib/prismadb";
import BillBoardForm from "./components/billboard-form";

const BillboardPage = async ({
  params
}: {
  params: { storeId: string; billboardId: string }
}) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { billboardId, storeId } = params;

  const billboard = await prismadb.billboard.findUnique({
      where: {
          id: billboardId
      }
  });

  return (
      <div className='flex-col'>
          <div className='flex-1 space-y-4 p-8 pt-6'>
              <BillBoardForm initialData={billboard} />
          </div>
      </div>
  );
};

export default BillboardPage;

