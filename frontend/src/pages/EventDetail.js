import { Await, redirect, useRouteLoaderData } from "react-router";
import EventItem from "../components/EventItem";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadEvent) => <EventItem event={loadEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadEvents) => <EventsList events={loadEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvent(id) {
  const response = await fetch("https://event-management-backend-jr6r.onrender.com/events/" + id);

  if (!response.ok) {
    throw new Response(
      JSON.stringify(
        { message: "Could not fetch details for selected event." },
        { status: 500 }
      )
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}
async function loadEvents() {
  const response = await fetch("https://event-management-backend-jr6r.onrender.com/events");

  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events" };
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    return Response(
      JSON.stringify({ message: "Could not fetch events." }, { status: 500 })
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ params }) {
  const id = params.eventId;
  return {
    event: await loadEvent(id),
    events: loadEvents(),
  };
}

export async function action({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch("https://event-management-backend-jr6r.onrender.com/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not delete event." }), {
      status: 500,
    });
  }
  return redirect("/events");
}
