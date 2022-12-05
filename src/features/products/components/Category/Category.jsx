import React, { useEffect } from "react";
import { useState } from "react";
import useCategory from "../../../../hooks/useCategories";
import ListCategories from "./ListCategories";
import NewCategory from "./NewCategory";
import UpdateCategory from "./UpdateCategory";

const CreateCategory = () => {
  const {
    createCategory,
    getCategories,
    updateAsyncCategory,
    delAsyncCategory,
    data,
  } = useCategory();

  useEffect(() => {
    getCategories();
  }, []);

  const [isUpdate, setIsUpdate] = useState(false);

  const [selectItem, setSelectItem] = useState();

  const handleUpdate = (item) => {
    setIsUpdate(true);
    setSelectItem(item);
  };

  return (
    <div>
      <div className="bg-white shadow-md w-full rounded-xl flex px-4 py-10 mt-40 gap-8 ">
        <div className="w-4/12">
          {isUpdate ? (
            <UpdateCategory selectItem={selectItem} onClick={() => setIsUpdate(false)}  updateCategory={updateAsyncCategory} />
          ) : (
            <NewCategory createCategory={createCategory} />
          )}
        </div>
        <div className="w-8/12">
          <ListCategories
            categories={data}
            hanleUpdale={handleUpdate}
            hanleDelete={delAsyncCategory}
            
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
