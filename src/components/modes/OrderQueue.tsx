import { useState, useEffect } from "react";
import type { ThemeName } from "@/types";
import { themes } from "@/constants";
import { ORDER_QUEUE } from "@/data/orders";

interface OrderQueueProps {
  theme: ThemeName;
}

export function OrderQueue({ theme }: OrderQueueProps) {
  const t = themes[theme];
  const [queue, setQueue] = useState(ORDER_QUEUE);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setTick((p) => p + 1), 4000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    setQueue((prev) =>
      prev.map((o, i) => {
        if (i === tick % prev.length && o.status === "preparing") return { ...o, status: "ready" };
        if (i === (tick + 2) % prev.length && o.status === "new") return { ...o, status: "preparing" };
        return o;
      }),
    );
  }, [tick]);

  const ready = queue.filter((o) => o.status === "ready");
  const preparing = queue.filter((o) => o.status === "preparing");
  const waiting = queue.filter((o) => o.status === "new");

  return (
    <div style={{ padding: "32px 48px", height: "calc(100% - 100px)", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 36, animation: "fadeInUp 0.5s ease both" }}>
        <h2
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: t.success,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: t.success,
              animation: "pulse 1.5s infinite",
            }}
          />
          KLAAR VOOR OPHALEN
        </h2>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {ready.map((o) => (
            <div
              key={o.number}
              style={{
                background: `${t.success}18`,
                border: `2px solid ${t.success}44`,
                borderRadius: 20,
                padding: "20px 32px",
                textAlign: "center",
                animation: "readyPulse 2s ease infinite",
                minWidth: 140,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 52,
                  fontWeight: 700,
                  color: t.success,
                  lineHeight: 1,
                  animation: "numberBounce 2s ease infinite",
                }}
              >
                #{o.number}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 16,
                  color: t.text,
                  marginTop: 6,
                  fontWeight: 500,
                }}
              >
                {o.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 36, animation: "fadeInUp 0.5s ease 0.1s both" }}>
        <h2
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: t.popular,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: t.popular,
              animation: "pulse 1s infinite",
            }}
          />
          IN BEREIDING
        </h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {preparing.map((o) => (
            <div
              key={o.number}
              style={{
                background: t.bgCard,
                border: `1px solid ${t.popular}33`,
                borderRadius: 16,
                padding: "14px 24px",
                textAlign: "center",
                minWidth: 110,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 32,
                  fontWeight: 700,
                  color: t.popular,
                }}
              >
                #{o.number}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: t.textMuted,
                  marginTop: 4,
                }}
              >
                {o.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease 0.2s both" }}>
        <h2
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: t.textMuted,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          WACHTRIJ
        </h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {waiting.map((o) => (
            <div
              key={o.number}
              style={{
                background: t.bgCard,
                border: `1px solid ${t.border}`,
                borderRadius: 12,
                padding: "10px 20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 22,
                  fontWeight: 600,
                  color: t.textMuted,
                }}
              >
                #{o.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
