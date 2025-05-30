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

        const { name, value } = body

        if (!userId) {
            return new NextResponse('Não Autorizado', { status: 401 })
        }

        if (!name) {
            return new NextResponse('Nome é obrigatório', { status: 400 })
        }

        if (!value) {
            return new NextResponse('Valor é obrigatória', { status: 400 })
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

        const colors = await prismadb.color.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        })

        return NextResponse.json(colors)

    } catch (error) {
        console.log('[COLOR_POST]', error)
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

        const colors = await prismadb.color.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(colors)

    } catch (error) {
        console.log('[COLOR_GET]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}