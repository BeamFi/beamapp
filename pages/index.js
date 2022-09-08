import React, { useState } from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import BeamSkeleton from "../ui/components/beam/screen/BeamSkeleton"
import { BeamGetPaid } from "../ui/components/beam/screen/BeamGetPaid"
import { BeamHome } from "../ui/components/beam/screen/BeamHome"
import { BeamOut } from "../ui/components/beam/screen/BeamOut"
import { BeamConnetWallet } from "../ui/components/beam/screen/BeamConnectWallet"
import { MyBeamsLayout } from "../ui/components/beam/screen/MyBeamsLayout"
import { userProtectWithPublic } from "../ui/components/auth/plugProtect"
import { MyBeamsActivity } from "../ui/components/beam/screen/MyBeamsActivity"
import { BeamDetail } from "../ui/components/beam/screen/BeamDetail"

export const BeamApp = props => {
  const [bgColor, setBgColor] = useState("beam_blue")
  const [hashtags, setHashtags] = useState([])

  const routeUpdateProps = { setBgColor, setHashtags }
  const routeProps = { bgColor, hashtags }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BeamSkeleton {...routeProps} {...props} />}>
          <Route path="/" element={<BeamHome {...routeUpdateProps} />} />
          <Route
            path="/index.html"
            element={<BeamHome {...routeUpdateProps} />}
          />
          <Route path="/beamout" element={<BeamOut {...routeUpdateProps} />}>
            <Route path=":beamOutId" element={<BeamOut />} />
          </Route>
          <Route
            path="/getpaid"
            element={<BeamGetPaid {...routeUpdateProps} />}
          />
          <Route
            path="/connect"
            element={<BeamConnetWallet {...routeUpdateProps} />}
          />
          <Route
            path="/mybeams"
            element={<MyBeamsLayout {...routeUpdateProps} />}
          >
            <Route index element={<MyBeamsActivity {...routeUpdateProps} />} />
            <Route
              path=":beamOutId"
              element={<BeamDetail {...routeUpdateProps} />}
            />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>Nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default userProtectWithPublic(BeamApp)
