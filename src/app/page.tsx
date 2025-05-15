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
              className="border p-4 rounded shadow-md mb-4 bg-white"
            >
              <h2 className="text-xl font-bold">{trial.service}</h2>
              <p>Status: {trial.trialStatus}</p>
              <p>Last Seen: {trial.trialLastSeen}</p>
              {trial.notes && (
                <p className="text-sm mt-2 text-gray-800">
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
