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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!cvId) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(import.meta.env.VITE_WS_URL),
      onConnect: () => {
        console.log(`[WebSocket] Connected. Subscribing to /topic/analysis/${cvId}`);
        client.subscribe(`/topic/analysis/${cvId}`, (frame) => {
          try {
            const update: ProgressUpdate = JSON.parse(frame.body);
            console.log("[WebSocket] Update received:", update);
            onMessage(update);
            
            // Tamamlanma kontrolü: status="done" VEYA percentage=100
            if (update.status === "done" || update.percentage === 100) {
              console.log("[WebSocket] Analysis complete");
              onComplete();
              client.deactivate();
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }
          } catch (error) {
            console.error("[WebSocket] Parse error:", error);
          }
        });

        // Timeout: 5 dakika sonra otomatik complete et
        timeoutRef.current = setTimeout(() => {
          console.warn("[WebSocket] Timeout - calling onComplete");
          onComplete();
          client.deactivate();
        }, 5 * 60 * 1000);
      },
      onWebSocketError: (error) => {
        console.error("[WebSocket] Error:", error);
      },
      onStompError: (frame) => {
        console.error("[STOMP] Error:", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      client.deactivate();
    };
  }, [cvId, onMessage, onComplete]);
};