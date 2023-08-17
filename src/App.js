import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeData } from "./redux/counter";
// import Pagination from "./Pagination";.

function App() {
  const { tableWholeData } = useSelector((state) => state.tableAllData);
  const [perpage, setperpage] = useState(10);
  const [currentpage, setcurrentpage] = useState(1);
  const [disableButton, setdisableButton] = useState(true);
  const [wholedata, setwholedata] = useState([]);

  const dispatch = useDispatch();

  function getData(pagenumber, perpagelimit) {
    console.log("datafetch");
    fetch(
      `https://api.punkapi.com/v2/beers?page=${pagenumber}&per_page=${perpagelimit}`
    )
      .then((e) => e.json())
      .then((e) => {
        // if (e.length === 0) {
        //   setdisableButton(false);
        // }
        dispatch(storeData(e));
      });
  }
  function getfetch() {
    // console.log("datafetch");
    fetch(`https://api.punkapi.com/v2/beers`)
      .then((e) => e.json())
      .then((e) => {
        setwholedata(e);
      });
  }
  useEffect(() => {
    getData(currentpage, perpage);
    getfetch();
  }, []);

  const handlepagelength = () => {
    const pages = wholedata.length / perpage;
    console.log(wholedata.length);
    console.log(pages);
    return pages;
  };
  handlepagelength();

  const handlePagination = (prevornext) => {
    // debugger
    if (prevornext === "prev") {
      if (currentpage > 1) {
        setcurrentpage(currentpage - 1);
        getData(currentpage - 1, perpage);
      }
    } else if (prevornext === "next") {
      setcurrentpage(currentpage + 1);
      getData(currentpage + 1, perpage);
    } else {
      console.log(prevornext);
      getData(prevornext, perpage);
    }
  };
  function generateNumberSequence(start, end) {
    const sequence = [];

    for (let i = start; i <= end; i++) {
      sequence.push(i);
    }

    return sequence;
  }

  const numberSequence = generateNumberSequence(1, 20);
  return (
    <div className="App">
      <div className="flex">
        <h1>Pagination</h1>
        <div style={{ padding: 30 }}>
          {tableWholeData.length > 0 ? (
            <table className="">
              <thead>
                <tr className="bold">
                  <td className="wi05">
                    <h3>Id</h3>
                  </td>
                  <td className="wi2">
                    <h3>Name</h3>
                  </td>
                  <td className="wi2">
                    <h3>Tagline</h3>
                  </td>
                  <td className="wi1">
                    <h3>First_brewed</h3>
                  </td>
                  <td className="wi1">
                    <h3>Image</h3>
                  </td>
                </tr>
              </thead>
              <tbody>
                {tableWholeData.map((e) => {
                  return (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.name}</td>
                      <td>{e.tagline}</td>
                      <td>{e.first_brewed}</td>
                      <td>
                        <img src={e.image_url} alt={e.name} width="30px"></img>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <span>No Data found</span>
          )}
        </div>
      </div>
      <div style={{paddingBottom:50}}>
        <button
          disabled={currentpage == 1}
          onClick={() => {
            handlePagination("prev");
          }}
        >
          Previous
        </button>

        {numberSequence.map((e) => {
          return (
            <button
              onClick={() => {
                handlePagination(e);
              }}
            >
              {e}
            </button>
          );
        })}
        <button
          onClick={() => {
            handlePagination("next");
            setdisableButton(!disableButton);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
