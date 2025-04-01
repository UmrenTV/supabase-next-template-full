import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ChartProps {
  data: Record<string, any>[]
  type?: 'line' | 'bar'
  height?: number
  color?: string
  strokeWidth?: number
  xKey?: string
  yKey?: string
  title?: string
}

export function Chart({ 
  data, 
  type = 'line', 
  height = 300, 
  color = '#3b82f6', 
  strokeWidth = 2, 
  xKey = 'name', 
  yKey = 'value', 
  title 
}: ChartProps) {
  if (type === 'line') {
    return (
      <div>
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={yKey}
              stroke={color}
              strokeWidth={strokeWidth}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={yKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 