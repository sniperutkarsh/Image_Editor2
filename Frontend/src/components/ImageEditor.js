import React, { createRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Filters from "./Filters";
import { useNavigate } from "react-router-dom";
import DEFAULT_OPTIONS from "./DefaultValues";
import './editor.css';
// import { useScreenshot, createFileName } from 'use-react-screenshot'
import html2canvas from "html2canvas";

const FilterSlider = ({ options, updateFilterOptions, index }) => {
  
  return (
    <div>
      <div
        className="p-3 fw-bold radius-curve"
        style={{ background: "#009970" }}
      >
        <label class="form-label text-white" for={options.property}>
          {options.name}
          {"   :   "}
          <span class="form-label-small">{options.value}</span>
        </label>
        <div class="range">
          <input
            onChange={(e) =>
              updateFilterOptions(index, parseInt(e.target.value))
            }
            value={options.value}
            type="range"
            class="form-range"
            min={options.range.min}
            max={options.range.max}
            id={options.property}
            // style={{backgoundColor: options.backgroundColor}}
          />
        </div>
      </div>
      <hr />
    </div>
  );
};

  const ImageEditor = () => {
    const [currentImage, setCurrentImage] = useState(null);
    const ref = createRef(null)
  const navigate = useNavigate();
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [mainImg, setMainImg] = useState(sessionStorage.getItem("mainImg"));
  const [filterName, setFilterName] = useState("");
  const [filterArray, setFilterArray] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [image, takeScreenshot] = useScreenshot()
  
  useEffect(() => {
    let image = sessionStorage.getItem("mainImg");
    if (image) {
      setMainImg(image);
    }
    
    document.body.addEventListener("drop", (e) => e.preventDefault());
  }, []);

  // const download = (image, { name = "img", extension = "jpg" } = {}) => {
  //   const a = document.createElement("a");
  //   a.href = image;
  //   a.download = createFileName(extension, name);
  //   a.click();
  // };
  
  // const getImage = () => takeScreenshot(ref.current).then(download);

  //Creating dynamic link that automatically click
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
  //after creating link you should delete dynamic link
  //clearDynamicLink(link); 
}

//Your modified code.
function printToFile() {
  html2canvas(ref.current).then((canvas) => {
    let im = new Image();
    im.src = canvas.toDataURL("image/png");
    const ctx = canvas.getContext('2d');
    ctx.filter = 'contrast(1.4) sepia(1)';
    ctx.drawImage(im, 0, 0);
    // img.crossOrigin="anonymous"
    var img = canvas.toDataURL("image/png");
    console.log(img);
    //create your own dialog with warning before saving file
    //beforeDownloadReadMessage();
    //Then download file
    downloadURI("data:" + img, "yourImage.png");
  })
  // html2canvas(ref.current, {
  //     onrendered: function (canvas) {
  //         var myImage = canvas.toDataURL("image/png");
  //         console.log(myImage);
  //         //create your own dialog with warning before saving file
  //         //beforeDownloadReadMessage();
  //         //Then download file
  //         downloadURI("data:" + myImage, "yourImage.png");
  //     }
  // });
}

  const updateFilters = (index, val) => {
    let newOptions = [...options];
    newOptions[index]["value"] = val;
    setOptions([...newOptions]);
  };

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const getUserFilter = () => {
    setLoading(true);
    fetch("http://localhost:5000/filter/getbyuser/" + currentUser._id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFilterArray(data);
        setLoading(false);
      });
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    // setSelThumbnail(file.name)
    const fd = new FormData();
    fd.append("myfile", file);
    // console.log(file);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      // convert image file to base64 string
      // preview.src = reader.result;
      setCurrentImage(reader.result)
      console.log(reader.result);
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
    fetch("http://localhost:5000/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        console.log("uploaded");
        res.json().then((data) => {
          console.log(data);
          setMainImg(data.url)
          // setCurrentImage();
          sessionStorage.setItem("mainImg", data.url);
        });
      }
    });
  };

  const saveCustomFilter = () => {
    console.log(options);

    fetch("http://localhost:5000/filter/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: filterName,
        image: mainImg,
        values: options,
        createdBy: currentUser._id,
        createdAt: new Date(),
      }),
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        getUserFilter();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Filter saved successfully",
        });
      }
    });
  };

  function getImageStyle() {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    // filters.push(`url(${mainImg})`);
    // console.log({ filter: filters.join(" ") });

    return { filter: filters.join(" "), backgroundImage: `url(${currentImage})` };
  }

  return (
    <div>
      
      <div
        className="editor-cont margin-below-navbar "
        style={{ background: "#009970" }}
      >
        <p className="page-title m-0 p-3 h3 text-center fw-bold" style={{ color: "#009970", backgroundColor: 'white' }}>
          Image Editor
        </p>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <div className="card saved-filters">
                <div className="card-body" style={{ background: "#a3a4a4" }}>
                  <h5 className="text-center fw-bold">Available Filters</h5>
                  <hr />
                  <Filters
                    loading={loading}
                    getUserFilter={getUserFilter}
                    userid={currentUser._id}
                    setOptions={setOptions}
                    filterArray={filterArray}
                    setFilterArray={setFilterArray}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="card editor"  style={{ background: "#a3a4a4" }}>
              
                <div className="card-body">
                  
                <label
                    className="select"
                    htmlFor="uploader"
                    onDrop={(e) => {
                      e.preventDefault();
                      console.log(e.type);
                    }}
                  >
                    <b>Select File</b>
                  </label>
                  <input
                    className=""
                    
                    hidden
                    id="uploader"
                    type="file"
                    onChange={(e) => uploadImage(e)}
                  />

                  <div ref={ref} className="editor-image" style={getImageStyle()} crossorigin="anonymous" />
                    <button className="btn btn-primary w-100" onClick={printToFile}>Download</button>
                 
                </div>
                
                
              </div>
              
            </div>
            <div className="col-md-3">
              <div className="card editor-toolbox">
                <div className="card-body" style={{ background: "#a3a4a4" }}>
                  <div class="accordion" id="accordion-filter">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="heading-filter">
                        <button
                          class="accordion-button"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapse-filter"
                          aria-expanded="true"
                          aria-controls="collapse-filter"
                        >
                          Color Filters
                        </button>
                      </h2>
                      <div
                        id="collapse-filter"
                        class="accordion-collapse collapse show"
                        aria-labelledby="heading-filter"
                        data-mdb-parent="#accordion-filter"
                      >
                        <div class="filterPanel">
                          {options.map((option, index) => (
                            <FilterSlider
                              options={option}
                              updateFilterOptions={updateFilters}
                              index={index}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="heading-save-filter">
                        <button
                          class="accordion-button"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapse-save-filter"
                          aria-expanded="true"
                          aria-controls="collapse-save-filter"
                        >
                          Save Filters
                        </button>
                      </h2>
                      <div
                        id="collapse-save-filter"
                        class="accordion-collapse collapse show"
                        aria-labelledby="heading-save-filter"
                        data-mdb-parent="#accordion-filter"
                      >
                        <div class="accordion-body">
                          <div className="input-group">
                            <input
                              className="form-control"
                              onChange={(e) => setFilterName(e.target.value)}
                            />

                            <button
                              className="btn btn-success input-group-append"
                              onClick={saveCustomFilter}
                            >
                              <i class="fas fa-save    "></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
