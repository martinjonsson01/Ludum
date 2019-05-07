import React, { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { Headline6, Body2 } from "@material/react-typography";

import { AppContext } from "../common/AppContext";
import { getNameFromMimeType, parseISO8601Duration } from "../../Util";
import LinkImageDark from "../../media/baseline_link_black_48dp.png";
import LinkImage from "../../media/baseline_link_white_48dp.png";

/**
 * Component.
 */
function LinkPreview({ url, target, hoverColor }) {

  const parsedUrl = new URL(url);

  const { authUser, theme } = useContext(AppContext);

  const [metadata, setMetadata] = useState();

  function fetchMetadata(id) {
    // Check if metadata already exists in session storage before sending request.
    if (window.sessionStorage.getItem(id)) {
      var meta = JSON.parse(window.sessionStorage.getItem(id));
      setMetadata(meta);
    }
    else {
      window.gapi.client.request({
        "path": "https://www.googleapis.com/drive/v3/files/" + id,
        "params": { "fields": "kind,thumbnailLink,mimeType,name,webViewLink,iconLink" },
        "method": "GET"
      }).then(res => {
        window.sessionStorage.setItem(id, JSON.stringify(res.result));
        setMetadata(res.result);
      });
    }
  }

  function fetchYouTubeMetadata(id) {
    // Check if metadata already exists in session storage before sending request.
    if (window.sessionStorage.getItem(id)) {
      var meta = JSON.parse(window.sessionStorage.getItem(id));
      setMetadata(meta);
    } else {
      window.gapi.client.youtube.videos.list({
        "part": "snippet,contentDetails",
        "id": id
      }).then(res => {
        window.sessionStorage.setItem(id, JSON.stringify(res.result.items[0]));
        setMetadata(res.result.items[0]);
      });
    }
  }

  function getTitle() {
    if (metadata) {
      if (metadata.kind === "drive#file") {
        return metadata.name;
      } else if (metadata.kind === "youtube#video") {
        return metadata.snippet.title;
      }
    }
    return url;
  }

  function getSubtitle() {
    if (metadata) {
      if (metadata.kind === "drive#file") {
        return getNameFromMimeType(metadata);
      } else if (metadata.kind === "youtube#video") {
        const durationSeconds = parseISO8601Duration(metadata.contentDetails.duration);
        const durationMinutes = Math.round(durationSeconds / 60);
        return `YouTube-videoklipp (${durationMinutes} min) från ${metadata.snippet.channelTitle}`;
      }
    }
    return "Webbsida";
  }

  function getUrl() {
    if (metadata) {
      if (metadata.kind) {
        if (parsedUrl.search) {
          return url + `&authuser=${authUser}`;
        } else {
          return url + `?authuser=${authUser}`;
        }
      }
    }
    return url;
  }

  function getIconUrl() {
    if (metadata) {
      if (metadata.kind) {
        if (metadata.kind === "drive#file") {
          return metadata.iconLink.replace("16", "128");
        } else if (metadata.kind === "youtube#video") {
          return metadata.snippet.thumbnails.medium.url;
        }
      }
    }
    return theme === "dark" ? LinkImage : LinkImageDark;
  }

  useEffect(() => {
    if (
      parsedUrl.hostname === "drive.google.com" &&
      parsedUrl.pathname === "/open" &&
      parsedUrl.searchParams.has("id")
    ) {
      // Parse the file id out of the drive URL search parameters.
      const id = parsedUrl.searchParams.get("id");
      fetchMetadata(id);
    } else if (
      parsedUrl.hostname === "docs.google.com" &&
      (parsedUrl.pathname.split("/")[1] === "document" ||
        parsedUrl.pathname.split("/")[1] === "spreadsheets") &&
      parsedUrl.pathname.split("/").length >= 3
    ) {
      // Parse the file id out of the docs URL (id comes after /d/).
      const pathPieces = parsedUrl.pathname.split("/");
      const indexId = pathPieces.findIndex(path => path === "d") + 1;
      const id = pathPieces[indexId];
      fetchMetadata(id);
    } else if (
      parsedUrl.hostname === "www.youtube.com" &&
      parsedUrl.pathname === "/watch" &&
      parsedUrl.searchParams.has("v")
    ) {
      // Parse the video id out of the youtube URL search parameters.
      const id = parsedUrl.searchParams.get("v");
      if (window.gapi.client.youtube) {
        fetchYouTubeMetadata(id);
      } else {
        window.gapi.client
          .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
          .then(() => fetchYouTubeMetadata(id));
      }
    } else { // For default links not recognized.
      setMetadata({});
    }
  }, [parsedUrl]);

  return (
    <Container
      href={getUrl()}
      target={target}
    >
      {metadata ?
        <Image src={getIconUrl()} alt={getTitle()} />
        :
        <PlaceholderImage src="" />
      }
      <Content theme={theme} clipborder={metadata && metadata.kind}>
        {metadata ?
          <React.Fragment>
            <Title hovercolor={hoverColor}>{getTitle()}</Title>
            <Subtitle theme={theme}>{getSubtitle()}</Subtitle>
          </React.Fragment>
          :
          <React.Fragment>
            <PlaceholderTitle hovercolor={hoverColor} />
            <PlaceholderSubtitle theme={theme} />
          </React.Fragment>
        }
      </Content>
    </Container>
  );
}

/**
 * Props.
 */
LinkPreview.propTypes = {
  url: PropTypes.string.isRequired,
  target: PropTypes.string,
  hoverColor: PropTypes.string
};

/**
 * Styles.
 */
const pulse = keyframes`
  0% {
    background-color: rgba(165, 165, 165, 0.1);
  }
  50% {
    background-color: rgba(165, 165, 165, 0.3);
  }
  100% {
    background-color: rgba(165, 165, 165, 0.1);
  }
`;
const Container = styled.a`
  display: flex;
  flex-direction: row;
  min-height: calc(4.5rem + 2px);
  width: fit-content;
  margin-top: 1rem;
  color: inherit;
  flex-direction: row;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  white-space: pre-wrap;
`;
const Content = styled.div`
  margin: 0 0 0 -73px;
  padding-left: calc(73px + 1rem);
  padding-right: 1rem;
  border-style: solid;
  border-width: 1px;
  border-radius: 1rem;
  border-color: var(--mdc-theme-border);
  clip-path: ${props => props.clipborder ? "inset(0 0 0 36px)" : "inset(0 0 0 0)"};
`;
const Image = styled.img`
  height: 4.5rem;
  max-width: 4.5rem;
  margin: auto 0;
  border-radius: 1rem;
  border-width: 0;
  object-fit: cover; /* Scale the image to cover element. */
  object-position: center; /* Center the image within the element. */

  ${Container}:hover & {
    filter: brightness(0.8);
  }
`;
const Title = styled(Headline6)`
  height: fit-content;
  margin-top: 0.5rem;
  word-wrap: break-word;
  word-break: break-all;
  overflow-wrap: break-word;

  ${Container}:hover & {
    color: ${props => "#" + props.hovercolor};
  }
`;
const Subtitle = styled(Body2)`
  color: ${props => props.theme === "dark" ? "#adadad" : "rgba(0, 0, 0, 0.55)"};
  margin-bottom: 0.5rem;
`;
const PlaceholderImage = styled.img`
  height: 4.5rem;
  min-width: 4.5rem;
  margin: auto 0;
  border-radius: 1rem;
  border-width: 0;
  animation: ${pulse} 1s infinite ease-in-out;
`;
const PlaceholderTitle = styled(Headline6)`
  height: 1em;
  width: 13em;
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
  animation: ${pulse} 1s infinite ease-in-out;
`;
const PlaceholderSubtitle = styled(Body2)`
  height: 0.8em;
  width: 8em;
  margin-bottom: 0.5rem;
  animation: ${pulse} 1s infinite ease-in-out;
`;

export default LinkPreview;
