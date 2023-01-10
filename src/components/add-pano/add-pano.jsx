import React from 'react';

// Import reverse geocoding librairy
import { lookUpRaw } from 'geojson-places';

// import PropTypes from "prop-types";

// import { connect } from "react-redux";

import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';

import axios from 'axios';

const collection = [];
const panoDetails = {};

export class AddPano extends React.Component {
  constructor() {
    super();
    this.processURL = this.processURL.bind(this);
    this.addImage = this.addImage.bind(this);
    this.currentUserId = localStorage.getItem('_id');
    this.accessToken = localStorage.getItem('token');
  }

  // =================================
  // Open the Gmaps url into a new tab
  // =================================
  onClickUrl = (url) => {
    return () => openInNewTab(url);
  };

  // ===============================================================================================
  // Add image into the Step 3 so the user can check it is the one he wants to add to the collection
  // ===============================================================================================
  addImage() {
    console.log(panoDetails.staticImgUrl);
    document.getElementById('imageLocation').innerHTML +=
      "<img src='" +
      panoDetails.staticImgUrl +
      "' width='65%' alt='Static view' />";
  }

  // ====================================================================================================
  // Add the 360 to the 360ies collection once the user clicks on the "Add to the 360 collection" button
  // ====================================================================================================
  add360ToCollection() {
    // console.log('panoDetails: ', panoDetails);
    // collection.push(panoDetails);
    // alert('360 successfully added to the collection!');
    // console.log('Collection: ', collection);

    // Confirmation box
    let confirmActionMessage = confirm(
      'Are you sure you want to add this pano to global panos list?'
    );
    console.log('panoDetails: ', panoDetails);

    console.log('Current userId: ', this.currentUserId);

    if (confirmActionMessage) {
      axios.post(
        // `http://localhost:8080/panos/users/${this.currentUserId}`,
        `https://best360ies.herokuapp.com/panos/users/${this.currentUserId}`,
        {
          panoUrl: panoDetails.panoUrl,
          googlePanoId: panoDetails.googlePanoId,
          latitude: panoDetails.latitude,
          longitude: panoDetails.longitude,
          heading: panoDetails.heading,
          pitch: panoDetails.pitch,
          country: panoDetails.country,
          areaName: panoDetails.areaName,
          staticImgUrl: panoDetails.staticImgUrl,
        },
        {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        }
      );

      console.log('Pano added');

      alert('Pano successfully added to the global collection.');

      // Reload the page to see the updated list of favorite Panos
      // window.location.reload(false);
      // Go to the root route
      window.open('/', '_self');
    } else {
      alert('Pano not added to the list.');
    }
  }

  // =====================================================================================================
  // launchReverseGeoCode to reverse GeoCoding (get lat, long data and revert associated Country and City)
  // =====================================================================================================
  launchReverseGeoCode(long, lat) {
    long = parseFloat(long);
    lat = parseFloat(lat);

    console.log('long lat after after parse: ', long, lat);

    // long = 62.19;
    // lat = -7.12;

    const result = lookUpRaw(lat, long);

    console.log('Result from lauchReverseGeoCode: ', result);
    console.log('Country: ', result.features[0].properties.admin);
    console.log('Place name: ', result.features[0].properties.name);

    const country = result.features[0].properties.admin;
    const areaName = result.features[0].properties.name;

    panoDetails.country = country;
    panoDetails.areaName = areaName;

    document.getElementById('country').innerText = country;
    document.getElementById('areaName').innerText = areaName;

    console.log(panoDetails);

    return panoDetails;
  }

  // ================================================================
  // Clear the url input area when the user leaves the url input area
  // ================================================================
  handleBlur(event) {
    console.log('The Blur effect is activated!');
    event.target.value = '';
  }

  // =======================================================
  // Step 1 - processURL to extract PanoDetails from panoUrl
  // =======================================================
  // This step shall return an **Object** that includes **panoDetails** that will be used later on in the upcoming functions:
  // . The panoID
  // . The heading
  // . The pitch
  // These data will then be used in the upcoming functions

  processURL(event) {
    console.log('Function is triggered');
    console.log(event.target.value);
    // url input from user
    // const url = decodeURIComponent(event.target.value);

    const url = event.target.value;
    console.log('URL from user input');

    const match = url.match('^https://.*!1s(.*)!2e.*$');
    let id = match && match[1];
    console.log(id);

    let pov = url.match(/,([0-9.]+)y,([0-9.]+)h,([0-9.]+)t/);
    console.log(pov);

    // -----------------------------------------------
    // Step 1.1 - Extract the panoID data from the url
    // -----------------------------------------------

    if (id) {
      if (id[0] == '-') {
        id = 'F:' + id;
      }

      // $panoID.innerText = id;
      const panoID = id;

      document.getElementById('panoID').innerText = id;

      // -----------------------------------------------------------------------------------------------------
      // Step 1.2 - Extract the heading and pitch data from the url and store them into the panoDetails Object
      // -----------------------------------------------------------------------------------------------------

      if (pov) {
        const heading = Number(pov[2]);
        const pitch = Number(pov[3]);

        panoDetails.heading = heading;
        panoDetails.pitch = pitch - 90;

        document.getElementById('heading').innerText = heading;
        document.getElementById('pitch').innerText = pitch - 90;
      }
    } else {
      $panoID.innerText = 'No Pano ID found';
    }

    // ---------------------------------------------
    // Step 1.3 - Extract lat and long data from url
    // ---------------------------------------------

    console.log(url);

    const coordinates = url.match(/@([-0-9]+\.[0-9]+),([-0-9]+\.[0-9]+),/);
    let lat = coordinates[1];
    let long = coordinates[2];

    document.getElementById('latitude').innerText = lat;
    document.getElementById('longitude').innerText = long;

    // --------------------------------------------------------------------------
    // Step 1.4 - Store the further extracted details into the panoDetails Object
    // --------------------------------------------------------------------------

    panoDetails.panoUrl = url;
    panoDetails.googlePanoId = id;
    panoDetails.latitude = lat;
    panoDetails.longitude = long;

    console.log('ID from inside the first function: ', id);
    console.log(
      'panoDetails Object found from the provided url: ',
      panoDetails
    );

    // Create the StaticImgUrl
    // const staticImgUrl = `https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=${panoDetails.panoID}&cb_client=search.gws-prod.gps&yaw=${panoDetails.heading}&pitch=${panoDetails.pitch}&thumbfov=100&w=256&h=256`;

    if (id.includes('AF1')) {
      console.log('It includes AF1');
      // ACTION: EXTRACT the part between Dw and !
      // const urlGoogleUserExtract = url.match(/@([-0-9]+\.[0-9]+),([-0-9]+\.[0-9]+),/);
      // const urlGoogleUserExtract = url.match(/ya[-0-9]+\.[0-9]/);
      // const urlGoogleUserExtract = url.match(/ya(.+?)/);
      // const urlGoogleUserExtractYa = url.match(/ya([-0-9]+\.[0-9]+)/);

      const urlGoogleUserExtract = url.match(/(?<=Dw).*?(?=fo100)/);

      console.log('urlGoogleUserExtract: ', urlGoogleUserExtract);
      console.log('urlGoogleUserExtract[0]: ', urlGoogleUserExtract[0]);

      const urlGoogleUserExtractYa = url.match(/(?<=ya).*?(?=-ro)/);

      console.log('urlGoogleUserExtractYa: ', urlGoogleUserExtractYa);
      console.log('urlGoogleUserExtractYa[0]: ', urlGoogleUserExtractYa[0]);

      // console.log("urlGoogleUserExtractYa: ", urlGoogleUserExtractYa);
      // console.log("urlGoogleUserExtract: ", urlGoogleUserExtract[1]);
      // console.log("urlGoogleUserExtract: ", urlGoogleUserExtract[2]);

      const urlGoogleUserExtractPi = url.match(/(?<=pi).*?(?=-ya)/);
      console.log('urlGoogleUserExtractPi: ', urlGoogleUserExtractPi[0]);
      // if (urlGoogleUserExtractPi[0]) == "" {
      //   urlGoogleUserExtractPi[0] =
      // }

      const urlGoogleUserExtractRo = url.match(/(?<=ro).*?(?=-f)/);
      console.log('urlGoogleUserExtractRo: ', urlGoogleUserExtractRo[0]);

      // Create the StaticImgUrl
      const staticImgUrl = `https://lh5.googleusercontent.com/p/${panoDetails.googlePanoId}=w260-h260-k-no-pi0-ya${urlGoogleUserExtractYa[0]}-ro-0-fo100`;

      console.log('static URL created: ', staticImgUrl);

      panoDetails.staticImgUrl = staticImgUrl;

      // Send the staticImgUrl to the img tag
    } else {
      console.log('Does not include AF1');
      // Create the StaticImgUrl
      const staticImgUrl = `https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=${panoDetails.googlePanoId}&cb_client=search.gws-prod.gps&yaw=${panoDetails.heading}&pitch=${panoDetails.pitch}&thumbfov=100&w=256&h=256`;

      panoDetails.staticImgUrl = staticImgUrl;
    }

    // Set up a if else statement that checks whether it is a Google Street View or some personal view
    // Then adjust the staticImgUrl depending on the origin of the file

    console.log('staticImgUrl: ', panoDetails.staticImgUrl);
    // Allows to fill out the link related to Static image
    document.getElementById('staticImgUrlLink').href = panoDetails.staticImgUrl;
    document.getElementById('staticImgLink').innerText =
      panoDetails.staticImgUrl;

    // Allows to fill out the Static image display
    // document.getElementById("staticImgUrlLink").src = panoDetails.staticImgUrl;
    document.getElementById('imageLocation').innerHTML =
      "<img src='" +
      panoDetails.staticImgUrl +
      "' width='65%' alt='Static view' />";

    console.log('pano URL: ', panoDetails.panoUrl);
    document.getElementById('panoUrlDisplay').href = panoDetails.panoUrl;

    // Send the url of the Static Url to the element with panoUrlDisplayText id
    document.getElementById('panoUrlDisplayText').innerText =
      panoDetails.panoUrl;

    // document.getElementById("staticImgUrl").href = panoDetails.staticImgUrl;
    // document.getElementById("staticImgTagId").src = panoDetails.staticImgUrl;
    // document.getElementById("imgCheckBtn").href = panoDetails.staticImgUrl;

    // $staticImgURL.innerText = staticImgUrl;
    // $staticImgTagId.src = staticImgUrl;

    // document.getElementById("testInnerOne").innerHTML += "Hello";
    // "<img src='" + panoDetails.staticImgUrl + "' width='30%' />";
    // document.getElementById("testInnerOne").innerText += panoDetails.url;

    // document.getElementById("panoUrl").href = panoDetails.url;

    console.log(
      'Fire the lanchReverseGeoCode function with lat and long: ',
      lat,
      long
    );

    // ---------------------------------------------------------------------------------------------------------
    // Step 1.4 - Trigger the function that will get the Country and City information from the lat and long data
    // ---------------------------------------------------------------------------------------------------------

    // this.testForAFunction();

    // Add the static image to the website for the user to check
    // this.addImage();

    console.log(panoDetails.staticImgUrl);

    // document.getElementById("imageLocation").innerHTML =
    //   "<img src='" +
    //   panoDetails.staticImgUrl +
    //   "' width='65%' alt='Static view' />";

    this.launchReverseGeoCode(long, lat);

    return panoDetails;
  }

  render() {
    return (
      <div>
        <Container>
          <Row className="main-view justify-content-md-center"></Row>
        </Container>

        <div id="main">
          <h1>Add a new 360 to the collection</h1>
          <p>
            <i>
              By following the below steps,{' '}
              <b>
                you will be able to add a new 360 to the App global database
              </b>{' '}
              simply by pasting the google streetview url. The new 360 data will
              be extracted directly from the url (PanoID, Latitude, Longitude,
              URL of the static image associated with the 360, etc...)
            </i>
          </p>
          <hr />
          <h2>
            Step 1 : Open Google maps with the below button and search for a 360
            to add, then copy the url
          </h2>
          <br />

          <Container>
            <Row className="justify-content-md-center">
              <Col className="text-center">
                <h3>
                  <b>a) Click below icon</b> to open google maps and search a
                  360 to add
                </h3>
                <a href="https://www.google.com/maps" target="_blank">
                  {/* <img src="/google-maps_icon.png" width={'120px'}></img> */}
                  <img
                    src={require('../../images/google-maps_icon.png')}
                    width={'120px'}
                  ></img>

                  {/* <Button>Open google maps to search a 360 to add</Button> */}
                </a>
                <br />
                <br />
                <h3>
                  <b>b) Toggle the "Browse Street View images" icon</b>
                </h3>
                <img
                  src={require('../../images/browse-sv-images-icon.png')}
                  width={'500px'}
                ></img>

                <br />
                <br />
                <h3>
                  <b>
                    c) Click on the location you want to see in panoramic view
                    (street view)
                  </b>
                </h3>
                <br />
                <h3>
                  <b>d) Copy the url of the view</b>
                </h3>

                <img
                  src={require('../../images/copy-url.png')}
                  width={'500px'}
                ></img>
              </Col>
            </Row>
          </Container>

          <br />

          <hr />
          <h2>
            Step 2 : Paste the url corresponding to the streetview you want to
            add to the collection
          </h2>
          <br />
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Control
                  id="streetview-url"
                  type="text"
                  placeholder="Paste Google StreetView URL here"
                  onChange={this.processURL}
                  onBlur={this.handleBlur}
                />
              </Col>
            </Row>
            <br />
          </Container>

          <hr />
          <h2>
            Step 3 : Check static image of the 360 to be added to the collection
            as well as associated data extracted from the url
          </h2>

          <Container>
            <Row style={{ border: '1px solid lightgray' }}>
              <Col md={4} style={{ border: '1px solid lightgray' }}>
                <span id="imageLocation"></span>
              </Col>

              <Col md={8} style={{ border: '1px solid lightgray' }}>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Information type</th>
                      <th>Extracted Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Pano image URL:</td>
                      <td
                        style={{
                          // width: 100,
                          maxWidth: 300,
                          wordBreak: 'break-all',
                        }}
                      >
                        <a href="" target="_blank" id="panoUrlDisplay">
                          <span id="panoUrlDisplayText"></span>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>PanoID:</td>
                      <td>
                        <span id="panoID"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>Latitude:</td>
                      <td>
                        <span id="latitude"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>Longitude:</td>
                      <td>
                        <span id="longitude"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>Static image URL:</td>
                      <td
                        style={{
                          // width: 100,
                          maxWidth: 300,
                          wordBreak: 'break-all',
                        }}
                      >
                        <a href="" target="_blank" id="staticImgUrlLink">
                          <span id="staticImgLink"></span>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Country:</td>
                      <td>
                        <span id="country"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>Area name:</td>
                      <td>
                        <span id="areaName"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>Heading:</td>
                      <td>
                        <span id="heading"></span>
                      </td>
                    </tr>
                    <tr>
                      <td>Picth:</td>
                      <td>
                        <span id="pitch"></span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>

          <hr />
          <h2>Step 4 : Confirm you want to add this 360 to the collection</h2>
          <br />
          <Container>
            <Row className="justify-content-md-center">
              <Col className="text-center">
                <Button
                  id="btnAddToCollection"
                  // onClick={this.add360ToCollection(panoDetails)}
                  onClick={() => this.add360ToCollection(panoDetails)}
                >
                  Add to the 360 collection
                </Button>

                <br />
                <br />
                <Button
                  variant="warning"
                  // id='btnAddToCollection'
                  // onClick={this.add360ToCollection}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Container>

          <br />
          <br />

          <hr />

          {/* <!-- Latitude and longitude data shall show below: --> */}
          <p id="latitudeLongitude"></p>
        </div>
      </div>
    );
  }
}
