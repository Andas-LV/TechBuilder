import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getCarsWithPagination(page = 1, pageSize = 100) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [cars, totalCars] = await Promise.all([
        prisma.car.findMany({
            skip,
            take,
        }),
        prisma.car.count(),
    ]);

    return {
        cars,
        totalCars,
        totalPages: Math.ceil(totalCars / pageSize),
        currentPage: page,
    };
}
