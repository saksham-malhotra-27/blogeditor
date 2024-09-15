"use client";
import React, { useEffect, useState } from "react";

export default function Footer() {
  const [dateTime, setDateTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const current = new Date();
      const formattedDateTime = `${current.toLocaleDateString()} ${current.toLocaleTimeString()}`;
      setDateTime(formattedDateTime);
    };

    updateDateTime(); // set initial date and time
    const interval = setInterval(updateDateTime, 1000); // update every second

    return () => clearInterval(interval); // cleanup on component unmount
  }, []);

  return (
    <footer className="w-full mt-10">
      <div className="border-t border-white text-center py-4">
        <p className="text-sm text-neutral-500">© {new Date().getFullYear()} Go Hard. All rights reserved.</p>
        <p className="text-sm text-neutral-500">Current date and time: {dateTime}</p>
      </div>
    </footer>
  );
}
