import prismadb from "@/lib/prismadb"
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = await auth()
        const body = await req.json()

        const { label, imageUrl } = body

        if (!userId) {
            return new NextResponse('Não Autorizado', { status: 401 })
        }

        if (!label) {
            return new NextResponse('Rótulo é obrigatório', { status: 400 })
        }

        if (!imageUrl) {
            return new NextResponse('Imagem é obrigatória', { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse('StoreId é obrigatório', { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse('Não autorizado', { status: 403 })
        }

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARDS_POST]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {

        if (!params.storeId) {
            return new NextResponse('StoreId é obrigatório', { status: 400 })
        }

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboards)

    } catch (error) {
        console.log('[BILLBOARDS_GET]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}