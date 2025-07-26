import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense, useEffect } from "react";
import confetti from "canvas-confetti";

function EventsPage() {
  const { events } = useLoaderData();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      // 🎉 Trigger confetti
      confetti({
        particleCount: 550,
        spread: 100,
        origin: { y: 0.6 },
      });

      // You could also add more bursts if you like:
      setTimeout(() => {
        confetti({
          particleCount: 500,
          spread: 100,
          origin: { y: 0.6 },
        });
      }, 500);
      setTimeout(() => {
        confetti({
          particleCount: 500,
          spread: 100,
          origin: { y: 1.0 },
        });
      }, 500);
      setTimeout(() => {
        confetti({
          particleCount: 500,
          spread: 100,
          origin: { x: 1.6 },
        });
      }, 500);
      setTimeout(() => {
        confetti({
          particleCount: 500,
          spread: 100,
          origin: { x: -1.6 },
        });
      }, 500);
    }
  }, [searchParams]);

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

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

export async function loader() {
  return {
    events: loadEvents(),
  };
}
