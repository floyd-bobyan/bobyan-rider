"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const EarningsMain = () => {
  const [riderID] = useState("646008");
  const [loading, setLoading] = useState(true);
  const [salaryDetails, setSalaryDetails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const generateData = async () => {
      try {
        const res = await fetch(
          `/api/salaries?id=${encodeURIComponent(riderID)}`,
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Request failed");
        console.log(data.rows);
        setSalaryDetails(data.rows);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    generateData();
  }, [riderID]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className={styles["page-main"]}>
        <div className={styles["page-content"]}>
          <div className={styles["page-header"]}>My Earnings</div>
          <div className={styles["results-section"]}></div>
        </div>
      </div>
    </>
  );
};

export default EarningsMain;
