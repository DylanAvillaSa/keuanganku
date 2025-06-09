"use client";
import { addData } from "@/helper/money_track";
import {
  getDatas,
  addDatas,
} from "@/redux/features/moneyTrackSlice/moneyTrackSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MenuTrack({ onClose }) {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.userId.data);
  const [form, setForm] = useState({
    jenis: "pemasukan",
    kategori: "",
    nominal: "",
    tanggal: "",
    catatan: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id: userId } = await addData(form);
    dispatch(addDatas(form));
    dispatch(getDatas([...datas, form]));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Tambah Transaksi
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center gap-4">
            <label className="inline-flex items-center gap-1 text-sm text-gray-700">
              <input
                type="radio"
                name="jenis"
                value="pemasukan"
                checked={form.jenis === "pemasukan"}
                onChange={handleChange}
              />
              Pemasukan
            </label>
            <label className="inline-flex items-center gap-1 text-sm text-gray-700">
              <input
                type="radio"
                name="jenis"
                value="pengeluaran"
                checked={form.jenis === "pengeluaran"}
                onChange={handleChange}
              />
              Pengeluaran
            </label>
          </div>

          <input
            type="text"
            name="kategori"
            placeholder="Kategori (contoh: Gaji, Makan)"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
            value={form.kategori}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="nominal"
            placeholder="Nominal (Rp)"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
            value={form.nominal}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="tanggal"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
            value={form.tanggal}
            onChange={handleChange}
            required
          />

          <textarea
            name="catatan"
            placeholder="Catatan tambahan (opsional)"
            rows="3"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
            value={form.catatan}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
