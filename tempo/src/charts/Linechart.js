
import React, { useState, useEffect, useRef } from "react";
import colorsData from './Colors.json';

//import Line chart
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

//import font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong, faCircle, faRightLong } from '@fortawesome/free-solid-svg-icons';



function Linechart({ fromdate, todate, handlelive, globalfilter, socket, globalfilterstate, globalfilterupdate }) {
  //data handling state
  const state_len = sessionStorage.getItem('state_count');
  const [devicedata, setdevicedata] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption2, setSelectedOption2] = useState(Array(state_len).fill("ALL"));
  const selectedOption2Ref = useRef(Array(state_len).fill("ALL"));
  const [isOpen2, setIsOpen2] = useState([]);
  const grapTotlaRes = useRef({});
  const fromdateref = useRef({});
  const globalfilterref = useRef({})
  const todateref = useRef({});
  const handleliveref = useRef({});
  fromdateref.current = fromdate;
  todateref.current = todate;
  handleliveref.current = handlelive;
  globalfilterref.current = globalfilter
  const graphsPerFrame = 4;
  const totalPages = Math.ceil(parseInt(state_len) / graphsPerFrame);
  const initialData = Array(parseInt(state_len) + 1).fill({
    labels: [],
    datasets: [
      {
        label: "Temperature - Assert 1",
        data: [],
      },
    ],
  });
  const [userData1, setUserData1] = useState(initialData);


  useEffect(() => {
    const handleDataUpdate = async (message) => {
      grapTotlaRes.current = message;
      fetchData(fromdateref.current, todateref.current, handleliveref.current, globalfilterref.current, message, 0);
    };
    const inserted_message_fun = async (inserted_message) => {
      if (fromdate === "" || todate === "" || handlelive === true) {
        fetchData(fromdateref.current, todateref.current, handleliveref.current, globalfilterref.current, 0, inserted_message)
      }
    }

    //receive message using socket 
    socket.on('message', (handleDataUpdate));
    socket.on('inserted_message', (inserted_message_fun))



    return () => {
      socket.off('message', handleDataUpdate);
      socket.off('inserted_message', inserted_message_fun);
    };
  }, [fromdateref.current, todateref.current, handleliveref.current, globalfilterref.current, socket]);

  const today = new Date();
  const year = today.getFullYear();
  const Month = String(today.getMonth() + 1).padStart(2, '0');
  const dates = String(today.getDate()).padStart(2, '0');
  const formatteddate = `${year}-${Month}-${dates}`;
  const [ind_dropdown_data, setInd_dropdown_data] = useState([]);


  const fetchData = async (fromdate, todate, handlelive, globalfilter, message, inserted_message) => {
    try {
      const response1 = await fetch('https://tempoiotapi.quantanics.in/user1');
      const data1 = await response1.json();
      const length = data1.length;
      
        const filteredData = {}
        const filteredData1 = {}
        setdevicedata(data1)
        const parameter_response = await fetch('https://tempoiotapi.quantanics.in/get_parameters');
        const parameter_data = await parameter_response.json();

        const ind_param_array = [];
        for (let i = 0; i < parameter_data.length; i++) {
          const element = parameter_data[i]['device_parameters'];
          ind_param_array.push(element);
        }

        setInd_dropdown_data(ind_param_array);

        if (fromdate !== "" && todate !== "" && handlelive === false) {
          if (inserted_message != 0) {
            Object.keys(inserted_message).forEach(key => {
              filteredData1[key] = inserted_message[key].filter(value => {
                const itemDate = value.dt;
                return itemDate >= fromdate && itemDate <= todate;
              });
            });
          } else {
            Object.keys(message).forEach(key => {
              filteredData[key] = message[key].filter(value => {
                const itemDate = new Date(value.dt);
                const fromdate1 = new Date(fromdate); 
                const todate1 = new Date(todate);
                return itemDate >= fromdate1 && itemDate <= todate1;
              });
            });
            grapTotlaRes.current = filteredData;
          }

        } else if (handlelive === true && fromdate !== "") {
          if (inserted_message != 0) {
            Object.keys(inserted_message).forEach(key => {
              filteredData1[key] = inserted_message[key].filter(value => {
                const itemDate = value.dt;
                return fromdate <= itemDate;
              });
            });
          } else {
            Object.keys(message).forEach(key => {
              filteredData[key] = message[key].filter(value => {
                const itemDate = value.dt;
                return fromdate <= itemDate;
              });
            });
            grapTotlaRes.current = filteredData;
          }
        }
        else {
          if (inserted_message != 0) {
            Object.keys(inserted_message).forEach(key => {
              filteredData1[key] = inserted_message[key].filter(value => {
                const itemDate = value.dt.split("T")[0];
                return itemDate === formatteddate;
              });
            });
          } else {
            Object.keys(message).forEach(key => {
              filteredData[key] = message[key].filter(value => {
                const itemDate = value.dt.split("T")[0];
                return itemDate === formatteddate;
              });
            });
            grapTotlaRes.current = filteredData;
          }
        }

        //update data to graph
        for (var i = 0; i < length; i++) {
          if (globalfilter !== 'Output Model' && globalfilter !== null && globalfilterstate[i] === true) {
            const mac_to_conform = data1[i].device_mac_address.replace(/[:\-]/g, "_")
            if (inserted_message) {
              let finalValue = grapTotlaRes.current;
              const obj_key = Object.keys(filteredData1)[0];
              if (obj_key == mac_to_conform) {
                for (const key in finalValue) {
                  if (obj_key === key) {
                    finalValue[key] = filteredData1[obj_key]
                    grapTotlaRes.current = finalValue;
                  }
                }
                getChartData1(globalfilter, finalValue[obj_key], i);
              }
            } else {
              getChartData1(globalfilter, filteredData[mac_to_conform], i);
            }
          }
          else {
            const mac_to_conform = data1[i].device_mac_address.replace(/[:\-]/g, "_")
            if (inserted_message) {
              let finalValue = grapTotlaRes.current;
              const obj_key = Object.keys(filteredData1)[0];
              if (obj_key == mac_to_conform) {
                for (const key in finalValue) {
                  if (obj_key === key) {
                    finalValue[key] = filteredData1[obj_key]
                    grapTotlaRes.current = finalValue;
                  }
                }
                // const latestSixData = finalValue[obj_key].slice(-6);
                getChartData1(selectedOption2Ref.current[i], finalValue[obj_key], i);
              }
            } else {
              // const latestSixData = filteredData[mac_to_conform].slice(-6);
              getChartData1(selectedOption2Ref.current[i], filteredData[mac_to_conform], i);
            }
          }
        }
      
    } catch (error) {
      console.error(error);
    }
  };


  //set the graph state to draw graph using setuserdata
  const getChartData1 = (selectedOption2, latestData, index) => {
    setUserData1(prevState => {
      const updatedData = [...prevState];
      if (selectedOption2 != "ALL") {
        updatedData[index] = {
          ...updatedData[index],
          labels: latestData.map(data => data.dt.split("T")[1]),
          datasets: [
            {
              label: "Line",
              data: latestData.map(() => 25),
              borderColor: "red",
              borderWidth: 1,
              pointRadius: 0,
              tension: 0,
              fill: true,
              backgroundColor: "rgb(245, 211, 211,0.5)",
            },
            {
              label: selectedOption2,
              data: latestData.flatMap(data => data[selectedOption2][0].value),
              borderColor: colorsData.map(data1 => data1[selectedOption2]),
              borderWidth: 1,
            }
          ],
        };
      }
      else {
        const mappedIndDropdownData = ind_dropdown_data.map((data, item) => {
          if (item === index) {
            return data.split(/&|&&/).filter(item => item !== '').map((splited_data, innerIndex) => {
              if (innerIndex % 2 === 0) {
                return splited_data;
              }
            }).filter(Boolean);;
          } else {
            return null;
          }
        });
        const dynamicDatasets = [
          {
            label: "Line",
            data: latestData.map(() => 25),
            borderColor: "red",
            borderWidth: 1,
            pointRadius: 0,
            fill: true,
            backgroundColor: "rgb(245, 211, 211,0.5)",
            tension: 0,
          },
        ];
        mappedIndDropdownData.forEach((element) => {
          if (element) {
            element.forEach((dataas) => {
              dynamicDatasets.push({
                label: dataas,
                data: latestData.flatMap(data => data[dataas][0].value),
                borderColor: colorsData.flatMap(data1 => data1[dataas]),
                borderWidth: 1,
              });
            })
          }
        })
        updatedData[index] = {
          ...updatedData[index],
          labels: latestData.map(data => data.dt.split("T")[1]),
          datasets: dynamicDatasets,
        };
      }
      return updatedData;
    });
  };


  //options for graph to make responsive
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },

    },

    scales: {
      x: {
        beginAtZero: true,
        display: true
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10
        }
      },

    },

  };


  const dropdown2 = (index) => {
    const updatedIsOpen2 = [...isOpen2];
    updatedIsOpen2[index] = !updatedIsOpen2[index];
    setIsOpen2(updatedIsOpen2);
  };

  //function to handle individual option fot each graph 
  const handleDropdown2 = (option, index, mac) => {
    setSelectedOption2(prevSelectedOption2 => {
      const updatedSelectedOption2 = [...prevSelectedOption2];
      updatedSelectedOption2[index] = option;
      selectedOption2Ref.current = updatedSelectedOption2;
      return updatedSelectedOption2;
    });
    const addd = mac.replace(/[:\-]/g, "_")
    const newState = [...globalfilterstate];
    newState[index] = false;
    globalfilterupdate(newState);
    getChartData1(option, grapTotlaRes.current[addd], index);
  };


  const handlePreviousSlide = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextSlide = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const slideStartIndex = currentPage * graphsPerFrame;
  let slideEndIndex = slideStartIndex + graphsPerFrame;
  if (currentPage === totalPages - 1) {
    slideEndIndex = state_len;
  }
  const displayedItems = [...Array(slideEndIndex - slideStartIndex)].map(
    (_, index) => index + slideStartIndex
  );


  return (
    <div style={{ width: "100%" }}>
      <div className="grid-container">
        {displayedItems.map((item) => (
          <div key={item} className="grid-item" >
            <div className="graph-header display-flex" style={{ justifyContent: "center", alignItems: "center" }}>
              <label><b>{devicedata[item]?.device_name || 'temperature assert'}</b></label>

              <div className="dropdown_container2" >
                <button className=" btn-loc4" style={{ border: "1px solid black" }} onClick={() => dropdown2(item)} >
                  {selectedOption2Ref.current[item] || 'ALL'}
                </button>
                {isOpen2[item] && (
                  <div className="dropdown_menu3 dashboard_dropdown-menu dropdown-colors">
                    {
                      ind_dropdown_data.map((data, index) => (
                        <div className='device_scroll' key={index}>
                          {item == index && (
                            <div>
                              {data.split(/&|&&/).filter(item => item !== '').map((splited_data, innerIndex) => (
                                (innerIndex % 2 == 0) && (
                                  <div className='device_dropdown' key={innerIndex} onClick={() => handleDropdown2(splited_data, item, devicedata[item].device_mac_address)}>
                                    <div key={innerIndex} className="div_sts" >{splited_data}</div>
                                  </div>
                                )
                              ))}
                              <div className='device_dropdown' onClick={() => handleDropdown2('ALL', item, devicedata[item].device_mac_address)}>
                                <div className="div_sts" >ALL</div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    }
                  </div>

                )}
              </div>
            </div>
            <div className="graph-size"><Line data={userData1[item]} options={options} /></div>
          </div>
        ))}
      </div>
      <div className='dashboard_bottom display-flex'>
        <div className='export cursor-pointer'>
          <div className='exports' data-bs-toggle="modal" data-bs-target="#export_data">Export</div>
        </div>
        <div className='arrow display-flex'>
          <div className='arrows display-flex justify-align' onClick={currentPage !== 0 ? handlePreviousSlide : null} >
            <div className='leftcircle'>
              <FontAwesomeIcon icon={faCircle} className="circle-img1" />
            </div>
            <div className={`leftarrow ${currentPage !== 0 ? 'arrow_active' : 'arrow_inactive'}`}>
              <FontAwesomeIcon icon={faLeftLong} />
            </div>
          </div>
          <div className='arrows1 display-flex justify-align' onClick={currentPage !== totalPages - 1 ? handleNextSlide : null} >
            <div className='rightcircle'>
              <FontAwesomeIcon icon={faCircle} className="circle-img2" />
            </div>
            <div className={`rightarrow ${currentPage !== totalPages - 1 ? 'arrow_active' : 'arrow_inactive'}`}>
              <FontAwesomeIcon icon={faRightLong} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Linechart;