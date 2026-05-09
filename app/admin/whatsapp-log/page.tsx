"use client";

import { Fragment, useEffect, useMemo, useState } from "react";

type CartItem = {
  id?: string;
  name?: string;
  category?: string;
  tenure?: string;
  careTier?: string;
  price?: number;
};

type Entry = {
  ts: string;
  source: string;
  pathname: string;
  pageUrl: string;
  message: string;
  productName?: string;
  cart?: CartItem[];
  value?: number;
  hasEmail?: boolean;
  hasLocation?: boolean;
  email?: string;
  name?: string;
  phone?: string;
  location?: string;
  userAgent?: string;
  referer?: string;
  gclid?: string;
};

function fmtTs(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-MY", {
      timeZone: "Asia/Kuala_Lumpur",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function downloadCsv(entries: Entry[]): void {
  const headers = [
    "Timestamp (MYT)",
    "Source",
    "Page URL",
    "Product / Heading",
    "Name",
    "Phone",
    "Email",
    "Location",
    "Cart value (RM)",
    "Cart items",
    "GCLID",
    "Prefilled message",
  ];
  const rows = entries.map((e) => [
    fmtTs(e.ts),
    e.source,
    e.pageUrl,
    e.productName ?? "",
    e.name ?? "",
    e.phone ?? "",
    e.email ?? "",
    e.location ?? "",
    typeof e.value === "number" ? String(e.value) : "",
    (e.cart ?? [])
      .map(
        (c) =>
          `${c.name ?? c.id ?? "?"} (${c.tenure ?? "?"}${
            c.careTier ? "/" + c.careTier : ""
          }${c.price ? `, RM${c.price}` : ""})`,
      )
      .join("; "),
    e.gclid ?? "",
    (e.message ?? "").replace(/\n/g, " | "),
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((v) => csvEscape(String(v))).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `whatsapp-log-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function WhatsAppLogPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "form" | "anchor">("all");
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/whatsapp-log?limit=500")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setEntries(Array.isArray(data.entries) ? data.entries : []);
        setLoading(false);
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Failed to load");
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      if (filter !== "all" && e.source !== filter) return false;
      if (!q) return true;
      const hay = [
        e.message,
        e.pathname,
        e.pageUrl,
        e.productName,
        e.name,
        e.phone,
        e.email,
        e.location,
        e.gclid,
        ...(e.cart ?? []).map((c) => `${c.name} ${c.id}`),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [entries, filter, query]);

  const counts = useMemo(() => {
    const total = entries.length;
    const forms = entries.filter((e) => e.source === "form").length;
    const anchors = entries.filter((e) => e.source === "anchor").length;
    return { total, forms, anchors };
  }, [entries]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">WhatsApp Click Log</h1>
          <p className="mt-1 text-sm text-gray-500">
            Every WhatsApp click and enquiry-form submission. Newest first. Server timestamps are stored in UTC and shown in MYT.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => downloadCsv(filtered)}
            className="rounded-md bg-lg-red px-3 py-1.5 text-sm font-medium text-white hover:bg-lg-red/90"
          >
            Export CSV ({filtered.length})
          </button>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Total" value={counts.total} />
        <Stat label="Form submits (full lead)" value={counts.forms} />
        <Stat label="Anchor / FAB clicks" value={counts.anchors} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-md border border-gray-200 bg-white p-1 text-sm">
          {(["all", "form", "anchor"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded px-3 py-1 ${
                filter === f
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, phone, message, page, gclid…"
          className="flex-1 min-w-[240px] rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:border-lg-red focus:outline-none focus:ring-1 focus:ring-lg-red"
        />
      </div>

      {loading && <p className="text-sm text-gray-500">Loading…</p>}
      {error && (
        <p className="text-sm text-red-600">Error: {error}</p>
      )}
      {!loading && !error && filtered.length === 0 && (
        <p className="rounded-md border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
          No clicks recorded yet. Once visitors click a WhatsApp link or submit the enquiry form, entries will appear here.
        </p>
      )}

      {!loading && filtered.length > 0 && (
        <div className="overflow-x-auto rounded-md border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-3 py-2">When (MYT)</th>
                <th className="px-3 py-2">Source</th>
                <th className="px-3 py-2">Page</th>
                <th className="px-3 py-2">Lead</th>
                <th className="px-3 py-2 text-right">Value</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((e, i) => {
                const open = openIndex === i;
                return (
                  <Fragment key={`${e.ts}-${i}`}>
                    <tr className="align-top">
                      <td className="whitespace-nowrap px-3 py-2 text-gray-600">{fmtTs(e.ts)}</td>
                      <td className="px-3 py-2">
                        <span
                          className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${
                            e.source === "form"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {e.source}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="font-medium text-gray-900">{e.productName ?? e.pathname}</div>
                        <div className="truncate text-xs text-gray-500" title={e.pageUrl}>
                          {e.pathname}
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        {e.name || e.phone || e.email ? (
                          <div className="space-y-0.5">
                            {e.name && <div className="font-medium text-gray-900">{e.name}</div>}
                            {e.phone && <div className="text-xs text-gray-600">{e.phone}</div>}
                            {e.email && <div className="text-xs text-gray-600">{e.email}</div>}
                            {e.location && <div className="text-xs text-gray-500">{e.location}</div>}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-right text-gray-700">
                        {typeof e.value === "number" && e.value > 0 ? `RM${e.value}` : "—"}
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button
                          onClick={() => setOpenIndex(open ? null : i)}
                          className="text-xs text-lg-red hover:underline"
                        >
                          {open ? "Hide" : "Details"}
                        </button>
                      </td>
                    </tr>
                    {open && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="px-3 py-3">
                          <div className="space-y-3 text-xs text-gray-700">
                            <div>
                              <div className="font-semibold text-gray-900">Prefilled message</div>
                              <pre className="mt-1 whitespace-pre-wrap rounded border border-gray-200 bg-white p-2 text-[12px] text-gray-700">
{e.message || "(empty)"}
                              </pre>
                            </div>
                            {e.cart && e.cart.length > 0 && (
                              <div>
                                <div className="font-semibold text-gray-900">Cart</div>
                                <ul className="mt-1 list-disc pl-5">
                                  {e.cart.map((c, ci) => (
                                    <li key={ci}>
                                      {c.name ?? c.id ?? "?"} — {c.tenure ?? "?"}
                                      {c.careTier ? ` · ${c.careTier}` : ""}
                                      {typeof c.price === "number" ? ` · RM${c.price}` : ""}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            <div className="grid gap-2 sm:grid-cols-2">
                              <KV k="Page URL" v={e.pageUrl} />
                              <KV k="GCLID" v={e.gclid ?? "—"} />
                              <KV k="Referer" v={e.referer ?? "—"} />
                              <KV k="User-Agent" v={e.userAgent ?? "—"} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-3">
      <div className="text-xs uppercase tracking-wider text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-gray-500">{k}</div>
      <div className="break-all text-[12px] text-gray-700">{v}</div>
    </div>
  );
}
