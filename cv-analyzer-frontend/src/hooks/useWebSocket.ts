import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { ProgressUpdate } from "@/types";

interface Options {
  cvId: number | null;
  onMessage: (update: ProgressUpdate) => void;
  onComplete: () => void;
}

export const useWebSocket = ({ cvId, onMessage, onComplete }: Options) => {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!cvId) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(import.meta.env.VITE_WS_URL),
      onConnect: () => {
        client.subscribe(`/topic/analysis/${cvId}`, (frame) => {
          const update: ProgressUpdate = JSON.parse(frame.body);
          onMessage(update);
          if (update.status === "done") {
            onComplete();
            client.deactivate();
          }
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => { client.deactivate(); };
  }, [cvId]);
};