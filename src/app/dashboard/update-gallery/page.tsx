'use client'

import { useState } from "react";
import GalleryList from "./GalleryList";
import AddOrUpdateGallery from "./AddOrUpdateGallery";

const GalleryPage = () => {
  const [editingGallery, setEditingGallery] = useState(null);

  const handleEdit = (gallery: any) => {
    setEditingGallery(gallery);
  };

  const handleSave = () => {
    setEditingGallery(null); // Reset form after save
  };

  return (
    <div>
      {editingGallery ? (
        <AddOrUpdateGallery gallery={editingGallery} onSave={handleSave} />
      ) : (
        <GalleryList onEdit={handleEdit} />
      )}
    </div>
  );
};

export default GalleryPage;
