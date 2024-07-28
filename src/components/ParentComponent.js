import { useState } from "react";
import WritePage from "./write/page";// Adjust the import path as needed

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && <WritePage closeModal={closeModal} />}
    </div>
  );
};

export default ParentComponent;
