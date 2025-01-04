-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "dimensions_height" INTEGER,
    "dimensions_length" INTEGER,
    "dimensions_width" INTEGER,
    "engine_information_driveline" VARCHAR(255),
    "engine_information_engine_type" VARCHAR(255),
    "engine_information_hybrid" BOOLEAN,
    "engine_information_number_of_forward_gears" INTEGER,
    "engine_information_transmission" VARCHAR(255),
    "fuel_information_city_mpg" INTEGER,
    "fuel_information_fuel_type" VARCHAR(50),
    "fuel_information_highway_mpg" INTEGER,
    "identification_classification" VARCHAR(255),
    "identification_id" VARCHAR(255),
    "identification_make" VARCHAR(100),
    "identification_model_year" VARCHAR(255),
    "identification_year" INTEGER,
    "engine_information_engine_statistics_horsepower" INTEGER,
    "engine_information_engine_statistics_torque" INTEGER,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
