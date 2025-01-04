import { getCarsWithPagination } from "../service/cars.js";

export async function getCars(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 100;

        const result = await getCarsWithPagination(page, pageSize);

        res.status(200).json({
            success: true,
            data: result.cars,
            meta: {
                totalCars: result.totalCars,
                totalPages: result.totalPages,
                currentPage: result.currentPage,
            },
        });
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
