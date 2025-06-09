"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PageReport = () => {
  const totalInvestasi = 6500000;
  const totalCicilan = 1728000;
  const saldo = 1200000;

  const labels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"];
  const dataLine = {
    labels,
    datasets: [
      {
        label: "Nilai Investasi (Rp)",
        data: [1000000, 1500000, 2300000, 2900000, 4700000, 6500000],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79,70,229,0.3)",
        tension: 0.4,
      },
      {
        label: "Total Cicilan (Rp)",
        data: [288000, 576000, 864000, 1152000, 1440000, 1728000],
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.3)",
        tension: 0.4,
      },
    ],
  };

  const optionsLine = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Grafik Investasi & Cicilan 6 Bulan Terakhir",
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) =>
            new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(value),
        },
      },
    },
  };

  const cicilanTerbaru = [
    {
      id: 1,
      nama: "Monitor 27 inch Ultra Wide dengan resolusi 4K sangat detail dan warna akurat",
      totalHarga: 1728000,
      bayarPerBulan: 288000,
      bulanBayar: 6,
      bulanSudahBayar: 2,
      status: "Berjalan",
    },
    {
      id: 2,
      nama: "Smartphone Flagship Model Terbaru",
      totalHarga: 3600000,
      bayarPerBulan: 600000,
      bulanBayar: 6,
      bulanSudahBayar: 6,
      status: "Selesai",
    },
  ];

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div
      id="container"
      className="bg-slate-50 min-h-[85vh] max-h-[85vh] overflow-y-auto absolute bottom-0 p-5 sm:p-6 rounded-t-3xl left-0 right-0 w-full mt-[80px] pb-24"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-8 drop-shadow-sm text-center sm:text-left">
          📊 Laporan Keuangan
        </h1>

        {/* Ringkasan */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "Total Investasi",
              value: totalInvestasi,
              color: "text-indigo-600",
            },
            {
              title: "Total Cicilan",
              value: totalCicilan,
              color: "text-green-600",
            },
            { title: "Saldo Tersisa", value: saldo, color: "text-red-600" },
          ].map(({ title, value, color }) => (
            <div
              key={title}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center"
            >
              <h2 className="text-lg font-semibold text-gray-600 mb-2 truncate">
                {title}
              </h2>
              <p className={`text-2xl font-bold ${color} truncate`}>
                {formatRupiah(value)}
              </p>
            </div>
          ))}
        </div>

        {/* Grafik investasi & cicilan */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-full h-[320px] sm:h-[400px]">
          <Line options={optionsLine} data={dataLine} />
        </div>

        {/* Tabel cicilan terbaru dengan scroll horizontal */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-full overflow-x-auto">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">
            Cicilan Terbaru
          </h2>
          <table className="w-full min-w-[700px] text-left border-collapse border border-gray-300">
            <thead className="bg-indigo-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 max-w-[180px]">
                  Nama Barang
                </th>
                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                  Total Harga
                </th>
                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                  Bayar/Bulan
                </th>
                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                  Bulan Bayar
                </th>
                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                  Bulan Sudah Bayar
                </th>
                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {cicilanTerbaru.map((item) => (
                <tr
                  key={item.id}
                  className={`${
                    item.status === "Selesai" ? "bg-green-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
                >
                  <td
                    className="border border-gray-300 px-4 py-2 max-w-[180px] break-words"
                    title={item.nama}
                  >
                    {item.nama}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {formatRupiah(item.totalHarga)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {formatRupiah(item.bayarPerBulan)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {item.bulanBayar}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {item.bulanSudahBayar}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-semibold whitespace-nowrap ${
                      item.status === "Selesai"
                        ? "text-green-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Statistik bulan ini */}
        <div className="bg-white rounded-xl shadow-md p-6 max-w-full">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">
            Statistik Bulan Ini
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg max-w-md mx-auto sm:mx-0">
            <li>Total Bayar Cicilan: {formatRupiah(288000)}</li>
            <li>Total Investasi Bertambah: {formatRupiah(600000)}</li>
            <li>Saldo Akhir Bulan: {formatRupiah(saldo)}</li>
            <li>Persentase Pertumbuhan Investasi: 8.5%</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageReport;
