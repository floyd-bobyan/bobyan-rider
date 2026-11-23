"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./styles.module.scss";
import { fetchEarnings } from "../../../lib/slices/earnings";
import { EARNINGS_BREAKDOWN } from "../../../utils/earnings-breakdown";
import { buildEarningsSections } from "../../../helpers/earnings-formatter";
import { LuBike } from "react-icons/lu";
import { FaCar } from "react-icons/fa";

const EarningsMain = () => {
  const [riderDetails, setRiderDetails] = useState([]);
  const [salaryDetails, setSalaryDetails] = useState([]);

  const dispatch = useDispatch();
  const { loading, data: earningsData, error } = useSelector((s) => s.earnings);


  useEffect(() => {
    const storedRiderDetails = JSON.parse(sessionStorage.getItem("rider") || "");

    if (storedRiderDetails?.id) {
      setRiderDetails(storedRiderDetails);
      dispatch(fetchEarnings(storedRiderDetails.id));
    }
  }, [])

  useEffect(() => {

    if (earningsData?.length) {
      setSalaryDetails(buildEarningsSections(earningsData[0]));
    } else {
      setSalaryDetails([]);
    }
  }, [earningsData]);

  console.log("salaryDetails", salaryDetails);
  console.log("earningsData", earningsData[0]);

  return (
    <>
      <div className={styles["earnings-page-main"]}>
        <div className={styles["page-header"]}>My Earnings</div>

        {/* details */}
        <div className={styles["details-section"]}>
          <div className={styles["name-id"]}>
            <div className={styles["fleet-icon"]}>
              {(earningsData[0]?.["Bike/Car"]) === "Bike" ? <LuBike /> : <FaCar />}
            </div>
            {earningsData[0]?.["Driver Name"] || ""} | {earningsData[0]?.["Driver ID"] || ""}
          </div>
          <div className={styles["salary"]}>{earningsData[0]?.["Net Salary"] || ""} KWD</div>
        </div>

        {/* order stats */}
        <div className={styles["orders-section"]}>
          {salaryDetails[0]?.fields?.map((item) => {
            return (
              <>
                {item?.value > 0 && (
                  <div className={styles["stats-card"]}>
                    <div className={styles["card-value"]}>{item?.value}</div>
                    <div className={styles["card-text"]}>{item?.label}</div>
                  </div>
                )}
              </>
            )
          })}
        </div>

        {/* breakdown list */}
        <div className={styles["breakdown-section"]}>
          <div className={`${styles["breakdown-card"]} ${styles["breakdown-card-header"]}`}>
            <div className={styles["card-value"]}>Description</div>
            <div className={styles["card-text"]}>Amount</div>
          </div>
          {salaryDetails[1]?.fields?.map((item) => {
            return (
              <div className={styles["breakdown-card"]}>
                <div className={styles["card-text"]}>{item?.label}</div>
                <div className={styles["card-value"]}>{item?.value}</div>
              </div>
            )
          })}
        </div>
        
        <div className={styles["breakdown-section"]}>
          {salaryDetails[2]?.fields?.map((item) => {
            return (
              <div className={styles["breakdown-card"]}>
                <div className={styles["card-text"]}>{item?.label}</div>
                <div className={styles["card-value"]}>{item?.value}</div>
              </div>
            )
          })}
        </div>
        <div className={styles["breakdown-section"]}>
          <div className={`${styles["breakdown-card"]} ${styles["breakdown-card-footer"]}`}>
            <div className={styles["card-value"]}>Net Salary</div>
            <div className={styles["card-text"]}>{earningsData[0]?.["Net Salary"] || ""} KWD</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EarningsMain;
