"use client";
import React, { useState } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

const InvestPage = () => {
  const [invests, setInvests] = useState([
    {
      id: 1,
      nama: "Bibit Reksadana Pasar Uang",
      modal: 1000000,
      nilaiSekarang: 1050000,
      kontribusiBulanan: 200000,
      bulanInvestasi: 5,
    },
    {
      id: 2,
      nama: "Bibit Reksadana Saham",
      modal: 5000000,
      nilaiSekarang: 5500000,
      kontribusiBulanan: 500000,
      bulanInvestasi: 8,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    modal: "",
    nilaiSekarang: "",
    kontribusiBulanan: "",
    bulanInvestasi: 1,
  });

  const [isEditing, setIsEditing] = useState(null);

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.nama || !form.modal || !form.nilaiSekarang) {
      alert("Mohon isi nama, modal, dan nilai sekarang");
      return;
    }

    if (isEditing !== null) {
      setInvests((prev) =>
        prev.map((item) =>
          item.id === isEditing
            ? {
                ...form,
                id: item.id,
                modal: Number(form.modal),
                nilaiSekarang: Number(form.nilaiSekarang),
                kontribusiBulanan: Number(form.kontribusiBulanan || 0),
                bulanInvestasi: Number(form.bulanInvestasi),
              }
            : item
        )
      );
      setIsEditing(null);
    } else {
      setInvests([
        ...invests,
        {
          ...form,
          id: Date.now(),
          modal: Number(form.modal),
          nilaiSekarang: Number(form.nilaiSekarang),
          kontribusiBulanan: Number(form.kontribusiBulanan || 0),
          bulanInvestasi: Number(form.bulanInvestasi),
        },
      ]);
    }
    setForm({
      nama: "",
      modal: "",
      nilaiSekarang: "",
      kontribusiBulanan: "",
      bulanInvestasi: 1,
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus investasi ini?")) {
      setInvests(invests.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(item.id);
    setShowForm(true);
  };

  return (
    <div className="bg-gray-50 min-h-[85vh] max-h-[85vh] overflow-y-auto absolute bottom-0 p-6 rounded-t-3xl left-0 right-0 w-full mt-[80px] pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-8 drop-shadow-sm">
          📈 Investasi Saya
        </h1>

        <button
          onClick={() => {
            setShowForm(!showForm);
            if (isEditing !== null) setIsEditing(null);
            if (!showForm)
              setForm({
                nama: "",
                modal: "",
                nilaiSekarang: "",
                kontribusiBulanan: "",
                bulanInvestasi: 1,
              });
          }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition text-white rounded-xl px-5 py-3 shadow-md font-semibold mb-8 select-none"
        >
          <PlusCircle size={20} />
          {showForm ? "Tutup Form" : "Tambah Investasi Baru"}
        </button>

        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-10 border border-indigo-200 max-w-xl mx-auto">
            <h2 className="text-xl font-bold text-indigo-600 mb-5">
              {isEditing ? "Edit Investasi" : "Form Tambah Investasi"}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                type="text"
                name="nama"
                placeholder="Nama Investasi (misal: Bibit Reksadana Saham)"
                value={form.nama}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <input
                type="number"
                name="modal"
                placeholder="Modal awal (Rp)"
                value={form.modal}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <input
                type="number"
                name="nilaiSekarang"
                placeholder="Nilai investasi sekarang (Rp)"
                value={form.nilaiSekarang}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <input
                type="number"
                name="kontribusiBulanan"
                placeholder="Kontribusi per bulan (opsional)"
                value={form.kontribusiBulanan}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <input
                type="number"
                name="bulanInvestasi"
                placeholder="Durasi investasi (bulan)"
                min={1}
                value={form.bulanInvestasi}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition sm:col-span-2"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition rounded-xl text-white py-3 font-semibold shadow-md"
            >
              {isEditing ? "Update Investasi" : "Simpan Investasi"}
            </button>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {invests.map((item) => {
            const keuntungan = item.nilaiSekarang - item.modal;
            const persentase =
              item.modal > 0 ? ((keuntungan / item.modal) * 100).toFixed(1) : 0;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-indigo-700 mb-3 truncate">
                  {item.nama}
                </h3>

                <div className="text-gray-700 space-y-1">
                  <p>
                    Modal awal:{" "}
                    <span className="font-medium text-indigo-600">
                      {formatRupiah(item.modal)}
                    </span>
                  </p>
                  <p>
                    Nilai sekarang:{" "}
                    <span
                      className={`font-semibold ${
                        keuntungan >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatRupiah(item.nilaiSekarang)}
                    </span>
                  </p>
                  <p>
                    Kontribusi/bulan:{" "}
                    <span className="font-medium">
                      {formatRupiah(item.kontribusiBulanan)}
                    </span>
                  </p>
                  <p>
                    Durasi investasi:{" "}
                    <span className="font-medium">
                      {item.bulanInvestasi} bulan
                    </span>
                  </p>
                </div>

                <div className="mt-5">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all duration-500 ${
                        keuntungan >= 0 ? "bg-green-500" : "bg-red-500"
                      }`}
                      style={{
                        width: `${Math.min(Math.abs(persentase), 100)}%`,
                      }}
                    ></div>
                  </div>
                  <p className="mt-1 text-center text-sm font-semibold text-gray-700 select-none">
                    {keuntungan >= 0 ? "+" : "-"}
                    {Math.abs(persentase)}% keuntungan
                  </p>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => handleEdit(item)}
                    title="Edit Investasi"
                    className="text-indigo-600 hover:text-indigo-900 transition"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    title="Hapus Investasi"
                    className="text-red-600 hover:text-red-900 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InvestPage;
