import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import supabase from '../utils/supabase';

export default function WhatsAppSettings() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    student_phone: '',
    parent_phone: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [testLoading, setTestLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      setUser(profile);

      const { data: existingArr } = await supabase
        .from('whatsapp_settings')
        .select('*')
        .eq('student_id', user.id);

      if (existingArr && existingArr.length > 0) {
        setSettings({
          student_phone: existingArr[0].student_phone || '',
          parent_phone: existingArr[0].parent_phone || '',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveSettings = async () => {
    if (!settings.student_phone) {
      setMessage('❌ Please enter your WhatsApp number!');
      return;
    }
    setSaving(true);
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();

      const { data: existing } = await supabase
        .from('whatsapp_settings')
        .select('id')
        .eq('student_id', authUser.id);

      if (existing && existing.length > 0) {
        await supabase
          .from('whatsapp_settings')
          .update({
            student_phone: settings.student_phone,
            parent_phone: settings.parent_phone,
            updated_at: new Date().toISOString(),
          })
          .eq('student_id', authUser.id);
      } else {
        await supabase
          .from('whatsapp_settings')
          .insert({
            student_id: authUser.id,
            student_phone: settings.student_phone,
            parent_phone: settings.parent_phone,
          });
      }

      setMessage('✅ Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Error saving settings!');
    }
    setSaving(false);
  };

  const sendTestMessage = async () => {
    if (!settings.student_phone) {
      setMessage('❌ Please enter and save your WhatsApp number first!');
      return;
    }
    setTestLoading(true);
    try {
      const res = await fetch('http://localhost:8000/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: settings.student_phone,
          message: `🎉 *RAXX AI — Test Message*\n\nHello ${user?.name}! 👋\n\nTumhara WhatsApp successfully connected hai RAXX AI se! 🚀\n\nAb tum monthly progress reports payenge!\n\n_RAXX AI Technologies_`
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('✅ Test message sent! Check your WhatsApp!');
      } else {
        setMessage('❌ Message send failed! Check your WhatsApp token.');
      }
    } catch (err) {
      setMessage('❌ Backend error!');
    }
    setTestLoading(false);
    setTimeout(() => setMessage(''), 4000);
  };

  const generateReport = async () => {
    setReportLoading(true);
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      const month = new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' });

      const res = await fetch('http://localhost:8000/report/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: authUser.id,
          month: month,
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `RAXX_AI_Report_${month}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);

        // Parent ko WhatsApp bhejo agar number filled hai
        if (settings.parent_phone) {
          await fetch('http://localhost:8000/whatsapp/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone: settings.parent_phone,
              message: `📊 *RAXX AI — Monthly Report*\n\nHello! 👋\n\n*${user?.name}* ki ${month} ki progress report ready hai!\n\n📱 RAXX AI app se download karein.\n\n_RAXX AI Technologies_`
            }),
          });
          setMessage('✅ Report downloaded aur parents ko WhatsApp pe bhej diya!');
        } else {
          setMessage('✅ Report downloaded successfully!');
        }
      } else {
        setMessage('❌ Report generation failed!');
      }
    } catch (err) {
      setMessage('❌ Error generating report!');
    }
    setReportLoading(false);
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <>
      <Head><title>WhatsApp Settings — RAXX AI</title></Head>
      <div className="min-h-screen bg-gray-950 text-white">

        {/* Header */}
        <div className="border-b border-gray-800 px-6 py-5 flex items-center gap-4">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white transition">← Back</button>
          <div>
            <h1 className="text-xl font-bold text-green-400">💬 WhatsApp Settings</h1>
            <p className="text-gray-400 text-sm">Monthly progress report setup karo</p>
          </div>
        </div>

        <div className="max-w-xl mx-auto px-6 py-8 space-y-6">

          {/* Message Banner */}
          {message && (
            <div className={`px-4 py-3 rounded-xl text-sm font-semibold ${
              message.startsWith('✅') ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {message}
            </div>
          )}

          {/* Info Card */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <p className="text-green-400 font-semibold text-sm">Monthly Progress Report</p>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                  Har mahine automatically ek progress report generate hogi aur aapke WhatsApp pe aayegi. Agar parent ka number diya hai toh unhe bhi report milegi!
                </p>
              </div>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-bold mb-5 flex items-center gap-2">
              <span>📱</span> Phone Numbers
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs mb-2 block font-medium">Your WhatsApp Number *</label>
                <div className="flex gap-2">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-gray-400 text-sm font-medium">+91</div>
                  <input
                    type="text"
                    placeholder="10 digit mobile number"
                    value={settings.student_phone}
                    onChange={e => setSettings(prev => ({ ...prev, student_phone: e.target.value }))}
                    maxLength={10}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-green-400 transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-xs mb-2 block font-medium">
                  Parent's WhatsApp Number
                  <span className="text-gray-600 ml-1">(Optional)</span>
                </label>
                <div className="flex gap-2">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-gray-400 text-sm font-medium">+91</div>
                  <input
                    type="text"
                    placeholder="Parent ka 10 digit number"
                    value={settings.parent_phone}
                    onChange={e => setSettings(prev => ({ ...prev, parent_phone: e.target.value }))}
                    maxLength={10}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-green-400 transition"
                  />
                </div>
                <p className="text-gray-600 text-xs mt-1.5">
                  ✅ Parent number doge toh unhe bhi monthly report milegi
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={saveSettings}
            disabled={saving}
            className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-50 text-black font-bold py-4 rounded-2xl transition"
          >
            {saving ? 'Saving...' : '💾 Save Settings'}
          </button>

          {/* Test Message */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-bold mb-2 flex items-center gap-2">
              <span>🧪</span> Test WhatsApp Connection
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Apne number pe ek test message bhejo — confirm karo ki WhatsApp connected hai!
            </p>
            <button
              onClick={sendTestMessage}
              disabled={testLoading}
              className="w-full bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 font-bold py-3 rounded-xl transition"
            >
              {testLoading ? 'Sending...' : '📨 Send Test Message'}
            </button>
          </div>

          {/* Monthly Report */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-bold mb-2 flex items-center gap-2">
              <span>📄</span> Generate Monthly Report
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Is mahine ki progress report abhi generate karo — PDF download hogi aur WhatsApp pe bhi jayegi!
            </p>

            <div className="bg-gray-800 rounded-xl p-4 mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Month</span>
                <span className="text-white font-semibold">
                  {new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Student</span>
                <span className="text-white font-semibold">{user?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Student WhatsApp</span>
                <span className="text-white font-semibold">
                  {settings.student_phone ? `+91 ${settings.student_phone}` : 'Not set'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Parent WhatsApp</span>
                <span className={`font-semibold ${settings.parent_phone ? 'text-green-400' : 'text-gray-600'}`}>
                  {settings.parent_phone ? `+91 ${settings.parent_phone}` : 'Not set'}
                </span>
              </div>
            </div>

            <button
              onClick={generateReport}
              disabled={reportLoading}
              className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition"
            >
              {reportLoading ? '⏳ Generating...' : '📊 Generate & Send Report'}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}