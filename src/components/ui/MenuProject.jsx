import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { UploadCloud } from "lucide-react"; // atau pakai svg lain kalau mau

export default function ProjectFormModal({ showMenu, setShowMenu }) {
  const [formData, setFormData] = useState({
    processName: "",
    projectLink: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setShowMenu(false);
  };

  return (
    <AnimatePresence>
      {showMenu && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
            onClick={() => setShowMenu(false)}
          ></div>

          {/* Modal Content */}
          <motion.div
            className="bg-white rounded-2xl p-6 z-50 w-[90%] max-w-md shadow-xl relative"
            initial={{ scale: 0.95, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 30 }}
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              🚀 Tambah Proses Project
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Nama Proses */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700">
                  Nama Proses
                </label>
                <input
                  type="text"
                  name="processName"
                  placeholder="Contoh: Frontend - Login Page"
                  value={formData.processName}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3629B7]"
                  required
                />
              </div>

              {/* Link Project */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700">
                  Link Project
                </label>
                <input
                  type="url"
                  name="projectLink"
                  placeholder="https://github.com/..."
                  value={formData.projectLink}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3629B7]"
                  required
                />
              </div>

              {/* Upload Gambar */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700">
                  Upload Gambar
                </label>
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center gap-2 p-4 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#3629B7] transition"
                >
                  <UploadCloud className="w-6 h-6 text-[#3629B7]" />
                  <span className="text-sm text-gray-600">
                    {formData.image ? formData.image.name : "Pilih gambar"}
                  </span>
                </label>
                <input
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                className="bg-[#3629B7] text-white py-2 px-4 rounded-lg hover:bg-[#2a22a0] transition font-semibold"
              >
                Simpan
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
