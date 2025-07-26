import { Outlet } from "react-router";

import EventsNavigation from "../components/EventsNavigation";

export default function EventsRootLayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}
