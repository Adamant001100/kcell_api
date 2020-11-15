import React, { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";
import "antd/dist/antd.css";
import { Table } from "antd";
import ReactPlayer from "react-player";
//import { Transcripteditor } from "@bbc/react-transcript-editor";



const columns = [
  {
    title: "Клиент",
    dataIndex: "client",
  },

  {
    title: "Ожидание",
    dataIndex: "wait",
  },

  {
    title: "Длительность",
    dataIndex: "duration",
    date: "",
  },

  {
    title: "Запись",
    dataIndex: "record",
    
  },

  {
    title: "Транскрибация",
    dataIndex: "audio2text",
    render: audio2text => <a href='https://sonix.ai/r/jWAPMfm8Nkyw628NLu3Cp3Ze/share'>Субтитры{audio2text}</a>
  },
];

const url =
  "https://digitalagent.vpbx.kcell.kz/sys/crm_api.wcgp?cmd=history&period=last_month&token=d32014d6-1d7d-4c80-bd10-f9108aa8f22c";

function App() {
  const [data, setData] = useState("");

  //=====================TRANSCRIBE

   


  useEffect(() => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        const arr = await Papa.parse(res.data, config);
        setData(converter(arr.data));
    

    
      });
  }, []);

  return (
    <div className="App">
      {/*<button onClick={handleClick}>Click</button>*/}

      {data && renderUsers(setDataSource(data))}

      

    </div>
  );
}

export default App;

const renderUsers = (arr) =>
  arr && (
    <Table
      columns={columns}
      bordered
      style={{
        paddingRight: 40,
        paddingLeft: 40,
        textAlign: "center",
        height: 0,
      }}
      dataSource={arr}

    />
  );

////////////////////////////////////////////////////////////////////
const setDataSource = (arr) => {
  return arr.map((i, index) => {
    let ob = {};
    Object.keys(i).forEach((key) => {
      if (key === "record") {
        ob = {
          ...ob,
          [key]: (
            <ReactPlayer
              url={i[key]}
              width="300px"
              height="30px"
              playing={false}
              controls={true}
            />
          ),
        };

        //===============================================//

        //===============================================//
      } else {
        ob = { ...ob, [key]: i[key] };
      }
    });

    return { ...ob, key: index };
  });
};

//Audio-to-text==============================================


const converter = (arr) => {
  let data = arr.filter((i) => i.length > 0);

  return data.map((i) => ({
    uid: i[0],
    type: i[1],
    client: i[2],
    account: i[3],
    via: i[4],
    start: i[5],
    wait: i[6],
    duration: i[7],
    record: i[8],
    all: i[9],
    audio2text: i[10]
  }));
};

const config = {
  delimiter: "", // auto-detect
  newline: "", // auto-detect
  quoteChar: '"',
  escapeChar: '"',
  header: false,
  transformHeader: undefined,
  dynamicTyping: false,
  preview: 0,
  encoding: "",
  worker: false,
  comments: false,
  step: undefined,
  complete: undefined,
  error: undefined,
  download: false,
  downloadRequestHeaders: undefined,
  downloadRequestBody: undefined,
  skipEmptyLines: false,
  chunk: undefined,
  chunkSize: undefined,
  fastMode: undefined,
  beforeFirstChunk: undefined,
  withCredentials: undefined,
  transform: undefined,
  delimitersToGuess: [",", "\t", "|", ";", Papa.RECORD_SEP, Papa.UNIT_SEP],
};
