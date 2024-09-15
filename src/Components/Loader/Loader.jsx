import React from "react"
import ContentLoader from "react-content-loader"

const Loader = (props) => (
  <ContentLoader 
    speed={2}
    width={300}
    height={426}
    viewBox="0 0 300 426"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="150" cy="130" r="130" /> 
    <rect x="50" y="275" rx="0" ry="0" width="200" height="20" /> 
    <rect x="0" y="305" rx="10" ry="10" width="300" height="84" /> 
    <rect x="0" y="400" rx="10" ry="10" width="110" height="20" /> 
    <rect x="170" y="399" rx="10" ry="10" width="130" height="20" />
  </ContentLoader>
)

export default Loader
