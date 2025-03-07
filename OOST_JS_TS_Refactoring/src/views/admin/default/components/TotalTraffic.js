// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import My_LineChart from "components/charts/LineChart";
//import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
// import {
//   lineChartDataTotalSpent,
//   lineChartOptionsTotalSpent,
//   lineChartDataTotalTraffic,
//   lineChartOptionsTotalTraffic,
//   lineChartDataCategory,
//   CategoryArr
// } from "variables/charts";
import { CategoryArr } from "variables/CategoryArr"
import { testArr } from "variables/test_1"
import React, { useState } from "react";
import {Select} from "@chakra-ui/react";
import ReactApexChart from "react-apexcharts";
//
function MyLineChart(props) {
  const { lineChartData } = props;
  return (
    console.log("props 받은 후 lineChartData: ",lineChartData),
	<ReactApexChart
          type="line"
          series= {[
           	 { name: "Rate", data:lineChartData},
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            stroke: {curve: "smooth",type: "line",},
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              categories: ["2023-07-10", "2023-07-11", "2023-07-12", "2023-07-13", "2023-07-14", "2023-07-15", 
                "2023-07-16", "2023-07-17", "2023-07-18","2023-07-19"],
              type: "category",
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["red"],
            tooltip: {
              y: { formatter: (value) => `${value.toFixed(2)}%` },
            },
          }}
        />
  );
}
//
export default function TotalTraffic(props) {
  const { ...rest } = props;

  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const [selectedValue, setSelectedValue] = useState("");
  const [lineChartDataTotalTraffic, setLineChartDataTotalTraffic] =useState([98.78086,93.67638,92.48594,91.16791,87.63247,91.41591,96.74643,100.0,91.99016,87.48128]);
  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    
    setSelectedValue(selectedCategory);
    console.log("selectedCategory의 값(set함수 후) :",selectedCategory)

    setLineChartDataTotalTraffic(testArr[selectedCategory][0].data)
    console.log("Set 후에 lineChartDataTotalTraffic :",lineChartDataTotalTraffic)     
  };
  
  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex align='center' w='100%'>
          <Select placeholder="카테고리 선택" size="lg" onChange={handleChange} value={selectedValue}
            bg={boxBg}
            fontSize = 'sm'
            fontWeight ='500'
            color={textColorSecondary}> 
            <option value="가구/인테리어">가구/인테리어</option>
            <option value="도서">도서</option>
            <option value="디지털/가전">디지털/가전</option>
            <option value="생활/건강">생활/건강</option>
            <option value="스포츠/레저">스포츠/레저</option>
            <option value="식품">식품</option>
            <option value="출산/육아">출산/육아</option>
            <option value="패션의류">패션의류</option>
            <option value="패션잡화">패션잡화</option>
            <option value="화장품/미용">화장품/미용</option>
          </Select>
          {/* <Button
            ms='auto'
            align='center'
            justifyContent='center'
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w='37px'
            h='37px'
            lineHeight='100%'
            borderRadius='10px'
            {...rest}>
            <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
          </Button> */}
        </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
        <Flex flexDirection='column' me='20px' mt='28px'>
          <Text
            color={textColor}
            fontSize='17px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'>
            주간 클릭 동향
          </Text>
          <Flex align='center' mb='20px'>
            <Text
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'
              mt='4px'
              me='12px'>
              23/07/10 ~ 23/07/19
            </Text>
            {/* <Flex align='center'>
              <Icon as={RiArrowUpSFill} color='green.500' me='2px' mt='2px' />
              <Text color='green.500' fontSize='sm' fontWeight='700'>
                +12.45%
              </Text>
            </Flex> */}
          </Flex>

          <Flex align='center'>
            <Icon as={IoCheckmarkCircle} color='green.500' me='4px' />
            <Text color='green.500' fontSize='md' fontWeight='700'>
              Live
            </Text>
          </Flex>
        </Flex>
        <Box minH='260px' minW='75%' mt='auto'>
          {/* <LineChart
            chartData={lineChartDataTotalTraffic}
            //chartData = {updatedChartData}
            chartOptions={lineChartOptionsTotalTraffic}
          /> */}
          <MyLineChart lineChartData={lineChartDataTotalTraffic} />
        </Box>
      </Flex>
    </Card>
  );
};

// export { updatedChartData };
