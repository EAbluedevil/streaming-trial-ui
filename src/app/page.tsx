/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type TrialEntry = {
  service: string;
  trialStatus: string;
  trialLastSeen: string;
  notes?: string;
  alertSent: boolean;
};

export default function Home() {
  const [trials, setTrials] = useState<TrialEntry[]>([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchTrials = async () => {
      try {
        const res = await axios.get<TrialEntry[]>(
          "https://streaming-trial-api.onrender.com/api/streaming-trials"
        );
        setTrials(res.data);
      } catch (err) {
        console.error("Error fetching trials:", err);
      }
    };

    fetchTrials();
  }, []);

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-3 text-blue-800">Stop Wasting Money on Streaming</h1>
<p className="text-base text-slate-700 mb-6">
Track free trials. Get alerts before they vanish. Save hundreds a year — effortlessly.
</p>
      <p className="text-lg text-slate-600 mt-2 mb-6">
  Track free streaming trials. Save money. No spam. No credit card needed.
</p>

      {/* Signup Form */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const emailInput = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
          const email = emailInput.value;

          try {
            const res = await fetch("https://streaming-trial-api.onrender.com/api/signup-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });

            if (res.ok) {
              setSuccess(true);
              console.log("✅ Trial signup submitted to backend");
              emailInput.value = "";
              setTimeout(() => setSuccess(false), 4000);
            } else {
              alert("Something went wrong. Try again.");
            }
          } catch {
            alert("Network error. Try again.");
          }
        }}
        className="mb-10 w-full max-w-md"
      >
      <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
  Early Access – Free!
</div>

        <h2 className="text-lg font-semibold mb-2">Get alerted when trials change</h2>
        <div className="flex gap-2">
          <input
            type="email"
            name="email"
            required
            placeholder="you@email.com"
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          By signing up, you agree to our Terms and consent to receive trial alerts.
        </p>

        {/* Success Message */}
        {success && (
          <div className="mt-4 bg-green-50 border border-green-300 text-green-800 p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-1">🎉 You're in!</h3>
            <p className="text-sm mb-1">You&#39;ll get alerts when trial deals change.</p>
            <p className="text-sm">Want to save even more? Refer a friend and get perks &mdash; coming soon.</p>
          </div>
        )}
      </form>

      <hr className="my-10 border-slate-300" />
      <h2 className="text-xl font-semibold mb-4">Current Trials</h2>

      {trials.length === 0 ? (
        <p className="text-gray-500">No trials found or still loading...</p>
      ) : (
        trials.map((trial, i) => (
          <div
            key={i}
            className="bg-slate-100 border border-slate-300 rounded-xl p-5 shadow-md mb-6 transition hover:shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-slate-800 mb-1">{trial.service}</h2>
            <p className="text-base font-medium text-slate-700">
              <span className="text-slate-500">Status:</span>{" "}
              <span
                className={`inline-block px-2 py-1 rounded-md text-sm font-semibold ${
                  trial.trialStatus === "Active"
                    ? "bg-green-100 text-green-800"
                    : trial.trialStatus === "Paused"
                    ? "bg-yellow-100 text-yellow-800"
                    : trial.trialStatus === "Not Available"
                    ? "bg-red-100 text-red-800"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {trial.trialStatus}
              </span>
            </p>
            <p className="text-base text-slate-600">
              <span className="text-slate-500">Last Seen:</span> {trial.trialLastSeen}
            </p>
            {trial.notes && (
              <p className="text-sm mt-3 text-slate-700 italic">Note: {trial.notes}</p>
            )}
          </div>
        ))
      )}

      <footer className="mt-10 text-sm text-gray-400 text-center">
  © {new Date().getFullYear()} Trial Tracker. All rights reserved. <br />
  Built to help you save. Feedback? <a href="mailto:sholane75@gmail.com" className="underline">Email us</a>.
</footer>
    </main>
  );
}
