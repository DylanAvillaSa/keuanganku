"use client";
import React, { useState } from "react";
import { Pencil, Trash2, CheckCircle, PlusCircle } from "lucide-react";

const DebtPage = () => {
  const [debts, setDebts] = useState([
    {
      id: 1,
      nama: "Monitor LG 24 inch",
      total: 2000000,
      cicilanPerBulan: 288000,
      bulanDibayar: 2,
      totalBulan: 6, // total bulan cicilan
      status: "Progres",
    },
  ]);

  const [form, setForm] = useState({
    nama: "",
    total: "",
    cicilanPerBulan: "",
    bulanDibayar: 0,
    totalBulan: 1,
  });

  const [isEditing, setIsEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isEditing !== null) {
      setDebts((prev) =>
        prev.map((item) =>
          item.id === isEditing ? { ...item, ...form, id: item.id } : item
        )
      );
      setIsEditing(null);
    } else {
      setDebts([
        ...debts,
        {
          ...form,
          id: Date.now(),
          status: "Progres",
          bulanDibayar: Number(form.bulanDibayar),
          totalBulan: Number(form.totalBulan),
        },
      ]);
    }

    setForm({
      nama: "",
      total: "",
      cicilanPerBulan: "",
      bulanDibayar: 0,
      totalBulan: 1,
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setDebts(debts.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(item.id);
    setShowForm(true);
  };

  const markAsSelesai = (id) => {
    setDebts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Selesai" } : item
      )
    );
  };

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className="bg-slate-50 min-h-[85vh] max-h-[85vh] overflow-y-auto absolute bottom-0 p-5 sm:p-6 rounded-t-3xl left-0 right-0 w-full mt-[80px] pb-20">
      <h1 className="text-xl font-bold text-[#3629B7] mb-5">
        📑 Daftar Cicilan
      </h1>

      <button
        onClick={() => {
          setShowForm(!showForm);
          if (isEditing !== null) setIsEditing(null);
          if (!showForm)
            setForm({
              nama: "",
              total: "",
              cicilanPerBulan: "",
              bulanDibayar: 0,
              totalBulan: 1,
            });
        }}
        className="flex items-center gap-2 bg-[#3629B7] text-white px-4 py-2 rounded-lg hover:bg-[#2e24a0] transition mb-4"
      >
        <PlusCircle size={18} /> {showForm ? "Tutup Form" : "Tambah Cicilan"}
      </button>

      {showForm && (
        <div className="bg-white shadow p-4 rounded-xl mb-6">
          <h2 className="font-semibold text-lg mb-2">
            {isEditing ? "Edit Cicilan" : "Form Cicilan Baru"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="nama"
              placeholder="Nama barang"
              value={form.nama}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="number"
              name="total"
              placeholder="Total harga"
              value={form.total}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="number"
              name="cicilanPerBulan"
              placeholder="Cicilan per bulan"
              value={form.cicilanPerBulan}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="number"
              name="bulanDibayar"
              placeholder="Sudah dibayar bulan ke-"
              value={form.bulanDibayar}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="number"
              name="totalBulan"
              placeholder="Total bulan cicilan"
              value={form.totalBulan}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
          </div>
          <button
            className="mt-4 bg-[#3629B7] text-white px-4 py-2 rounded-lg hover:bg-[#2e24a0] transition"
            onClick={handleSubmit}
          >
            {isEditing ? "Update" : "Simpan"}
          </button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {debts.map((item) => {
          const persentase = Math.min(
            (item.bulanDibayar / item.totalBulan) * 100,
            100
          ).toFixed(0);

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                {item.nama}
              </h3>
              <p className="text-sm text-gray-600">
                Total: {formatRupiah(item.total)}
              </p>
              <p className="text-sm text-gray-600">
                Cicilan / bulan: {formatRupiah(item.cicilanPerBulan)}
              </p>
              <p className="text-sm text-gray-600">
                Dibayar: {item.bulanDibayar} dari {item.totalBulan} bulan
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-3">
                <div
                  className="bg-[#3629B7] h-2.5 rounded-full"
                  style={{ width: `${persentase}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    item.status === "Selesai"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>

                <div className="flex gap-2">
                  {item.status !== "Selesai" && (
                    <button
                      onClick={() => markAsSelesai(item.id)}
                      title="Tandai selesai"
                      className="text-green-600 hover:text-green-800"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(item)}
                    title="Edit"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    title="Hapus"
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DebtPage;
