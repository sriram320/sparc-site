"use client";

import { useEffect, useState } from 'react';

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface JobApplication {
  id: number;
  fullName: string;
  email: string;
  position: string;
  experience: string;
  resumeUrl?: string;
  createdAt: string;
}

export default function AdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactsRes, jobsRes] = await Promise.all([
          fetch('/.netlify/functions/contact'),
          fetch('/.netlify/functions/job-apply')
        ]);

        if (!contactsRes.ok || !jobsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const contactsData = await contactsRes.json();
        const jobsData = await jobsRes.json();

        setContacts(contactsData.data || []);
        setJobs(jobsData.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Contact Submissions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">Message</th>
                <th className="border px-2 py-1">Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id}>
                  <td className="border px-2 py-1">{c.name}</td>
                  <td className="border px-2 py-1">{c.email}</td>
                  <td className="border px-2 py-1 max-w-xs truncate">{c.message}</td>
                  <td className="border px-2 py-1">{new Date(c.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Job Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">Position</th>
                <th className="border px-2 py-1">Experience</th>
                <th className="border px-2 py-1">Resume</th>
                <th className="border px-2 py-1">Date</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id}>
                  <td className="border px-2 py-1">{j.fullName}</td>
                  <td className="border px-2 py-1">{j.email}</td>
                  <td className="border px-2 py-1">{j.position}</td>
                  <td className="border px-2 py-1 max-w-xs truncate">{j.experience}</td>
                  <td className="border px-2 py-1">
                    {j.resumeUrl && (
                      <a href={j.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        View Resume
                      </a>
                    )}
                  </td>
                  <td className="border px-2 py-1">{new Date(j.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
