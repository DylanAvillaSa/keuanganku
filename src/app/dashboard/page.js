"use client";

import CardItem from "@/components/ui/CardItem";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase/configuration";

import { useSelector } from "react-redux";

const DashboardPage = () => {
  const userProfile = useSelector((state) => state.user.user);
  const [totalSaldo, setTotalSaldo] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getDocs(collection(db, "my-money"));
      const newData = [];

      res.forEach((doc) => {
        const data = doc.data();
        newData.push({ id: doc.id, ...data });
      });

      // Hitung total saldo berdasarkan jenis transaksi
      const totalNominal = newData.reduce((total, item) => {
        const nilai = parseInt(item.nominal.replace(/\./g, ""), 10);
        if (item.jenis === "pengeluaran") {
          return total - nilai; // kalau pengeluaran, dikurangin
        } else {
          return total + nilai; // default (anggap pemasukan)
        }
      }, 0);

      // Format ke rupiah
      const totalFormatted = totalNominal.toLocaleString("id-ID");

      setTotalSaldo(totalFormatted);
    };

    fetchData();
  }, []);

  return (
    <section className="w-full min-h-screen">
      {/* Container */}
      <div
        id="container"
        className="bg-slate-50 min-h-[85vh] max-h-[85vh] overflow-y-auto absolute bottom-0 p-5 sm:p-6 rounded-t-3xl left-0 right-0 w-full mt-[80px]"
      >
        {/* Wallet Card */}
        <div className="max-w-screen-lg mx-auto">
          <div className="relative w-full max-w-md mx-auto h-[204px] rounded-xl p-5 z-30 overflow-hidden shadow-lg text-white bg-gradient-to-r from-[#2B1A9D] to-[#36A3FF]">
            {/* Decorations */}
            <div className="absolute w-[300px] h-[300px] bg-[#3629B7] rounded-full -left-32 -top-20 opacity-70 z-0"></div>
            <div className="absolute w-[180px] h-[180px] bg-[#40B3FF] rounded-full right-[-40px] top-[-40px] opacity-90 z-0"></div>

            {/* Card Content */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-semibold truncate">
                  {userProfile?.username || "Default user"}
                </h3>
                <p className="text-sm mt-1">My wallet</p>
              </div>
              <div>
                <div className="flex items-center justify-between mt-2 tracking-widest text-sm">
                  <span>Wallet</span>
                  <span>••••</span>
                  <span>••••</span>
                  <span>2025</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xl font-bold">Rp {totalSaldo}</p>
                  <p className="text-base font-bold">VISA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card List */}
          <div className="mt-12 flex flex-wrap gap-5 justify-center sm:justify-start">
            <Link href="/pocket">
              <CardItem img="wallet" title="My Pocket" />
            </Link>
            <Link href="/project">
              <CardItem img="projek" title="My Project" />
            </Link>
            <Link href="/debt">
              <CardItem img="hutang" title="My Debt" />
            </Link>
            <Link href="/invest">
              <CardItem img="save" title="My Investment" />
            </Link>

            <Link href="/report">
              <CardItem img="contact" title="My Report" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
