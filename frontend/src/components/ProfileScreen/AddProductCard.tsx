import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { PlusIcon } from "@heroicons/react/20/solid";

const AddProductCard = () => {
  return (
    <div className="p-6 rounded-xl border dark:border-zinc-500/50 flex flex-col gap-6">
      <p className="text-4xl font-medium">Create Product</p>
      <div className="w-fit">
        <Button>
          <Link to={"/createproduct"}>
            <div className="flex justify-center items-center gap-3">
              <PlusIcon className="h-5 w-5 flex-shrink-0" />
              <span>Create Product</span>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AddProductCard;
