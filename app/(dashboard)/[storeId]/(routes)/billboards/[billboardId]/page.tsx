import prismadb from '@/lib/prismadb';
import React from 'react';
import BillBoardForm from './components/billboard-form';

interface BillboardPageProps {
    params: { billboardId: string };
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
    // Busca os dados do banco de dados
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId,
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillBoardForm initialData={billboard} />
            </div>
        </div>
    );
};

export default BillboardPage;