import { addProduct } from "@/api/products";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/config";

type Props = {};

const AddProduct: React.FC = ({}: Props) => {
  const [previewImage, setPreviewImage] = useState<any>("");

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    qtyInStock: "",
    image: undefined,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.[0]) {
      console.log(e.target.files?.[0]);
      setProductData({
        ...productData,
        image: e.target.files?.[0],
      });
      const file = e.target?.files?.[0];

      previewFile(file);
    }
  };

  const previewFile = (file: File | undefined) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as File);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  // useEffect(() => {}, [productData.image]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productDataWithNumberValues = {
      ...productData,
      price: parseFloat(productData.price),
      qtyInStock: parseInt(productData.qtyInStock, 10),
    };

    try {
      const newProduct = await addProduct(productDataWithNumberValues);
      // console.log("newProduct", newProduct);
      console.log("Product added:", newProduct);
      toast.success("Products added successfully!");
    } catch (error) {
      console.error("Error adding the product:", error);
      const errorMessage = getErrorMessage(
        error,
        "Error occurred while we were trying to add products!"
      );
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold  mb-4">Add Product to Inventory</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-6 rounded-xl border dark:border-zinc-500/50 p-12"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="name">Product Name</label>
          <input
            required
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            id="name"
            type="text"
            className="flex h-10 w-full rounded-md border bg-zinc-50 px-3 py-2 text-sm text-zinc-900 ring-offset-zinc-100 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="price">Price</label>
          <input
            required
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            id="price"
            type="number"
            className="flex h-10 w-full rounded-md border bg-zinc-50 px-3 py-2 text-sm text-zinc-900 ring-offset-zinc-100 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="qtyInStock">Quantity in Stock</label>
          <input
            type="number"
            id="qtyInStock"
            name="qtyInStock"
            value={productData.qtyInStock}
            onChange={handleInputChange}
            required
            className="flex h-10 w-full rounded-md border bg-zinc-50 px-3 py-2 text-sm text-zinc-900 ring-offset-zinc-100 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="flex h-10 w-full rounded-md border bg-zinc-50 px-3 py-2 text-sm text-zinc-900 ring-offset-zinc-100 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        {previewImage && (
          <img
            src={previewImage}
            alt="profile-image"
            width={256}
            className="mb-4"
          />
        )}
        <Button type="submit">Add to Inventory</Button>
      </form>
    </div>
  );
};

export default AddProduct;
