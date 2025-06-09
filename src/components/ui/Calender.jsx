"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id"; // Kalau mau bahasa Indonesia
dayjs.locale("id");

export default function Calender() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const generateCalendar = () => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const daysInMonth = currentDate.daysInMonth();
    const startDay = startOfMonth.day();

    const calendar = [];

    // Isi awal kosong jika bulan tidak mulai dari hari Minggu
    for (let i = 0; i < startDay; i++) {
      calendar.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push(i);
    }

    return calendar;
  };

  const today = dayjs().date();
  const isCurrentMonth = dayjs().isSame(currentDate, "month");

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md mx-auto mt-10">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">
          {currentDate.format("MMMM YYYY")}
        </h2>
      </div>
      <div className="grid grid-cols-7 text-center font-semibold text-gray-500 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-gray-800">
        {generateCalendar().map((day, index) => (
          <div
            key={index}
            className={`h-10 flex items-center justify-center rounded-md ${
              day === today && isCurrentMonth
                ? "bg-indigo-500 text-white font-bold"
                : ""
            }`}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
}
