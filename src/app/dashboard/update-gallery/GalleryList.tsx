"use client";

import { useState, useEffect } from "react";
import AddOrUpdateGallery from "./AddOrUpdateGallery";
import DeleteGallery from "./DeleteGallery";

interface Gallery {
  id: string;
  title: string;
  description: string;
  photo: string;
  files: { name: string; link: string }[];
}

const GalleryList: React.FC = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editGallery, setEditGallery] = useState<Gallery | null>(null);
  const [deleteGalleryId, setDeleteGalleryId] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const res = await fetch("/api/gallery");
      if (!res.ok) throw new Error("Failed to fetch galleries.");
      const data = await res.json();
      setGalleries(data.data);
    } catch (error) {
      setError((error as Error).message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Gallery List</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="grid gap-4">
        {galleries.map((gallery) => (
          <div key={gallery.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{gallery.title}</h2>
            <p>{gallery.description}</p>
            <img src={gallery.photo} width={320} alt={gallery.title} className="mt-2" />

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setEditGallery(gallery)}
                className="text-white bg-blue-500 px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteGalleryId(gallery.id)}
                className="text-white bg-red-500 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editGallery && (
        <AddOrUpdateGallery
          gallery={editGallery}
          onClose={() => setEditGallery(null)}
          onRefresh={fetchGalleries}
        />
      )}

      {deleteGalleryId && (
        <DeleteGallery
          galleryId={deleteGalleryId}
          onDeleteSuccess={() => {
            setDeleteGalleryId(null);
            fetchGalleries();
          }}
          onClose={() => setDeleteGalleryId(null)}
        />
      )}
    </div>
  );
};

export default GalleryList;
