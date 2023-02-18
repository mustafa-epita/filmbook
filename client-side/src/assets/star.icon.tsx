import * as React from "react"
import { SVGProps } from "react"

const StarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 14 14"
    {...props}
  >
    <path
      d="M7.105.506a.117.117 0 0 0-.21 0L4.863 4.654a.117.117 0 0 1-.088.065L.233 5.38a.117.117 0 0 0-.065.199l3.289 3.233c.027.026.04.065.033.103l-.778 4.56a.117.117 0 0 0 .17.123l4.063-2.151a.116.116 0 0 1 .11 0l4.063 2.15a.117.117 0 0 0 .17-.122l-.778-4.56a.117.117 0 0 1 .034-.103l3.288-3.229a.117.117 0 0 0-.065-.198l-4.542-.666a.117.117 0 0 1-.088-.065L7.105.506Z"
      fill="#FFC400"
    />
  </svg>
)

export default StarIcon