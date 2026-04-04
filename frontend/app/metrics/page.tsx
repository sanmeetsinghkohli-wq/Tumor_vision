'use client';

import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { getMetrics, type MetricsData } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    RadialBarChart, RadialBar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function MetricsPage() {
    const [metrics, setMetrics] = useState<MetricsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchMetrics() {
            try {
                const data = await getMetrics();
                setMetrics(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load metrics');
            } finally {
                setLoading(false);
            }
        }
        fetchMetrics();
    }, []);

    const COLORS = {
        glioma: '#ef4444',
        meningioma: '#f59e0b',
        pituitary: '#683A46',
        no_tumor: '#C5757C',
        primary: '#F9AAAD',
    };

    const detectionData = metrics ? [
        { name: 'Glioma', value: metrics.detection_rates.glioma, color: COLORS.glioma },
        { name: 'Meningioma', value: metrics.detection_rates.meningioma, color: COLORS.meningioma },
        { name: 'Pituitary', value: metrics.detection_rates.pituitary, color: COLORS.pituitary },
        { name: 'No Tumor', value: metrics.detection_rates.no_tumor, color: COLORS.no_tumor },
    ] : [];

    const radialData = metrics ? [{ name: 'Accuracy', value: metrics.overall_accuracy, fill: '#C5757C' }] : [];

    const trendData = [
        { month: 'Jan', accuracy: 92 }, { month: 'Feb', accuracy: 93 },
        { month: 'Mar', accuracy: 94 }, { month: 'Apr', accuracy: 95 },
        { month: 'May', accuracy: 96 }, { month: 'Jun', accuracy: 97 },
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#140E1C]/95 backdrop-blur-xl border border-[#C5757C]/30 px-4 py-3 rounded-xl shadow-xl">
                    <p className="text-white font-semibold text-sm">{payload[0].name || label}</p>
                    <p className="text-2xl font-bold text-[#F9AAAD]">{payload[0].value}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Layout>
            <div className="min-h-screen relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(to right, #C5757C 1px, transparent 1px), linear-gradient(to bottom, #F9AAAD 1px, transparent 1px)`,
                        backgroundSize: '80px 80px'
                    }} />
                </div>

                <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                        <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#C5757C]/20 to-[#F9AAAD]/20 border border-[#C5757C]/30 rounded-full mb-4">
                            <span className="text-sm font-medium bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-transparent bg-clip-text">ANALYTICS DASHBOARD</span>
                        </div>
                        <h1 className="text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-transparent bg-clip-text">Performance Metrics</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Real-time insights into our AI diagnostic system accuracy</p>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20">
                                <div className="relative w-16 h-16 mb-4">
                                    <div className="absolute inset-0 border-4 border-[#C5757C]/20 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-transparent border-t-[#C5757C] rounded-full animate-spin"></div>
                                </div>
                                <p className="text-gray-400">Loading metrics data...</p>
                            </motion.div>
                        ) : error ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center max-w-md mx-auto">
                                <div className="text-5xl mb-4">⚠️</div>
                                <p className="text-red-300">{error}</p>
                            </motion.div>
                        ) : metrics ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                {/* KPI cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { icon: '🎯', label: 'Model Accuracy', value: `${metrics.overall_accuracy}%`, color: '#C5757C' },
                                        { icon: '📊', label: 'Scans Analyzed', value: metrics.total_scans.toLocaleString(), color: '#683A46' },
                                        { icon: '⚡', label: 'Processing Time', value: '< 2m', color: '#F9AAAD' },
                                    ].map((kpi, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#C5757C]/50 transition-all">
                                            <div className="text-4xl mb-3">{kpi.icon}</div>
                                            <div className="text-5xl font-bold mb-1" style={{ color: kpi.color }}>{kpi.value}</div>
                                            <div className="text-gray-400 text-sm">{kpi.label}</div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Charts grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Radial accuracy */}
                                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                                        <h3 className="text-xl font-bold text-white mb-4">🎯 Overall Accuracy</h3>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%" data={radialData} startAngle={180} endAngle={0}>
                                                <defs>
                                                    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="1">
                                                        <stop offset="0%" stopColor="#C5757C" />
                                                        <stop offset="100%" stopColor="#F9AAAD" />
                                                    </linearGradient>
                                                </defs>
                                                <RadialBar background={{ fill: '#ffffff10' }} dataKey="value" cornerRadius={10} fill="url(#acc)" />
                                            </RadialBarChart>
                                        </ResponsiveContainer>
                                        <div className="text-center">
                                            <div className="text-5xl font-bold bg-gradient-to-r from-[#C5757C] to-[#F9AAAD] text-transparent bg-clip-text">{metrics.overall_accuracy}%</div>
                                            <div className="text-gray-400 text-sm mt-1">{metrics.total_scans.toLocaleString()} cases analyzed</div>
                                        </div>
                                    </motion.div>

                                    {/* Bar chart */}
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                                        <h3 className="text-xl font-bold text-white mb-4">📊 Accuracy by Type</h3>
                                        <ResponsiveContainer width="100%" height={240}>
                                            <BarChart data={detectionData}>
                                                <defs>
                                                    {detectionData.map((e, i) => (
                                                        <linearGradient key={i} id={`bg${i}`} x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0%" stopColor={e.color} stopOpacity={0.9} />
                                                            <stop offset="100%" stopColor={e.color} stopOpacity={0.6} />
                                                        </linearGradient>
                                                    ))}
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                                                <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                                                <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 11 }} domain={[0, 100]} />
                                                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff10' }} />
                                                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                                    {detectionData.map((_, i) => <Cell key={i} fill={`url(#bg${i})`} />)}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </motion.div>

                                    {/* Pie chart */}
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                                        <h3 className="text-xl font-bold text-white mb-4">🥧 Detection Distribution</h3>
                                        <ResponsiveContainer width="100%" height={280}>
                                            <PieChart>
                                                <Pie data={detectionData} cx="50%" cy="50%" outerRadius={100} innerRadius={55} dataKey="value" paddingAngle={3}>
                                                    {detectionData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                                </Pie>
                                                <Tooltip content={<CustomTooltip />} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            {detectionData.map(item => (
                                                <div key={item.name} className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                                    <span className="text-gray-300 text-sm">{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Area chart */}
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                                        <h3 className="text-xl font-bold text-white mb-4">📈 Performance Trend</h3>
                                        <ResponsiveContainer width="100%" height={280}>
                                            <AreaChart data={trendData}>
                                                <defs>
                                                    <linearGradient id="trend" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#C5757C" stopOpacity={0.6} />
                                                        <stop offset="95%" stopColor="#683A46" stopOpacity={0.1} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                                                <XAxis dataKey="month" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                                                <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 11 }} domain={[90, 100]} />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Area type="monotone" dataKey="accuracy" stroke="#C5757C" fill="url(#trend)" strokeWidth={3}
                                                    dot={{ fill: '#C5757C', r: 4, stroke: '#fff', strokeWidth: 2 }} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </motion.div>
                                </div>

                                {/* Per-type cards */}
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                                    className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {detectionData.map((item, i) => (
                                        <div key={item.name} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:scale-105 transition-transform"
                                            style={{ borderColor: `${item.color}30` }}>
                                            <div className="text-gray-400 text-sm mb-2">{item.name}</div>
                                            <div className="text-3xl font-bold mb-2" style={{ color: item.color }}>{item.value}%</div>
                                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${item.value}%` }} transition={{ duration: 1, delay: 0.7 + i * 0.1 }}
                                                    className="h-full rounded-full" style={{ backgroundColor: item.color }} />
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>
        </Layout>
    );
}
