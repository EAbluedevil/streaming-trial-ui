'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type TrialEntry = {
  service: string;
  trialStatus: string;
  trialLastSeen: string;
  notes?: string;
  alertSent: boolean;
};

export default function Home() {
  const [trials, setTrials] = useState<TrialEntry[]>([]);

  useEffect(() => {
    const fetchTrials = async () => {
      try {
        const res = await axios.get<TrialEntry[]>(
          'https://streaming-trial-api.onrender.com/api/streaming-trials'
        );
        console.log('Fetched trials:', res.data);
        setTrials(res.data);
      } catch (err) {
        console.error('Error fetching trials:', err);
      }
    };

    fetchTrials();
  }, []);

  console.log('Trials state:', trials); // Log outside render

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Streaming Trial Tracker</h1>

      {trials.length === 0 ? (
        <p className="text-gray-500">No trials found or still loading...</p>
      ) : (
        trials.map((trial, i) => {
          console.log('Rendering trial:', trial);
          return (
            <div
  key={i}
  className="bg-slate-100 border border-slate-300 rounded-xl p-5 shadow-md mb-6 transition hover:shadow-lg"
>
  <h2 className="text-2xl font-semibold text-slate-800 mb-1">
    {trial.service}
  </h2>
  <p className="text-base font-medium text-slate-700">
  <span className="text-slate-500">Status:</span>{' '}
  <span
    className={`inline-block px-2 py-1 rounded-md text-sm font-semibold ${
      trial.trialStatus === 'Active'
        ? 'bg-green-100 text-green-800'
        : trial.trialStatus === 'Paused'
        ? 'bg-yellow-100 text-yellow-800'
        : trial.trialStatus === 'Not Available'
        ? 'bg-red-100 text-red-800'
        : 'bg-slate-200 text-slate-600'
    }`}
  >
    {trial.trialStatus}
  </span>
</p>
  <p className="text-base text-slate-600">
    <span className="text-slate-500">Last Seen:</span> {trial.trialLastSeen}
  </p>
  {trial.notes && (
    <p className="text-sm mt-3 text-slate-700 italic">
      Note: {trial.notes}
    </p>
  )}
</div>
          );
        })
      )}
    </main>
  );
}
