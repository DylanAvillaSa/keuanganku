"use client";

import React, { useEffect, useState } from "react";
import Calender from "@/components/ui/Calender";
import {
  IconDelete,
  IconIncome,
  IconOutcome,
  IconPlus,
} from "@/components/icon/TableIcon";
import { Calendar } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import MenuTrack from "@/components/ui/MenuTrack";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/configuration";
import {
  deleteData,
  getDatas,
} from "@/redux/features/moneyTrackSlice/moneyTrackSlice";

const PocketPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId.data);
  const [datas, setDatas] = useState(userId);
  const [showCalender, setShowCalender] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getDatas(datas));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDocs(collection(db, "my-money"));
      const newData = [];

      res.forEach((doc) => {
        const data = doc.data();
        newData.push({ id: doc.id, ...data });
      });

      setDatas(newData);
      // dispatch(getDatas(newData)); // ✅ simpan ke global state
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "my-money", id)); // hapus dari Firebase
      dispatch(deleteData(id)); // update state Redux agar card langsung hilang
    } catch (error) {
      console.error("Gagal hapus:", error);
    }
  };

  return (
    <section className="bg-slate-50 min-h-[85vh] max-h-[85vh] overflow-y-auto absolute bottom-0 p-5 sm:p-6 rounded-t-3xl left-0 right-0 w-full mt-[80px]">
      <div
        className="text-slate-500 flex items-center gap-3"
        onClick={() => setShowCalender(!showCalender)}
      >
        <Calendar />

        <span className="text-sm">Open Calender</span>
      </div>

      <AnimatePresence>
        {showCalender && (
          <motion.div
            initial={{ opacity: 0, translateX: -80 }}
            animate={{
              opacity: 1,
              translateX: 0,
              transition: { duration: 0.8 },
            }}
            exit={{
              opacity: 0,
              translateX: -80,
              transition: { duration: 0.8 },
            }}
            className="absolute w-[90%] left-1/2 -translate-x-1/2 z-20"
          >
            <Calender />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mb-20 px-4">
        {datas.length > 0 ? (
          datas.map((data, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between min-h-[200px] border border-gray-100"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#3629B7]/10 rounded-full">
                    {data.jenis === "pemasukan" ? (
                      <IconIncome className="text-[#3629B7]" />
                    ) : (
                      <IconOutcome className="text-[#3629B7]" />
                    )}
                  </div>
                  <p className="text-[#3629B7] font-semibold capitalize">
                    {data.jenis}
                  </p>
                </div>
                <span className="text-sm text-gray-400">{data.tanggal}</span>
              </div>

              {/* Body */}
              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-semibold text-gray-800">Kategori:</span>{" "}
                  {data.kategori}
                </p>
                <p className="leading-snug">
                  <span className="font-semibold text-gray-800">Catatan:</span>{" "}
                  <span className="font-normal block text-ellipsis overflow-hidden line-clamp-2">
                    {data.catatan}
                  </span>
                </p>
              </div>

              {/* Footer */}
              <div className="mt-4">
                <p className="text-xl font-bold text-[#3629B7]">
                  Rp {data.nominal}
                </p>
              </div>
              {/* Tombol Delete */}
              <button
                onClick={() => handleDelete(data.id)}
                className="absolute bottom-5 right-3 text-red-500 hover:text-red-700 transition"
              >
                <IconDelete />
              </button>
            </motion.div>
          ))
        ) : (
          <h1 className="text-center col-span-full text-lg font-bold text-gray-400">
            Belum ada data pemasukan/pengeluaran
          </h1>
        )}
      </motion.section>

      <button
        className="text-white bg-[#3629B7] rounded-full w-[60px] fixed bottom-[7rem] right-5 h-[60px] flex items-center justify-center"
        onClick={() => setShowModal(!showModal)}
      >
        <IconPlus />
      </button>

      {showModal && <MenuTrack onClose={() => setShowModal(false)} />}
    </section>
  );
};

export default PocketPage;
