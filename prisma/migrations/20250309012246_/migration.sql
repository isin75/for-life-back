-- CreateTable
CREATE TABLE "rent_settings" (
    "id" TEXT NOT NULL,
    "gas_subscription_fee" INTEGER NOT NULL,
    "gas_conversion_rate" INTEGER NOT NULL,
    "gas_consumption_price" INTEGER NOT NULL,
    "gas_distribution_fixed" INTEGER NOT NULL,
    "gas_distributive_variable_price" INTEGER NOT NULL,

    CONSTRAINT "rent_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gas" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "gas_consumption" INTEGER NOT NULL,
    "gas_price" INTEGER NOT NULL,

    CONSTRAINT "gas_pkey" PRIMARY KEY ("id")
);
