import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Header } from "../../components";
import axios from "axios";

const ModuleCompletionBar = () => {
  const [labels, setLabels] = useState();
  const [dataa, setDataa] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_LOCALHOST}/charts/pie`,
        {
          headers: {
            "auth-token": localStorage.getItem("access-token-fyp"),
          },
        }
      );
      console.log("MODULE-COMPLETION--->", data);
      const labelss = data.chartData.map((item) => item.x);
      const dataaa = data.chartData.map((item) => item.y);

      setLabels(labelss);
      setDataa(dataaa);
    };
    fetchData();
  }, []);
  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Pie" title="Modules Completion" />
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Module Completion",
              data: dataa,
              backgroundColor: ["teal", "brown", "indigo", "yellow", "magenta"],
            },
          ],
        }}
      />
    </div>
  );
};

export default ModuleCompletionBar;
