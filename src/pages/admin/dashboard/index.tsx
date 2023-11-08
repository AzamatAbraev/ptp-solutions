import { Spin } from "antd";

import "./style.scss";

import useAuth from "../../../zustand/auth";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { role } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timerId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);
  
  return (
    <Spin spinning={isLoading}>
      <section>
        <div className="container">
          <div className="main-stats">
            <h2 className="dashboard-title">Welcome abord, {role}</h2>
            <p className="dashboard-desc">
              Stay updated with the latest statistics
            </p>
          </div>
          <div className="stats-row">
            <div className="stats-card">
              <h3>Active users</h3>
              {/* <p>+{users?.total}</p> */}
            </div>
            <div className="stats-card">
              <h3>Experienced users</h3>
              {/* <p>+{experience?.total}</p> */}
            </div>
            <div className="stats-card">
              <h3>Messages</h3>
              {/* <p>+{messages?.total}</p> */}
            </div>
            <div className="stats-card">
              <h3>Portfolios</h3>
              {/* <p>+{portfolios?.total}</p> */}
            </div>
          </div>
        </div>
      </section>
    </Spin>
  );
};

export default DashboardPage;
