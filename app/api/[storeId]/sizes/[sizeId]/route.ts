import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(
    req: Request,
    { params }: { params: { sizeId: string} }
) {
    try {

        if (!params.sizeId) {
            return new NextResponse('ID é obrigatório', { status: 400 })
        }

        const sizes = await prismadb.size.findUnique({
            where: {
                id: params.sizeId,
            }
        })

        return NextResponse.json(sizes)

    } catch (error) {
        console.log('[SIZE_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string} }
) {
    try {

        const { userId} = await auth()
        const body = await req.json()

        const { name, value } = body

        if (!userId) {
            return new NextResponse("Não autenticado", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Nome é obrigatório", { status: 400 })
        }

        if (!value) {
            return new NextResponse("Valoe é obrigatório", { status: 400 })
        }

        if (!params.sizeId) {
            return new NextResponse('Tamanho é obrigatório', { status: 400 })
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

        const sizes = await prismadb.size.updateMany({
            where: {
                id: params.sizeId,
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(sizes)

    } catch (error) {
        console.log('[SIZE_PATCH]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string} }
) {
    try {

        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Não autenticado", { status: 401 })
        }

        if (!params.sizeId) {
            return new NextResponse('ID é obrigatório', { status: 400 })
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

        const sizes = await prismadb.size.deleteMany({
            where: {
                id: params.sizeId,
            }
        })

        return NextResponse.json(sizes)

    } catch (error) {
        console.log('[SIZE_DELETE]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}