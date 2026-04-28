import { useEffect, useMemo, useState } from 'react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from 'recharts'
import { Loading } from '../Loading'
import { mainService } from '../../services/main.service'
import { utilService } from '../../services/util.service'

const PERIODS = [
    { key: 'day',   label: 'יום' },
    { key: 'week',  label: 'שבוע' },
    { key: 'month', label: 'חודש' },
    { key: 'year',  label: 'שנה' },
]

const METRICS = [
    { key: 'views',    label: 'צפיות',  color: '#4c6d87' },
    { key: 'likes',    label: 'לייקים', color: '#9b2335' },
    { key: 'comments', label: 'תגובות', color: '#52796f' },
]

const DAYS_HE   = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
const MONTHS_HE = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
                   'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר']

function buildChartData(stats, period) {
    if (!stats) return []
    const now = new Date()
    let skeleton, getIdx, filterStart

    switch (period) {
        case 'day':
            filterStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
            skeleton    = Array.from({ length: 24 }, (_, h) => ({ label: `${String(h).padStart(2, '0')}:00` }))
            getIdx      = ts => new Date(ts).getHours()
            break

        case 'week': {
            const weekStart = new Date(now)
            weekStart.setHours(0, 0, 0, 0)
            weekStart.setDate(now.getDate() - now.getDay())
            filterStart = weekStart.getTime()
            skeleton    = DAYS_HE.map(d => ({ label: d }))
            getIdx      = ts => new Date(ts).getDay()
            break
        }

        case 'month':
            filterStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
            skeleton    = Array.from(
                { length: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() },
                (_, i) => ({ label: String(i + 1) })
            )
            getIdx = ts => new Date(ts).getDate() - 1
            break

        case 'year':
        default:
            filterStart = new Date(now.getFullYear(), 0, 1).getTime()
            skeleton    = MONTHS_HE.map(m => ({ label: m }))
            getIdx      = ts => new Date(ts).getMonth()
            break
    }

    const data = skeleton.map(s => ({ ...s, views: 0, likes: 0, comments: 0 }))

    function fill(timestamps, field) {
        for (const ts of timestamps || []) {
            const t = Number(ts)
            if (t < filterStart) continue
            const idx = getIdx(t)
            if (idx >= 0 && idx < data.length) data[idx][field]++
        }
    }

    fill(stats.views,    'views')
    fill(stats.likes,    'likes')
    fill(stats.comments, 'comments')

    return data
}

function StatsTooltip({ active, payload, label, metricLabel }) {
    if (!active || !payload?.length) return null
    return (
        <div className="stats-tooltip">
            <p className="tooltip-label">{label}</p>
            <p className="tooltip-value">{metricLabel}: <strong>{payload[0].value}</strong></p>
        </div>
    )
}

export function StatsPanel({ type, id }) {
    const [stats, setStats]   = useState(null)
    const [period, setPeriod] = useState('week')

    useEffect(() => {
        mainService.getStats(type, id)
            .then(res => {
                utilService.devLog(`Stats loaded — ${type}/${id}`, res)
                setStats(res)
            })
            .catch(err => {
                console.error('Failed to load stats:', err)
                setStats({})
            })
    }, [type, id])

    const chartData = useMemo(() => buildChartData(stats, period), [stats, period])

    if (!stats) return <Loading isForPage />

    const total = {
        views:    stats.views?.length    || 0,
        likes:    stats.likes?.length    || 0,
        comments: stats.comments?.length || 0,
    }

    return (
        <div className="stats-panel">
            <div className="stats-panel-header">
                <div className="period-btns">
                    {PERIODS.map(p => (
                        <button
                            key={p.key}
                            className={`period-btn${period === p.key ? ' active' : ''}`}
                            onClick={() => setPeriod(p.key)}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="stats-summary">
                {METRICS.map(m => (
                    <div className="stat-card" key={m.key} style={{ '--metric-color': m.color }}>
                        <span className="stat-num">{total[m.key]}</span>
                        <span className="stat-label">{m.label} סה"כ</span>
                    </div>
                ))}
            </div>

            <div className="stats-charts">
                {METRICS.map(metric => {
                    const hasData = chartData.some(d => d[metric.key] > 0)
                    return (
                        <div className="chart-card" key={metric.key}>
                            <h3 className="chart-title" style={{ color: metric.color }}>
                                {metric.label}
                            </h3>
                            {!hasData ? (
                                <p className="no-chart-data">אין נתונים בתקופה זו</p>
                            ) : (
                                <ResponsiveContainer width="100%" height={240}>
                                    <BarChart data={chartData} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ddeee3" vertical={false} />
                                        <XAxis
                                            dataKey="label"
                                            tick={{ fontSize: 11, fill: '#8A9E93' }}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <YAxis
                                            allowDecimals={false}
                                            tick={{ fontSize: 11, fill: '#8A9E93' }}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <Tooltip
                                            content={<StatsTooltip metricLabel={metric.label} />}
                                            cursor={{ fill: 'rgba(0,0,0,.04)' }}
                                        />
                                        <Bar
                                            dataKey={metric.key}
                                            fill={metric.color}
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={44}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
