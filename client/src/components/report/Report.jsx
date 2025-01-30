import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchDailySales } from "../../features/report/reportSlice";
import { AgChartsReact } from "ag-charts-react";
import { dailyProductsSaleRoute } from "../../utils/APIRoutes";
import axios from "axios";

const Report = () => {
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.report.reports);
  const [chartOptions, setChartOptions] = useState(null);
  const [chart2Options, setChart2Options] = useState(null);
  const [dailyProductsSaleQuantity, setDailyProductsSaleQuantity] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(dailyProductsSaleRoute);
      console.log(response.data.productQuantity);
      setDailyProductsSaleQuantity(response.data.productQuantity);
      if (response) {
        const chartOptions = {
          series: [{ type: "bar", xKey: "_id", yKey: "count" }], // Adjusted yKey to "count"
          title: { text: "Daily Sales Quantiy of Each Product" },
          subtitle: { text: "Data from Current Month" },
          data: response.data.productQuantity.map((report) => ({
            _id: report._id.productName,
            count: report.count,
            date: report._id.date,
          })),
        };
        setChart2Options(chartOptions);
      }
    };

    fetchdata();
  }, []);

  useEffect(() => {
    dispatch(fetchDailySales());
  }, [dispatch]);

  useEffect(() => {
    if (reports) {
      const chartOptions = {
        series: [{ type: "bar", xKey: "_id", yKey: "total_sales" }],
        title: { text: "Daily Sales" },
        subtitle: { text: "Data from Current Month" },
        data: reports.map((report) => ({
          _id: report._id,
          total_sales: report.total_sales,
        })),
      };
      setChartOptions(chartOptions);
    }
  }, [reports]);

  return (
    <>
      <Container>
        {chartOptions && <AgChartsReact options={chartOptions} />}
        {chart2Options && <AgChartsReact options={chart2Options} />}
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 90vh;
  width: 100vw;
  padding: 2rem;
  display: grid;
  grid-template-columns: 50% 50%;
`;

export default Report;
