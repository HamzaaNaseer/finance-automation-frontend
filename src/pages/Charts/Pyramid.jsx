import React from 'react';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationLegend, AccumulationDataLabel, AccumulationTooltip, PyramidSeries, AccumulationSelection } from '@syncfusion/ej2-react-charts';

import { useStateContext } from '../../contexts/ContextProvider';
import { Error, Header, Loader } from '../../components';
import { useGetPyramidDataQuery } from '../../redux/charts/pyramidApi';
import { useAlert } from 'react-alert';

const Pyramid = () => {
  const { currentMode } = useStateContext();


  const { data, isLoading, error } = useGetPyramidDataQuery()
  const alert = useAlert()

  if (isLoading) return <Loader />

  if (error) {
    alert.error(error.data.message)
    alert.removeAll()
    return <Error />
  }


  return (
    <div className="m-4 md:m-10 mt-24  p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Pyramid" title="Complaints By Block  Chart" />
      <div className="w-full">
        <AccumulationChartComponent
          id="pyramid-chart"
          legendSettings={{ background: 'white' }}
          tooltip={{ enable: true }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
        >
          <Inject services={[AccumulationDataLabel, AccumulationTooltip, PyramidSeries, AccumulationLegend, AccumulationSelection]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              name="Block"
              dataSource={data.chartData}
              xName="x"
              yName="y"
              type="Pyramid"
              width="45%"
              height="80%"
              neckWidth="15%"
              gapRatio={0.03}
              explode
              emptyPointSettings={{ mode: 'Drop', fill: 'red' }}
              dataLabel={{
                visible: true,
                position: 'Inside',
                name: 'text',
              }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
};

export default Pyramid;