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

        const { 
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived
         } = body

        if (!userId) {
            return new NextResponse('Não Autorizado', { status: 401 })
        }

        if (!name) {
            return new NextResponse('Nome é obrigatório', { status: 400 })
        }

        if (!images || !images.length) {
            return new NextResponse('Imagem é obrigatória', { status: 400 })
        }

        if (!categoryId) {
            return new NextResponse('Categoria é obrigatória', { status: 400 })
        }

        if (!price) {
            return new NextResponse('Preço é obrigatória', { status: 400 })
        }

        if (!colorId) {
            return new NextResponse('Cor é obrigatória', { status: 400 })
        }

        if (!sizeId) {
            return new NextResponse('Tamanho é obrigatória', { status: 400 })
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

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                isFeatured,
                isArchived,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(product)

    } catch (error) {
        console.log('[PRODUCT_POST]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {

        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get('categoryId') || undefined
        const colorId = searchParams.get('colorId') || undefined
        const sizeId = searchParams.get('sizeId') || undefined
        const isFeatured = searchParams.get('isFeatured')

        if (!params.storeId) {
            return new NextResponse('StoreId é obrigatório', { status: 400 })
        }

        const product = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                sizeId,
                colorId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(product)

    } catch (error) {
        console.log('[PRODUCTS_GET]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}