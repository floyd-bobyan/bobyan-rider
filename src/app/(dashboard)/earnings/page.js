"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { LuBike } from "react-icons/lu";
import { FaCar } from "react-icons/fa";

import styles from "./styles.module.scss";
import { fetchEarnings } from "../../../lib/slices/earnings";
import { buildEarningsSections } from "../../../helpers/earnings-formatter";
import BobyanLoader from "../../components/loader/index";

const EarningsMain = () => {
  const [riderDetails, setRiderDetails] = useState([]);
  const [salaryDetails, setSalaryDetails] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);

  const dispatch = useDispatch();
  const {
    loading: earningsLoading,
    data: earningsData,
    error,
  } = useSelector((s) => s.earnings);

  useEffect(() => {
    const storedRiderDetails = JSON.parse(
      sessionStorage.getItem("rider") || "",
    );

    if (storedRiderDetails?.id) {
      setRiderDetails(storedRiderDetails);
      dispatch(fetchEarnings(storedRiderDetails.id));
    }
  }, []);

  useEffect(() => {
    if (earningsData?.length) {
      setSalaryDetails(buildEarningsSections(earningsData[0]));
    } else {
      setSalaryDetails([]);
    }

    setPageLoader(earningsLoading);
  }, [earningsData, earningsLoading]);

  return (
    <>
      <div className={styles["earnings-page-main"]}>
        <div className={styles["page-header"]}>My Earnings</div>

        {pageLoader ? (
          <div className={styles["details-loader"]}>
            <BobyanLoader text="Loading your earnings..." />
          </div>
        ) : (
          <>
            {/* details */}
            <div className={styles["details-section"]}>
              <div className={styles["name-id"]}>
                <div className={styles["fleet-icon"]}>
                  {earningsData[0]?.["Bike/Car"] === "Bike" ? (
                    <LuBike />
                  ) : (
                    <FaCar />
                  )}
                </div>
                {earningsData[0]?.["Driver Name"] || ""} |{" "}
                {earningsData[0]?.["Driver ID"] || ""}
              </div>
              <div className={styles["salary"]}>
                {earningsData[0]?.["Net Salary"] || ""} KWD
              </div>
            </div>

            {/* order stats */}
            <div className={styles["orders-section"]}>
              {salaryDetails[0]?.fields?.map((item, index) => {
                if (item?.value <= 0) {
                  return null;
                }

                return (
                  <div className={styles["stats-card"]} key={item?.label} style={{ animationDelay: `${index * 1}s` }}>
                    <div className={styles["card-value"]}>{item?.value}</div>
                    <div className={styles["card-text"]}>{item?.label}</div>
                  </div>
                );
              })}
            </div>

            {/* breakdown list */}
            <div className={styles["breakdown-section"]}>
              <div
                className={`${styles["breakdown-card"]} ${styles["breakdown-card-header"]}`}
              >
                <div className={styles["card-value"]}>Description</div>
                <div className={styles["card-text"]}>Amount</div>
              </div>
              {salaryDetails[1]?.fields?.map((item) => {
                return (
                  <div className={styles["breakdown-card"]} key={item?.label}>
                    <div className={styles["card-text"]}>{item?.label}</div>
                    <div className={styles["card-value"]}>{item?.value}</div>
                  </div>
                );
              })}
            </div>

            <div className={styles["breakdown-section"]}>
              {salaryDetails[2]?.fields?.map((item) => {
                return (
                  <div className={styles["breakdown-card"]} key={item?.label}>
                    <div className={styles["card-text"]}>{item?.label}</div>
                    <div className={styles["card-value"]}>{item?.value}</div>
                  </div>
                );
              })}
            </div>

            <div className={styles["breakdown-section"]}>
              <div
                className={`${styles["breakdown-card"]} ${styles["breakdown-card-footer"]}`}
              >
                <div className={styles["card-value"]}>Net Salary</div>
                <div className={styles["card-text"]}>
                  {earningsData[0]?.["Net Salary"] || ""} KWD
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EarningsMain;
