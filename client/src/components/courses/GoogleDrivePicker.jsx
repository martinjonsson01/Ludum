import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
//import styled from "styled-components";

import { AppContext } from "../common/AppContext";

/*
 * Component.
 */
function GoogleDrivePicker({ onFilesPicked, uploadViewDefault, onClose }) {

  const apiKey = "AIzaSyDDWeFz8mgDdZz4U8lmcLDY6Q0uWIVvW2U";

  const { accessToken } = useContext(AppContext);

  const [picker, setPicker] = useState(null);

  // Create and render a Picker object for picking user Photos.
  function createPicker() {
    const pickerApi = window.google.picker;
    var pickerBuilder = new pickerApi.PickerBuilder()
      .setLocale("sv-SV")
      .setOAuthToken(accessToken)
      .setDeveloperKey(apiKey)
      .setCallback(pickerCallback)
      .enableFeature(pickerApi.Feature.MULTISELECT_ENABLED);
    if (uploadViewDefault) {
      pickerBuilder.addView(new pickerApi.DocsUploadView());
      pickerBuilder.addView(pickerApi.ViewId.DOCS);
      pickerBuilder.addView(pickerApi.ViewId.RECENTLY_PICKED);
    } else {
      pickerBuilder.addView(pickerApi.ViewId.DOCS);
      pickerBuilder.addView(new pickerApi.DocsUploadView());
      pickerBuilder.addView(pickerApi.ViewId.RECENTLY_PICKED);
    }
    var pickerModal = pickerBuilder.build();

    pickerModal.setVisible(true);
    // Update state.
    setPicker(pickerModal);
  }

  // Handles picker response.
  function pickerCallback(data) {
    const pickerApi = window.google.picker;
    // If canceled.
    if (data[pickerApi.Response.ACTION] === pickerApi.Action.CANCEL) {
      // Execute close callback.
      onClose();
    }
    // Else if files were picked.
    else if (data[pickerApi.Response.ACTION] === pickerApi.Action.PICKED) {
      var files = [];
      // Go through all documents returned.
      for (var i = 0; i < data[pickerApi.Response.DOCUMENTS].length; i++) {
        const doc = data[pickerApi.Response.DOCUMENTS][i];
        files.push(doc.url);
      }
      // Dispose of picker if not null.
      if (picker) picker.dispose();
      // Execute close callback.
      onClose();
      // Execute callback.
      onFilesPicked(files);
    }
  }

  /**
   * Disposes of picker when component is destroyed.
   */
  useEffect(() => {
    // Cleanup.
    return () => {
      // Dispose of picker if not disposed.
      if (picker) {
        picker.dispose();
        setPicker(null);
      }
    };
  }, [picker]);

  // If a picker is already registered, don't render a new one.
  if (picker) return <React.Fragment />;

  if (window.gapi.picker) {
    createPicker();
  } else {
    // Load Picker API.
    window.gapi.load("picker", createPicker);
  }

  return <React.Fragment />;
}

/*
 * Props.
 */
GoogleDrivePicker.propTypes = {
  onFilesPicked: PropTypes.func,
  uploadViewDefault: PropTypes.any,
  onClose: PropTypes.func,
};

/*
 * Styling.
 */
/*const Container = styled.div`

`;*/

export default GoogleDrivePicker;
